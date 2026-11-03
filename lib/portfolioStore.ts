import staticItems from '@/data/portfolio.json'
import supabase, { getSupabaseAdmin } from '@/lib/supabaseClient'

export interface PortfolioItem {
  id: string
  title: string
  category: string
  type: 'image' | 'video'
  url: string
  thumbnail?: string
  description?: string
  createdAt: string
}

export type PortfolioInput = Omit<PortfolioItem, 'id' | 'createdAt'>

const TABLE = 'portfolio'

export class StoreNotWritableError extends Error {
  constructor() {
    super('قاعدة البيانات غير مضبوطة: أضف NEXT_PUBLIC_SUPABASE_URL و SUPABASE_SERVICE_ROLE_KEY لتفعيل التعديل')
  }
}

function sortNewestFirst(items: PortfolioItem[]): PortfolioItem[] {
  return [...items].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
}

// القراءة لا تفشل أبداً: إن لم تكن Supabase مضبوطة أو تعطلت، نرجع إلى الملف الثابت
export async function listPortfolioItems(): Promise<PortfolioItem[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('createdAt', { ascending: false })
    if (!error && data) return data as PortfolioItem[]
    console.error('Supabase read failed, falling back to static portfolio:', error?.message)
  }
  return sortNewestFirst(staticItems as PortfolioItem[])
}

export async function getPortfolioItem(id: string): Promise<PortfolioItem | null> {
  const items = await listPortfolioItems()
  return items.find(item => String(item.id) === id) ?? null
}

function writer() {
  const client = getSupabaseAdmin()
  if (!client) throw new StoreNotWritableError()
  return client
}

export async function createPortfolioItem(input: PortfolioInput): Promise<PortfolioItem> {
  const { data, error } = await writer()
    .from(TABLE)
    .insert([{ ...input, createdAt: new Date().toISOString() }])
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as PortfolioItem
}

export async function updatePortfolioItem(id: string, changes: Partial<PortfolioInput>): Promise<PortfolioItem | null> {
  const { data, error } = await writer()
    .from(TABLE)
    .update(changes)
    .eq('id', id)
    .select()
  if (error) throw new Error(error.message)
  return (data?.[0] as PortfolioItem) ?? null
}

export async function deletePortfolioItem(id: string): Promise<boolean> {
  const { data, error } = await writer()
    .from(TABLE)
    .delete()
    .eq('id', id)
    .select()
  if (error) throw new Error(error.message)
  return Boolean(data && data.length > 0)
}
