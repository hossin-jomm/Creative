import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// بيانات الدخول تُقرأ من متغيرات البيئة فقط، ولا تُكتب في الكود أبداً.
//   ADMIN_USERNAME       اسم المستخدم
//   ADMIN_PASSWORD_HASH  هاش bcrypt لكلمة المرور (أنشئه بـ: npm run hash-password -- "كلمة المرور")
//   JWT_SECRET           نص عشوائي طويل (32 حرفاً على الأقل)

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

function getJwtSecret(): string {
  const secret = requireEnv('JWT_SECRET')
  if (secret.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long')
  }
  return secret
}

export function getAdminUsername(): string {
  return requireEnv('ADMIN_USERNAME')
}

export async function areCredentialsValid(username: string, password: string): Promise<boolean> {
  const expectedUsername = getAdminUsername()
  const passwordHash = requireEnv('ADMIN_PASSWORD_HASH')
  // نتحقق من كلمة المرور دائماً حتى لو كان اسم المستخدم خاطئاً، كي لا يكشف زمن الرد أيهما الخاطئ
  const passwordOk = await bcrypt.compare(password, passwordHash)
  return passwordOk && username === expectedUsername
}

export function signAdminToken() {
  return jwt.sign(
    { username: getAdminUsername(), role: 'admin' },
    getJwtSecret(),
    { expiresIn: '24h' }
  )
}

export function verifyAdminToken(token: string) {
  return jwt.verify(token, getJwtSecret())
}
