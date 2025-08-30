import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_CREDENTIALS, isPasswordValid, signAdminToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // التحقق من وجود البيانات
    if (!username || !password) {
      return NextResponse.json(
        { message: 'اسم المستخدم وكلمة المرور مطلوبان' },
        { status: 400 }
      )
    }

    // التحقق من اسم المستخدم
    if (username !== ADMIN_CREDENTIALS.username) {
      return NextResponse.json(
        { message: 'اسم المستخدم أو كلمة المرور غير صحيحة' },
        { status: 401 }
      )
    }

    // التحقق من كلمة المرور
    const ok = await isPasswordValid(password)
    if (!ok) {
      return NextResponse.json(
        { message: 'اسم المستخدم أو كلمة المرور غير صحيحة' },
        { status: 401 }
      )
    }

    // إنشاء JWT token
    const token = signAdminToken()

    return NextResponse.json(
      { 
        message: 'تم تسجيل الدخول بنجاح',
        token,
        user: {
          username: ADMIN_CREDENTIALS.username,
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

// تم نقل دالة التحقق من التوكن إلى src/lib/auth.ts