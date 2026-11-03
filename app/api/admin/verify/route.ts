export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const auth = request.headers.get('authorization') || ''
    const [, token] = auth.split(' ')
    if (!token) {
      return NextResponse.json({ message: 'مفقود رمز المصادقة' }, { status: 401 })
    }
    const decoded = verifyAdminToken(token) // سيرمي خطأ إن كان غير صالح
    return NextResponse.json({ ok: true, user: decoded }, { status: 200 })

  } catch {
    return NextResponse.json(
      { message: 'رمز المصادقة غير صالح أو منتهي' },
      { status: 401 }
    )
  }
}

// تم نقل دالة التحقق من التوكن إلى ملف auth.ts