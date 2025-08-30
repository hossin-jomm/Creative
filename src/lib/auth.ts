import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs' // يجوز استخدام bcryptjs إن رغبت

export const ADMIN_CREDENTIALS = {
  username: 'Hossin',
  // مبدئياً نستخدم نصاً عادياً لضمان عمل الدخول الآن:
  passwordPlain: 'Jommaa1925',
  // وللأمان لاحقاً يمكنك وضع الهاش هنا واستعماله بدلاً من النصي:
  passwordHash: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
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
  // لو لديك هاش فعّل هذا الفرع:
  // if (ADMIN_CREDENTIALS.passwordHash) {
  //   return await bcrypt.compare(input, ADMIN_CREDENTIALS.passwordHash)
  // }
  // طور التطوير: مقارنة نصية مباشرة
  return input === ADMIN_CREDENTIALS.passwordPlain
}