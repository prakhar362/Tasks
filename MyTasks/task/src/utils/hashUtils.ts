import * as CryptoJS from 'crypto-js';

export function hashPassword(password: string): string {
 
  const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
  return hashedPassword;
}

export function verifyPassword(password: string, hashedPassword: string): boolean {
  const hashedInputPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
  return hashedInputPassword === hashedPassword;
}
