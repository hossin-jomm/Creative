import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth'
import { StoreNotWritableError } from '@/lib/portfolioStore'

// يرجع رد 401 إن لم يكن الطلب من الأدمن، أو null إن كان مسموحاً
export function requireAdmin(request: NextRequest): NextResponse | null {
  const auth = request.headers.get('authorization') || ''
  const [scheme, token] = auth.split(' ')
  if (scheme !== 'Bearer' || !token) {
    return NextResponse.json({ message: 'مفقود رمز المصادقة' }, { status: 401 })
  }
  try {
    verifyAdminToken(token)
    return null
  } catch {
    return NextResponse.json({ message: 'غير مصرح لك بالوصول' }, { status: 401 })
  }
}

export function storeErrorResponse(error: unknown, fallbackMessage: string): NextResponse {
  if (error instanceof StoreNotWritableError) {
    return NextResponse.json({ message: error.message }, { status: 503 })
  }
  console.error(fallbackMessage, error)
  return NextResponse.json({ message: fallbackMessage }, { status: 500 })
}

const ALLOWED_TYPES = ['image', 'video'] as const

// يقبل فقط الحقول المعروفة، ويرفض الروابط غير http(s)
export function pickPortfolioFields(body: Record<string, unknown>) {
  const out: Record<string, string> = {}
  for (const key of ['title', 'category', 'type', 'url', 'thumbnail', 'description']) {
    const value = body[key]
    if (typeof value === 'string') out[key] = value.trim()
  }
  if (out.type && !ALLOWED_TYPES.includes(out.type as typeof ALLOWED_TYPES[number])) {
    throw new Error('نوع غير صالح')
  }
  for (const key of ['url', 'thumbnail']) {
    if (out[key] && !/^https?:\/\//i.test(out[key])) throw new Error('رابط غير صالح')
  }
  return out
}
