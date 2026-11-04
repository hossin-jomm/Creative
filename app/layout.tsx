import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { Alexandria, IBM_Plex_Sans_Arabic } from 'next/font/google'
import { SITE_URL } from '@/lib/siteUrl'

// خط النصوص: مقروء جداً على الجوال
const plex = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
})

// خط العناوين: عربي هندسي عريض يناسب هوية تقنية
const alexandria = Alexandria({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Ai Creative - وكالة تسويق رقمي في حلب',
  description: 'إعلانات فيسبوك وإنستغرام، إدارة السوشال ميديا، وتدريب على الإعلانات المدفوعة في حلب. تقرير أسبوعي بالنتائج وتواصل مباشر عبر واتساب.',
  keywords: 'تسويق رقمي حلب, إعلانات فيسبوك, إعلانات إنستغرام, سوشال ميديا, ميديا باير, تدريب إعلانات, سوريا',
  openGraph: {
    type: 'website',
    locale: 'ar_SY',
    url: SITE_URL,
    siteName: 'Ai Creative',
    title: 'Ai Creative - وكالة تسويق رقمي في حلب',
    description: 'إعلانات فيسبوك وإنستغرام، إدارة السوشال ميديا، وتدريب على الإعلانات المدفوعة.',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={`${plex.variable} ${alexandria.variable}`}>
      <head>
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