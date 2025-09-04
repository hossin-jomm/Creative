import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth'
import supabase from '@/lib/supabaseClient'

interface PortfolioItem {
  id: string
  title: string
  category: string
  type: 'image' | 'video'
  url: string
  thumbnail?: string
  description?: string
  createdAt: string
}

// GET - جلب عنصر واحد
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  try {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching portfolio item:', error)
      return NextResponse.json(
        { message: 'حدث خطأ في قراءة البيانات' },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { message: 'العنصر غير موجود' },
        { status: 404 }
      )
    }

    return NextResponse.json({ item: data }, { status: 200 })
  } catch (error) {
    console.error('Error reading portfolio item:', error)
    return NextResponse.json(
      { message: 'حدث خطأ في قراءة البيانات' },
      { status: 500 }
    )
  }
}

// PUT - تعديل عنصر (يتطلب تسجيل دخول الأدمن)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  try {
    // التحقق من صحة التوكن
    const auth = request.headers.get('authorization') || ''
    const [, token] = auth.split(' ')
    if (!token) {
      return NextResponse.json({ message: 'مفقود رمز المصادقة' }, { status: 401 })
    }
    try {
      const user = verifyAdminToken(token)
    } catch {
      return NextResponse.json(
        { message: 'غير مصرح لك بالوصول' },
        { status: 401 }
      )
    }

    const { title, category, type, url, thumbnail, description } = await request.json()

    // التحقق من البيانات المطلوبة
    if (!title || !category || !type || !url) {
      return NextResponse.json(
        { message: 'البيانات المطلوبة ناقصة' },
        { status: 400 }
      )
    }

    // تحديث العنصر في Supabase
    const { data, error } = await supabase
      .from('portfolio')
      .update({
        title,
        category,
        type,
        url,
        thumbnail,
        description,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()

    if (error) {
      console.error('Error updating portfolio item:', error)
      return NextResponse.json(
        { message: 'حدث خطأ في تحديث العنصر' },
        { status: 500 }
      )
    }

    if (data.length === 0) {
      return NextResponse.json(
        { message: 'العنصر غير موجود' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'تم تحديث العنصر بنجاح', item: data[0] },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error updating portfolio item:', error)
    return NextResponse.json(
      { message: 'حدث خطأ في تحديث العنصر' },
      { status: 500 }
    )
  }
}

// DELETE - حذف عنصر (يتطلب تسجيل دخول الأدمن)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  try {
    // التحقق من صحة التوكن
    const auth = request.headers.get('authorization') || ''
    const [, token] = auth.split(' ')
    if (!token) {
      return NextResponse.json({ message: 'مفقود رمز المصادقة' }, { status: 401 })
    }
    try {
      const user = verifyAdminToken(token)
    } catch {
      return NextResponse.json(
        { message: 'غير مصرح لك بالوصول' },
        { status: 401 }
      )
    }

    // حذف العنصر من Supabase
    const { data: itemToDelete } = await supabase
      .from('portfolio')
      .select('*')
      .eq('id', id)
      .single()

    if (!itemToDelete) {
      return NextResponse.json(
        { message: 'العنصر غير موجود' },
        { status: 404 }
      )
    }

    const { error } = await supabase
      .from('portfolio')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting portfolio item:', error)
      return NextResponse.json(
        { message: 'حدث خطأ في حذف العنصر' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'تم حذف العنصر بنجاح', item: itemToDelete },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error deleting portfolio item:', error)
    return NextResponse.json(
      { message: 'حدث خطأ في حذف العنصر' },
      { status: 500 }
    )
  }
}