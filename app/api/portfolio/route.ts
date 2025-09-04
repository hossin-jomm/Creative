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

// قراءة بيانات المعرض من Supabase
async function readPortfolioData(): Promise<PortfolioItem[]> {
  try {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    return data || [];
  } catch (error) {
    console.error('Error reading portfolio data:', error);
    throw error;
  }
}

// GET - جلب جميع عناصر المعرض
export async function GET() {
  try {
    const items = await readPortfolioData()
    return NextResponse.json({ items }, { status: 200 })
  } catch (error) {
    console.error('Error reading portfolio:', error)
    return NextResponse.json(
      { message: 'حدث خطأ في قراءة البيانات' },
      { status: 500 }
    )
  }
}

// POST - إضافة عنصر جديد (يتطلب تسجيل دخول الأدمن)
export async function POST(request: NextRequest) {
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

    // إنشاء عنصر جديد
    const newItem = {
      title,
      category,
      type,
      url,
      thumbnail,
      description,
      createdAt: new Date().toISOString()
    }

    // إضافة العنصر الجديد إلى Supabase
    const { data, error } = await supabase
      .from('portfolio')
      .insert([newItem])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { message: 'حدث خطأ في إضافة العنصر: ' + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'تم إضافة العنصر بنجاح', item: data[0] },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error adding portfolio item:', error)
    return NextResponse.json(
      { message: 'حدث خطأ في إضافة العنصر' },
      { status: 500 }
    )
  }
}

// PUT - تحديث عنصر موجود (يتطلب تسجيل دخول الأدمن)
export async function PUT(request: NextRequest) {
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

    const { id, title, category, type, url, thumbnail, description } = await request.json()

    // التحقق من وجود المعرف
    if (!id) {
      return NextResponse.json(
        { message: 'معرف العنصر مطلوب للتحديث' },
        { status: 400 }
      )
    }

    // إنشاء كائن التحديث بالحقول المتوفرة فقط
    const updateData: { [key: string]: any } = {}
    if (title !== undefined) updateData.title = title
    if (category !== undefined) updateData.category = category
    if (type !== undefined) updateData.type = type
    if (url !== undefined) updateData.url = url
    if (thumbnail !== undefined) updateData.thumbnail = thumbnail
    if (description !== undefined) updateData.description = description

    // تحديث العنصر في Supabase
    const { data, error } = await supabase
      .from('portfolio')
      .update(updateData)
      .eq('id', id)
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { message: 'حدث خطأ في تحديث العنصر: ' + error.message },
        { status: 500 }
      )
    }

    if (data.length === 0) {
      return NextResponse.json(
        { message: 'لم يتم العثور على العنصر' },
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
export async function DELETE(request: NextRequest) {
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

    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { message: 'معرف العنصر مطلوب للحذف' },
        { status: 400 }
      )
    }

    // حذف العنصر من Supabase
    const { error } = await supabase
      .from('portfolio')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { message: 'حدث خطأ في حذف العنصر: ' + error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'تم حذف العنصر بنجاح' },
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