'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Target, Users, Award, Lightbulb } from 'lucide-react'
import ErrorBoundary from './ErrorBoundary'
import SectionDivider from './SectionDivider'

const AboutContent = () => {
  // استخدام hook لمعرفة ما إذا كان المستخدم يفضل تقليل الحركة
  const prefersReducedMotion = useReducedMotion()
  const features = [
    {
      icon: Target,
      title: 'رؤيتنا',
      description: 'أن نكون الوكالة الرائدة في التسويق الرقمي بالمنطقة العربية'
    },
    {
      icon: Users,
      title: 'مهمتنا',
      description: 'تمكين الشباب السوري من خلال التدريب وخلق فرص عمل مستدامة'
    },
    {
      icon: Award,
      title: 'خبرتنا',
      description: 'أكثر من 5 سنوات في مجال التسويق الرقمي والذكاء الاصطناعي'
    },
    {
      icon: Lightbulb,
      title: 'ابتكارنا',
      description: 'استخدام أحدث تقنيات الذكاء الاصطناعي في حملاتنا التسويقية'
    }
  ]

  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              من نحن؟
              <span className="block gradient-text mt-2">
                Ai Creative
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              نحن وكالة تسويق رقمي متخصصة في إنشاء وإدارة الحملات التسويقية المبتكرة 
              باستخدام أحدث تقنيات الذكاء الاصطناعي. نؤمن بقوة التسويق الرقمي في 
              تحويل الأعمال وتحقيق النمو المستدام.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              هدفنا الأساسي هو تدريب وتأهيل الشباب السوري في مجال التسويق الرقمي 
              وخلق فرص عمل حقيقية تساهم في بناء مستقبل أفضل. نقدم برامج تدريبية 
              شاملة تغطي جميع جوانب التسويق الحديث.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#services" className="btn-primary">
                اكتشف خدماتنا
              </a>
              <a href="#contact" className="btn-secondary">
                ابدأ مشروعك معنا
              </a>
            </div>
          </motion.div>
          
          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  className="card p-6 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
        
        {/* Company Values */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-display font-bold mb-8 gradient-text">
            قيمنا الأساسية
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-20 h-20 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-handshake text-2xl text-white"></i>
              </div>
              <h4 className="text-xl font-semibold mb-3">الشراكة الحقيقية</h4>
              <p className="text-gray-600">
                نؤمن بأن نجاح عملائنا هو نجاحنا، لذلك نعمل كشركاء حقيقيين في رحلة النمو
              </p>
            </div>
            
            <div className="p-6">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-rocket text-2xl text-white"></i>
              </div>
              <h4 className="text-xl font-semibold mb-3">الابتكار المستمر</h4>
              <p className="text-gray-600">
                نواكب أحدث التطورات في عالم التسويق الرقمي والذكاء الاصطناعي
              </p>
            </div>
            
            <div className="p-6">
              <div className="w-20 h-20 bg-gradient-to-r from-accent-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-heart text-2xl text-white"></i>
              </div>
              <h4 className="text-xl font-semibold mb-3">المسؤولية المجتمعية</h4>
              <p className="text-gray-600">
                نساهم في تنمية المجتمع من خلال تدريب الشباب وخلق فرص عمل جديدة
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Section Divider */}
      <div className="mt-16">
        <SectionDivider variant="wave" />
      </div>
    </section>
  )
}

const About = () => {
  return (
    <ErrorBoundary>
      <AboutContent />
    </ErrorBoundary>
  )
}

export default About