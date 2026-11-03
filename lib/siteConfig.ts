// بيانات التواصل في مكان واحد. أي رابط فارغ لا يظهر في الموقع.
// لإضافة حساب: ضع الرابط الكامل، مثل 'https://facebook.com/aicreative.sy'

// wa.me يقبل الأرقام فقط مع رمز الدولة ومن دون الصفر المحلي: 963994661991 وليس +963 0994661991
export function normalizeWhatsAppNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (digits.startsWith('9630')) return '963' + digits.slice(4)
  if (digits.startsWith('09')) return '963' + digits.slice(1)
  return digits
}

export const WHATSAPP_NUMBER = normalizeWhatsAppNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '963994661991')

export const siteConfig = {
  phoneDisplay: '+963 994 661 991',
  phoneLink: 'tel:+963994661991',
  // ضع بريد الوكالة هنا عندما يجهز، وسيظهر تلقائياً
  email: '',
  city: 'حلب، سوريا',
  social: {
    facebook: '',
    instagram: '',
    tiktok: '',
    youtube: '',
    linkedin: '',
  },
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const socialLinks = [
  { name: 'Facebook', icon: 'fab fa-facebook-f', url: siteConfig.social.facebook, color: 'hover:text-blue-600' },
  { name: 'Instagram', icon: 'fab fa-instagram', url: siteConfig.social.instagram, color: 'hover:text-pink-600' },
  { name: 'TikTok', icon: 'fab fa-tiktok', url: siteConfig.social.tiktok, color: 'hover:text-black' },
  { name: 'YouTube', icon: 'fab fa-youtube', url: siteConfig.social.youtube, color: 'hover:text-red-600' },
  { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: siteConfig.social.linkedin, color: 'hover:text-blue-700' },
].filter(link => link.url)
