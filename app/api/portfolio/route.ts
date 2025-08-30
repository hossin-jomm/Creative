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

// التأكد من وجود مجلد البيانات
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// قراءة بيانات المعرض
async function readPortfolioData(): Promise<PortfolioItem[]> {
  try {
    await ensureDataDirectory()
    const data = await fs.readFile(PORTFOLIO_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // إذا لم يكن الملف موجوداً، إنشاء بيانات تجريبية
    const sampleData: PortfolioItem[] = [
      {
        id: '1',
        title: 'حملة إعلانية لمطعم فاخر',
        category: 'إعلانات مدفوعة',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
        description: 'حملة إعلانية ناجحة حققت زيادة 300% في المبيعات',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'فيديو ترويجي لشركة تقنية',
        category: 'موشن جرافيك',
        type: 'video',
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        description: 'فيديو ترويجي احترافي بتقنية الموشن جرافيك',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'تصميم هوية بصرية متكاملة',
        category: 'هوية بصرية',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
        description: 'تصميم هوية بصرية شاملة لشركة ناشئة',
        createdAt: new Date().toISOString()
      },
      {
        id: '4',
        title: 'إدارة حسابات التواصل الاجتماعي',
        category: 'سوشال ميديا',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
        description: 'إدارة احترافية لحسابات التواصل الاجتماعي',
        createdAt: new Date().toISOString()
      },
      {
        id: '5',
        title: 'حملة تسويقية على TikTok',
        category: 'إعلانات مدفوعة',
        type: 'video',
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
        description: 'حملة إعلانية ناجحة على منصة TikTok',
        createdAt: new Date().toISOString()
      },
      {
        id: '6',
        title: 'تصميم إعلانات إبداعية',
        category: 'تصميم جرافيك',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop',
        description: 'تصميمات إعلانية مبتكرة وجذابة',
        createdAt: new Date().toISOString()
      }
    ]
    await writePortfolioData(sampleData)
    return sampleData
  }
}

// كتابة بيانات المعرض
async function writePortfolioData(data: PortfolioItem[]) {
  await ensureDataDirectory()
  await fs.writeFile(PORTFOLIO_FILE, JSON.stringify(data, null, 2))
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

    // قراءة البيانات الحالية
    const items = await readPortfolioData()

    // إنشاء عنصر جديد
    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      title,
      category,
      type,
      url,
      thumbnail,
      description,
      createdAt: new Date().toISOString()
    }

    // إضافة العنصر الجديد
    items.unshift(newItem)

    // حفظ البيانات
    await writePortfolioData(items)

    return NextResponse.json(
      { message: 'تم إضافة العنصر بنجاح', item: newItem },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error adding portfolio item:', error)
    return NextResponse.json(
      { message: 'حدث خطأ في إضافة العنصر' },
      { status: 500 }
    )
  }
}