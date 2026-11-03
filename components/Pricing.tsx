'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
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
      icon: '📣',
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
      color: 'from-secondary-600 to-primary-600'
    },
    {
      title: 'باقة المحتوى',
      icon: '🎨',
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
      color: 'from-amber-700 to-yellow-600'
    },
    {
      title: 'الباقة الشاملة',
      icon: '🚀',
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
      color: 'from-yellow-400 to-amber-500'
    }
  ]

  // دالة لفتح واتساب مع رسالة محددة
  const handleWhatsAppClick = (message: string) => {
    // استخدام رقم الواتساب من متغيرات البيئة أو استخدام رقم افتراضي
    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
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
              className={`relative rounded-2xl overflow-hidden backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col h-full ${pkg.popular ? 'md:scale-105 md:-translate-y-6 z-10 shadow-2xl ring-2 ring-secondary-500' : ''}`}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={prefersReducedMotion ? {} : pkg.popular ? { y: -15, boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.3)' } : { y: -10, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
            >
             {/* Popular Badge - Moved to left side with better spacing and contrast */}
              {pkg.popular && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white text-sm font-bold py-1.5 px-4 rounded-lg z-10 shadow-md">
                  الأنسب للبداية
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