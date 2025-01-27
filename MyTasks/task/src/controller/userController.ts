import { Request, Response } from 'express';
import { insertUser, getAllUsers, updateUser, deleteUser } from '../services/userService';
import { runRedisOperations } from '../config/redis';

export async function insertController(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const user = await insertUser(username, email, password);
  
      // Get the Redis client
      const client = await runRedisOperations();
  
      
      await client.set(`user:${username}`, JSON.stringify(user), { EX: 3600 });
  
      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

export async function viewController(req: Request, res: Response) {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateController(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      const updatedData = req.body;
      const username = req.body.username;
      
      const user = await updateUser(userId, updatedData);
  
      
      const client = await runRedisOperations();
  
      // Update the Redis cache with the same user data
      await client.set(`user:${username}`, JSON.stringify(user), { EX: 3600 }); 
  
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

export async function deleteController(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id);

    // Get the user from the database to retrieve the username
    const user = await getAllUsers(); 
    const username = req.body.username; 
     
     const client = await runRedisOperations();
     await client.del(`user:${username}`);

    await deleteUser(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
