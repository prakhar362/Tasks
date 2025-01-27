import { User } from '../model/user';
import { hashPassword, verifyPassword } from '../utils/hashUtils';

export async function insertUser(username: string, email: string, password: string) {
    // Hash the password before saving it
    const hashedPassword = hashPassword(password);
  return await User.create({ username, email, password: hashedPassword });
}

export async function getAllUsers() {
  return await User.findAll();
}

export async function updateUser(id: number, updates: Partial<{ username: string; email: string; password: string }>) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');

    if (updates.password) {
      updates.password = hashPassword(updates.password);
    }
    await user.update(updates);
  
    return user; 
  }

export async function deleteUser(id: number) {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');
  return await user.destroy();
}
