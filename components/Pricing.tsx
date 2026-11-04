'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check, Megaphone, Palette, Rocket } from 'lucide-react'
import ErrorBoundary from './ErrorBoundary'
import SectionDivider from './SectionDivider'
import { whatsappLink } from '@/lib/siteConfig'

const PricingContent = () => {
  // استخدام hook لمعرفة ما إذا كان المستخدم يفضل تقليل الحركة
  const prefersReducedMotion = useReducedMotion()
  
  // تعريف الباقات
  const packages = [
    {
      title: 'باقة الإعلانات',
      icon: Megaphone,
      features: [
        'إعداد وإدارة حملة إعلانية على فيسبوك وإنستغرام',
        'دراسة جمهورك المستهدف وضبط الاستهداف',
        '6 تصاميم إعلانية',
        '2 فيديو Reels إعلاني',
        'كتابة نصوص الإعلانات',
        'تقرير أسبوعي بالنتائج وتكلفة كل رسالة أو طلب',
        'ميزانية الإعلان منفصلة وتُدفع للمنصة مباشرة'
      ],
      price: 200,
      message: 'مرحباً! أرغب في الاستفسار عن باقة الإعلانات بسعر 200$',
      popular: true,
      color: 'from-secondary-600 to-secondary-700'
    },
    {
      title: 'باقة المحتوى',
      icon: Palette,
      features: [
        'إدارة منصتي فيسبوك وإنستغرام مع خطة محتوى شهرية',
        'إعادة تصميم صورة الغلاف وصورة الصفحة',
        '4 فيديوهات Reels',
        'تصميم وكتابة 8 منشورات تفاعلية',
        'فيديو طويل واحد'
      ],
      price: 350,
      message: 'مرحباً! أرغب في الاستفسار عن باقة المحتوى بسعر 350$',
      popular: false,
      color: 'from-slate-800 to-slate-700'
    },
    {
      title: 'الباقة الشاملة',
      icon: Rocket,
      features: [
        'كل ما في باقة الإعلانات',
        'دراسة المنافسين وبناء ميزة تنافسية',
        'إدارة فيسبوك وإنستغرام وواتساب أو تيك توك مع خطة محتوى',
        '15 فيديو Reels و30 منشوراً',
        '4 فيديوهات طويلة',
        'جلسات تصوير',
        'ميزانية الإعلان منفصلة وتُدفع للمنصة مباشرة'
      ],
      price: 420,
      message: 'مرحباً! أرغب في الاستفسار عن الباقة الشاملة بسعر 420$',
      popular: false,
      color: 'from-slate-800 to-slate-700'
    }
  ]

  // دالة لفتح واتساب مع رسالة محددة
  const handleWhatsAppClick = (message: string) => {
    // استخدام رقم الواتساب من متغيرات البيئة أو استخدام رقم افتراضي
    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="pricing" className="relative py-16 md:py-24 overflow-hidden bg-[#f4f5f8]">
      {/* Background Elements - Similar to Hero.tsx */}
     <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary-600/40 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-600/40 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-display font-bold mb-6 text-gray-900"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px 120px 0px' }}
            transition={{ duration: 0.4 }}
          >
            باقات واضحة، بسعر ثابت شهرياً
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-3xl mx-auto text-lg"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px 120px 0px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            بدون رسوم مخفية. ميزانية الإعلان منفصلة وتدفعها للمنصة مباشرة، وتستطيع الإلغاء بإشعار 15 يوماً.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              className={`relative rounded-2xl overflow-hidden backdrop-blur-sm bg-white/90 shadow-xl border border-gray-200 transition-all duration-300 flex flex-col h-full ${pkg.popular ? 'md:-translate-y-4 z-10 shadow-2xl ring-2 ring-secondary-500' : ''}`}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px 120px 0px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={prefersReducedMotion ? {} : pkg.popular ? { y: -15, boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.3)' } : { y: -10, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
            >
             {/* Popular Badge - Moved to left side with better spacing and contrast */}
              {pkg.popular && (
                <div className="absolute top-4 left-4 bg-white text-secondary-700 text-sm font-bold py-1.5 px-4 rounded-lg z-10 shadow-md">
                  الأنسب للبداية
                </div>
              )}

              {/* Card Header */}
              <div className={`p-6 bg-gradient-to-r ${pkg.color} text-white `}>
                <div className="text-2xl md:text-3xl font-display font-bold mb-1 flex items-center gap-3">
                  <pkg.icon className="w-7 h-7 shrink-0" aria-hidden="true" />
                  <span>{pkg.title}</span>
                </div>

                <div className="mt-4 text-4xl md:text-5xl font-display font-bold">
                  ${pkg.price}
                  <span className="text-lg md:text-xl font-normal opacity-80"> / شهرياً</span>
                </div>
              </div>

              {/* Features List */}
              <div className={`p-6 flex-grow ${pkg.popular ? 'bg-gray-50' : ''}`}>
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-600 flex items-center justify-center mt-1">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="p-6 pt-0 mt-auto">
                <button
                  onClick={() => handleWhatsAppClick(pkg.message)}
                  className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r ${pkg.popular ? 'from-secondary-600 to-secondary-700' : 'from-slate-800 to-slate-700'} text-white font-medium transition-all duration-300 transform hover:brightness-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary-300 focus:ring-opacity-50 shadow-lg hover:shadow-xl text-base md:text-lg font-semibold`}
                >
                  اسأل عن هذه الباقة عبر واتساب
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Pricing = () => {
  return (
    <ErrorBoundary>
      <PricingContent />
    </ErrorBoundary>
  )
}

export default Pricing