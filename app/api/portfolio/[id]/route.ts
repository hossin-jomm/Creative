import { NextRequest, NextResponse } from 'next/server'
import { getPortfolioItem, updatePortfolioItem, deletePortfolioItem } from '@/lib/portfolioStore'
import { requireAdmin, storeErrorResponse, pickPortfolioFields } from '@/lib/adminGuard'

export const dynamic = 'force-dynamic'

type Params = { params: { id: string } }

// GET - جلب عنصر واحد (عام)
export async function GET(_request: NextRequest, { params }: Params) {
  const item = await getPortfolioItem(params.id)
  if (!item) {
    return NextResponse.json({ message: 'العنصر غير موجود' }, { status: 404 })
  }
  return NextResponse.json({ item }, { status: 200 })
}

// PUT - تعديل عنصر (للأدمن فقط)
export async function PUT(request: NextRequest, { params }: Params) {
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
    const item = await updatePortfolioItem(params.id, fields)
    if (!item) {
      return NextResponse.json({ message: 'العنصر غير موجود' }, { status: 404 })
    }
    return NextResponse.json({ message: 'تم تحديث العنصر بنجاح', item }, { status: 200 })
  } catch (error) {
    return storeErrorResponse(error, 'حدث خطأ في تحديث العنصر')
  }
}

// DELETE - حذف عنصر (للأدمن فقط)
export async function DELETE(request: NextRequest, { params }: Params) {
  const denied = requireAdmin(request)
  if (denied) return denied

  try {
    const deleted = await deletePortfolioItem(params.id)
    if (!deleted) {
      return NextResponse.json({ message: 'العنصر غير موجود' }, { status: 404 })
    }
    return NextResponse.json({ message: 'تم حذف العنصر بنجاح' }, { status: 200 })
  } catch (error) {
    return storeErrorResponse(error, 'حدث خطأ في حذف العنصر')
  }
}
