import { createClient, SupabaseClient } from '@supabase/supabase-js'

// يُقرأ كل شيء من متغيرات البيئة. إن لم تُضبط، يعمل الموقع بدون Supabase
// ويعرض المعرض من data/portfolio.json.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

// عميل للقراءة العامة (يحترم سياسات RLS)
const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null

export default supabase

// عميل الكتابة: للخادم فقط، يستخدم مفتاح service role الذي لا يُعرض للمتصفح أبداً.
// بهذا تبقى جداول Supabase مقفلة للكتابة أمام العامة، ولا يكتب إلا الأدمن عبر الـAPI.
export function getSupabaseAdmin(): SupabaseClient | null {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) return null
  return createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } })
}
