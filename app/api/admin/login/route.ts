import { NextRequest, NextResponse } from 'next/server'
import { areCredentialsValid, getAdminUsername, signAdminToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // التحقق من وجود البيانات
    if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
      return NextResponse.json(
        { message: 'اسم المستخدم وكلمة المرور مطلوبان' },
        { status: 400 }
      )
    }

    const ok = await areCredentialsValid(username, password)
    if (!ok) {
      return NextResponse.json(
        { message: 'اسم المستخدم أو كلمة المرور غير صحيحة' },
        { status: 401 }
      )
    }

    const token = signAdminToken()

    return NextResponse.json(
      {
        message: 'تم تسجيل الدخول بنجاح',
        token,
        user: {
          username: getAdminUsername(),
          role: 'admin'
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'حدث خطأ في الخادم' },
      { status: 500 }
    )
  }
}
