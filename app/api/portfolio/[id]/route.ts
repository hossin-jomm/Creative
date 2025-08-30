import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { verifyAdminToken } from '@/lib/auth'

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

const PORTFOLIO_FILE = path.join(process.cwd(), 'data', 'portfolio.json')

// قراءة بيانات المعرض
async function readPortfolioData(): Promise<PortfolioItem[]> {
  try {
    const data = await fs.readFile(PORTFOLIO_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

// كتابة بيانات المعرض
async function writePortfolioData(data: PortfolioItem[]) {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
  await fs.writeFile(PORTFOLIO_FILE, JSON.stringify(data, null, 2))
}

// GET - جلب عنصر واحد
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params
  try {
    const items = await readPortfolioData()
    const item = items.find(item => item.id === id)

    if (!item) {
      return NextResponse.json(
        { message: 'العنصر غير موجود' },
        { status: 404 }
      )
    }

    return NextResponse.json({ item }, { status: 200 })
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
  context: { params: { id: string } }
) {
  const { id } = context.params
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

    // قراءة البيانات الحالية
    const items = await readPortfolioData()
    const itemIndex = items.findIndex(item => item.id === id)

    if (itemIndex === -1) {
      return NextResponse.json(
        { message: 'العنصر غير موجود' },
        { status: 404 }
      )
    }

    // تحديث العنصر
    items[itemIndex] = {
      ...items[itemIndex],
      title,
      category,
      type,
      url,
      thumbnail,
      description
    }

    // حفظ البيانات
    await writePortfolioData(items)

    return NextResponse.json(
      { message: 'تم تحديث العنصر بنجاح', item: items[itemIndex] },
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
  context: { params: { id: string } }
) {
  const { id } = context.params
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

    // قراءة البيانات الحالية
    const items = await readPortfolioData()
    const itemIndex = items.findIndex(item => item.id === id)

    if (itemIndex === -1) {
      return NextResponse.json(
        { message: 'العنصر غير موجود' },
        { status: 404 }
      )
    }

    // حذف العنصر
    const deletedItem = items.splice(itemIndex, 1)[0]

    // حفظ البيانات
    await writePortfolioData(items)

    return NextResponse.json(
      { message: 'تم حذف العنصر بنجاح', item: deletedItem },
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