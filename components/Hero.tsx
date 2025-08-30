'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import ErrorBoundary from './ErrorBoundary'
import SectionDivider from './SectionDivider'

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
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-4/5 lg:w-3/4 mx-auto"
        >
          <h1 className="text-[32px] sm:text-[40px] md:text-[52px] lg:text-[60px] font-display font-bold text-white mb-8 leading-tight mt-10 md:mt-20">
            نبتكر حملات تسويقية قوية
            <br />
            <span className="gradient-text bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              مدعومة بالذكاء الاصطناعي
            </span>
          </h1>
          
          <motion.p
            className="text-base sm:text-lg text-gray-200 mb-10 max-w-[70%] mx-auto leading-relaxed"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            نحن وكالة Ai Creative المتخصصة في التسويق الرقمي وإدارة السوشال ميديا.
            نقدم حلول تسويقية مبتكرة تحقق نتائج استثنائية لعملائنا.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="#contact"
              className="btn-primary text-base md:text-lg px-8 py-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition-all shadow-lg"
            >
              <span>تواصل معنا الآن</span>
              <i className="fas fa-arrow-left"></i>
            </a>
            
            <a
              href="#portfolio"
              className="btn-secondary text-base md:text-lg px-8 py-4 inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white hover:bg-white hover:text-gray-900 rounded-xl transition-all shadow-lg"
            >
              <span>شاهد أعمالنا</span>
              <i className="fas fa-eye"></i>
            </a>
          </motion.div>
        </motion.div>
        
        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-20 pt-16 border-t border-white/20 max-w-[90%] mx-auto"
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all">
            <div className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg gradient-text bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">500+</div>
            <div className="text-base md:text-lg text-gray-300">عميل راضي</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all">
            <div className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg gradient-text bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">1000+</div>
            <div className="text-base md:text-lg text-gray-300">حملة ناجحة</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all">
            <div className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg gradient-text bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">5+</div>
            <div className="text-base md:text-lg text-gray-300">سنوات خبرة</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all">
            <div className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg gradient-text bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">24/7</div>
            <div className="text-base md:text-lg text-gray-300">دعم فني</div>
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