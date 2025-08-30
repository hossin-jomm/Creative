import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { Cairo, Poppins } from 'next/font/google'

// تكوين الخط العربي
const cairo = Cairo({
  subsets: ['arabic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-cairo',
})

// تكوين خط العناوين
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Ai Creative - وكالة التسويق الرقمي',
  description: 'نبتكر حملات تسويقية قوية مدعومة بالذكاء الاصطناعي. خدمات إدارة السوشال ميديا، الحملات الإعلانية، والتدريب الاحترافي.',
  keywords: 'تسويق رقمي, سوشال ميديا, إعلانات فيسبوك, إعلانات جوجل, تيك توك, موشن جرافيك',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body className="font-cairo bg-white">
        <Header />
        <main>
          {children}
        </main>
        <WhatsAppFloat />
      </body>
    </html>
  )
}