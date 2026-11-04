'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import ErrorBoundary from './ErrorBoundary'
import SectionDivider from './SectionDivider'
import { whatsappLink } from '@/lib/siteConfig'

const HeroContent = () => {
  // استخدام hook لمعرفة ما إذا كان المستخدم يفضل تقليل الحركة
  const prefersReducedMotion = useReducedMotion()
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-24">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-900 via-primary-900 to-accent-900" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col justify-center items-center min-h-[80vh] space-y-10 md:space-y-16">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full md:w-4/5 lg:w-3/4 mx-auto"
        >
          <h1 className="text-[32px] sm:text-[40px] md:text-[52px] lg:text-[60px] font-display font-extrabold text-white mb-8 leading-[1.35] mt-10 md:mt-20">
            زبائن أكثر لمشروعك
            <br />
            <span className="bg-gradient-to-l from-fuchsia-300 to-sky-300 bg-clip-text text-transparent">
              من إعلانات فيسبوك وإنستغرام
            </span>
          </h1>
          
          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            نصمّم إعلانك وندير حملتك، ونرسل لك كل أسبوع تقريراً بالأرقام: كم رسالة وصلتك وكم كلّفتك.
            بلا عقود طويلة، والإلغاء بإشعار 15 يوماً فقط.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <a
              href={whatsappLink('السلام عليكم\nعندي فضول أن أعرف أكثر!\nكيف بتقدر حلول AI Creative الإبداعية تضيف قيمة لمشروع مثل [اكتب نوع المشروع هنا]؟')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base md:text-lg px-8 py-4 rounded-xl shadow-lg cursor-pointer"
            >
              <i className="fab fa-whatsapp text-xl" aria-hidden="true"></i>
              <span>احصل على استشارة مجانية</span>
            </a>
            
            <a
              href="#portfolio"
              className="btn-secondary text-base md:text-lg px-8 py-4 bg-white/10 !border-white/40 !text-white hover:!bg-white hover:!text-gray-900 rounded-xl"
            >
              <span>شاهد نماذج من أعمالنا</span>
              <i className="fas fa-eye" aria-hidden="true"></i>
            </a>
          </motion.div>
        </motion.div>
        
        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-20 pt-16 border-t border-white/20 max-w-[90%] mx-auto"
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all">
            <div className="text-3xl md:text-4xl font-bold text-white mb-3 bg-gradient-to-l from-fuchsia-300 to-sky-300 bg-clip-text text-transparent">أسبوعياً</div>
            <div className="text-base md:text-lg text-white/80">تقرير بنتائج حملتك</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all">
            <div className="text-3xl md:text-4xl font-bold text-white mb-3 bg-gradient-to-l from-fuchsia-300 to-sky-300 bg-clip-text text-transparent">15 يوماً</div>
            <div className="text-base md:text-lg text-white/80">إشعار فقط لإلغاء العقد</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all">
            <div className="text-3xl md:text-4xl font-bold text-white mb-3 bg-gradient-to-l from-fuchsia-300 to-sky-300 bg-clip-text text-transparent">حلب</div>
            <div className="text-base md:text-lg text-white/80">فريق محلي قريب منك</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all">
            <div className="text-3xl md:text-4xl font-bold text-white mb-3 bg-gradient-to-l from-fuchsia-300 to-sky-300 bg-clip-text text-transparent">مجاناً</div>
            <div className="text-base md:text-lg text-white/80">استشارة أولى لصفحتك</div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={prefersReducedMotion ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-white/70" />
      </motion.div>
      
      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <SectionDivider variant="wave" invertColors={true} />
      </div>
    </section>
  )
}


const Hero = () => {
  return (
    <ErrorBoundary>
      <HeroContent />
    </ErrorBoundary>
  )
}

export default Hero