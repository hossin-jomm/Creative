// الرابط الأساسي للموقع، يُستخدم في sitemap وصورة المشاركة.
// عند شراء نطاق خاص: غيّر القيمة الافتراضية هنا أو اضبط NEXT_PUBLIC_SITE_URL في Vercel.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://creative-two-azure.vercel.app').replace(/\/$/, '')
