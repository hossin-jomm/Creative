import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// بيانات الدخول تُقرأ من متغيرات البيئة فقط، ولا تُكتب في الكود أبداً.
//   ADMIN_USERNAME       اسم المستخدم
//   ADMIN_PASSWORD_HASH  هاش bcrypt لكلمة المرور (أنشئه بـ: npm run hash-password -- "كلمة المرور")
//   JWT_SECRET           نص عشوائي طويل (32 حرفاً على الأقل)

// خطأ إعدادات: الرمز (code) يذكر اسم المتغير الناقص أو الخاطئ فقط، ولا يكشف أي قيمة أبداً
export class AuthConfigError extends Error {
  constructor(public code: string) {
    super(code)
  }
}

function requireEnv(name: string): string {
  const value = process.env[name]?.trim()
  if (!value) {
    throw new AuthConfigError(`MISSING_${name}`)
  }
  return value
}

function getJwtSecret(): string {
  const secret = requireEnv('JWT_SECRET')
  if (secret.length < 32) {
    throw new AuthConfigError('JWT_SECRET_TOO_SHORT')
  }
  return secret
}

function getPasswordHash(): string {
  // يزيل علامات التنصيص إن نُسخت مع الهاش بالخطأ
  const hash = requireEnv('ADMIN_PASSWORD_HASH').replace(/^['"]|['"]$/g, '')
  if (!/^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(hash)) {
    throw new AuthConfigError('ADMIN_PASSWORD_HASH_INVALID_FORMAT')
  }
  return hash
}

export function getAdminUsername(): string {
  return requireEnv('ADMIN_USERNAME')
}

export async function areCredentialsValid(username: string, password: string): Promise<boolean> {
  const expectedUsername = getAdminUsername()
  const passwordHash = getPasswordHash()
  getJwtSecret() // نتحقق من المفتاح قبل كلمة المرور حتى يظهر خطأ الإعداد مباشرة
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
