import { NextRequest, NextResponse } from 'next/server'
import { listPortfolioItems, createPortfolioItem, PortfolioInput } from '@/lib/portfolioStore'
import { requireAdmin, storeErrorResponse, pickPortfolioFields } from '@/lib/adminGuard'

export const dynamic = 'force-dynamic'

// GET - جلب جميع عناصر المعرض (عام)
export async function GET() {
  const items = await listPortfolioItems()
  return NextResponse.json({ items }, { status: 200 })
}

// POST - إضافة عنصر جديد (للأدمن فقط)
export async function POST(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  let fields
  try {
    fields = pickPortfolioFields(await request.json())
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message || 'بيانات غير صالحة' }, { status: 400 })
  }

  if (!fields.title || !fields.category || !fields.type || !fields.url) {
    return NextResponse.json({ message: 'البيانات المطلوبة ناقصة' }, { status: 400 })
  }

  try {
    const item = await createPortfolioItem(fields as unknown as PortfolioInput)
    return NextResponse.json({ message: 'تم إضافة العنصر بنجاح', item }, { status: 201 })
  } catch (error) {
    return storeErrorResponse(error, 'حدث خطأ في إضافة العنصر')
  }
}
