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
      title: 'نركّز على النتيجة',
      description: 'نقيس كل حملة بعدد الرسائل والطلبات وتكلفتها، لا بعدد الإعجابات'
    },
    {
      icon: Users,
      title: 'فريق محلي',
      description: 'نعرف سوق حلب وزبائنه، ونكتب إعلانك بلغتهم'
    },
    {
      icon: Award,
      title: 'خبرة في الإعلانات',
      description: 'خبرة عملية في إدارة حملات فيسبوك وإنستغرام المدفوعة وضبط استهدافها'
    },
    {
      icon: Lightbulb,
      title: 'أسرع بالذكاء الاصطناعي',
      description: 'نستخدم أدوات الذكاء الاصطناعي لننتج تصاميم ونصوصاً أكثر في وقت أقل'
    }
  ]

  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, margin: '0px 0px 120px 0px' }}
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              من نحن؟
              <span className="block gradient-text mt-2">
                Ai Creative
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              وكالة تسويق رقمي في حلب، نساعد المطاعم والمتاجر والعيادات والمشاريع الصغيرة
              على جذب زبائن جدد من فيسبوك وإنستغرام: نكتب الإعلان، نصمّمه، نطلقه، ونتابع أرقامه.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              نتابع حملتك أولاً بأول، ونرد عليك عبر واتساب خلال ساعات العمل.
              وكل أسبوع يصلك تقرير واضح: ما الذي صرفناه، وماذا جلب لك.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-start">
              <a href="#services" className="btn-primary">
                شاهد خدماتنا
              </a>
              <a href="#contact" className="btn-secondary">
                اسألنا عن مشروعك
              </a>
            </div>
          </motion.div>
          
          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true, margin: '0px 0px 120px 0px' }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  className="card p-6 text-center"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true, margin: '0px 0px 120px 0px' }}
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