import jwt from 'jsonwebtoken'
// ملاحظة: في التطوير نستخدم مقارنة نصيّة مباشرة 
// يمكن لاحقًا إضافة bcrypt.hash/compare لأمان أعلى 

export const ADMIN_CREDENTIALS = { 
  username: 'Hossin', 
  passwordPlain: 'Jommaa1925' 
} 

export const JWT_SECRET = process.env.JWT_SECRET || 'CHANGE_ME_DEV_SECRET' 

export function signAdminToken() { 
  return jwt.sign( 
    { username: ADMIN_CREDENTIALS.username, role: 'admin' }, 
    JWT_SECRET, 
    { expiresIn: '24h' } 
  ) 
} 

export function verifyAdminToken(token: string) { 
  return jwt.verify(token, JWT_SECRET) 
} 

export async function isPasswordValid(input: string): Promise<boolean> { 
  return input === ADMIN_CREDENTIALS.passwordPlain 
}