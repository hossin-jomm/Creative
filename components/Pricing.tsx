'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import ErrorBoundary from './ErrorBoundary'
import SectionDivider from './SectionDivider'

const PricingContent = () => {
  // استخدام hook لمعرفة ما إذا كان المستخدم يفضل تقليل الحركة
  const prefersReducedMotion = useReducedMotion()
  
  // تعريف الباقات
  const packages = [
    {
      title: 'الباقة البرونزية',
      icon: '🥉',
      features: [
        'إدارة  منصتي فيس بوك وإنستغرام (إعداد خطة محتوى احترافية)',
        'إعادة تصميم صورة الكفر وصورة المنصة الشخصية',
        '4 فيديوهات Reels',
        'تصميم وكتابة محتوى احترافي (8 بوستات تفاعلية)',
        'فيديو طويل (عدد 1)'
      ],
      price: 120,
      message: 'مرحباً! أرغب في الاستفسار عن الباقة البرونزية بسعر 120$',
      popular: false,
      color: 'from-amber-700 to-yellow-600'
    },
    {
      title: 'الباقة الفضية',
      icon: '🥈',
      features: [
        'دراسة المنافسين وخلق ميزة تنافسية',
        'إدارة منصتي فيس بوك وإنستغرام (إعداد خطة محتوى احترافية)',
        'إعادة تصميم صورة الكفر وصورة المنصة الشخصية',
        '8 فيديوهات Reels',
        'تصميم وكتابة محتوى احترافي (15 بوست تفاعلي)',
        'فيديو طويل (عدد 2)',
        'جلسات تصوير احترافية',
        'إدارة الحملات الإعلانية'
      ],
      price: 150,
      message: 'مرحباً! أرغب في الاستفسار عن الباقة الفضية بسعر 150$',
      popular: true,
      color: 'from-gray-500 to-gray-700'
    },
    {
      title: 'الباقة الذهبية',
      icon: '🥇',
      features: [
        'دراسة المنافسين وخلق ميزة تنافسية',
        'إدارة منصات (فيس بوك + إنستغرام + واتساب أو تيك توك) مع خطة محتوى احترافية',
        'إعادة تصميم صورة الكفر وصورة المنصة الشخصية',
        '15 فيديو Reels',
        'تصميم وكتابة محتوى احترافي (30 بوست تفاعلي)',
        'فيديو طويل (عدد 4)',
        'جلسات تصوير احترافية',
        'إدارة الحملات الإعلانية'
      ],
      price: 200,
      message: 'مرحباً! أرغب في الاستفسار عن الباقة الذهبية بسعر 200$',
      popular: false,
      color: 'from-yellow-400 to-amber-500'
    }
  ]

  // دالة لفتح واتساب مع رسالة محددة
  const handleWhatsAppClick = (message: string) => {
    // استخدام رقم الواتساب من متغيرات البيئة أو استخدام رقم افتراضي
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+963994661991'
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section id="pricing" className="relative py-16 md:py-24 overflow-hidden bg-[#f4f5f8] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
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
            className="text-3xl md:text-4xl font-bold mb-10"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            الأسعار
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            اختر الباقة المناسبة لاحتياجاتك التسويقية وانطلق نحو النجاح مع خدماتنا الاحترافية
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              className={`relative rounded-2xl overflow-hidden backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col h-full ${pkg.popular ? 'md:scale-120 md:-translate-y-6 z-10 shadow-2xl' : ''}`}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={prefersReducedMotion ? {} : pkg.popular ? { y: -15, boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.3)' } : { y: -10, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
              style={pkg.popular ? { transform: 'scale(1.2)' } : {}}
            >
             {/* Popular Badge - Moved to left side with better spacing and contrast */}
              {pkg.popular && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white text-sm font-bold py-1.5 px-4 rounded-lg z-10 shadow-md">
                  الأكثر مبيعًا
                </div>
              )}

              {/* Card Header */}
              <div className={`p-6 bg-gradient-to-r ${pkg.color} text-white ${pkg.popular ? 'border-b-4 border-pink-500' : ''}`}>
                <div className={`${pkg.popular ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'} font-bold mb-1 flex items-center gap-2`}>
                  <span>{pkg.title}</span>
                  <span>{pkg.icon}</span>
                </div>
              
                <div className={`mt-4 ${pkg.popular ? 'text-5xl md:text-6xl' : 'text-3xl md:text-4xl'} font-bold`}>
                  ${pkg.price}
                  <span className={`${pkg.popular ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'} font-normal opacity-80`}> / شهرياً</span>
                </div>
              </div>

              {/* Features List */}
              <div className={`p-6 flex-grow ${pkg.popular ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className={`text-gray-700 dark:text-gray-300 ${pkg.popular ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="p-6 pt-0 mt-auto">
                <button
                  onClick={() => handleWhatsAppClick(pkg.message)}
                  className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r ${pkg.popular ? 'from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700' : 'from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700'} text-white font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl ${pkg.popular ? 'text-lg md:text-xl font-bold' : 'text-base md:text-lg'}`}
                >
                  اطلبها الآن
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