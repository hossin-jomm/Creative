'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { 
  Megaphone, 
  Users, 
  GraduationCap, 
  Palette, 
  Target,
  Search
} from 'lucide-react'
import ErrorBoundary from './ErrorBoundary'
import SectionDivider from './SectionDivider'

const ServicesContent = () => {
  // استخدام hook لمعرفة ما إذا كان المستخدم يفضل تقليل الحركة
  const prefersReducedMotion = useReducedMotion()
  const services = [
    {
      icon: Megaphone,
      title: 'الإعلانات الممولة',
      description: 'نصمّم إعلانك ونديره على فيسبوك وإنستغرام بهدف الرسائل والطلبات، ونرسل لك تقريراً أسبوعياً بتكلفة كل رسالة',
      features: ['Facebook Ads', 'Instagram Ads', 'ضبط الاستهداف', 'تقرير أسبوعي'],
      color: 'from-secondary-600 to-secondary-700'
    },
    {
      icon: Users,
      title: 'إدارة المحتوى',
      description: 'خطة شهرية وتصاميم وريلز ومنشورات تعبّر عن مشروعك',
      features: ['خطة شهرية', 'تصاميم ومنشورات', 'ريلز', 'جدولة النشر'],
      color: 'from-secondary-600 to-secondary-700'
    },
    {
      icon: GraduationCap,
      title: 'التدريب',
      description: 'ورشة تطبيقية تتعلم فيها إدارة إعلاناتك بنفسك، من الصفر حتى أول مبيعة',
      features: ['مدير الإعلانات', 'الجمهور والاستهداف', 'إعلان يجلب رسائل', 'قراءة الأرقام'],
      color: 'from-secondary-600 to-secondary-700'
    },
    {
      icon: Palette,
      title: 'الهوية البصرية',
      description: 'شعار وألوان وخطوط تعطي مشروعك شكلاً واضحاً ومميزاً',
      features: ['الشعار', 'الألوان والخطوط', 'دليل الهوية', 'تصاميم السوشال ميديا'],
      color: 'from-secondary-600 to-secondary-700'
    }
  ]

  return (
    <section id="services" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true, margin: '0px 0px 120px 0px' }}
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            كل ما يحتاجه مشروعك
            <span className="block gradient-text mt-2">
              ليظهر ويبيع أونلاين
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            من الإعلان الممول إلى المحتوى اليومي والهوية البصرية، اختر ما تحتاجه الآن
            وأضف غيره حين يكبر مشروعك
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                className="card p-8 group cursor-pointer"
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : index * 0.1 }}
                viewport={{ once: true, margin: '0px 0px 120px 0px' }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-display font-bold mb-4 text-gray-800 group-hover:text-secondary-600 transition-colors duration-300">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-500">
                      <div className="w-2 h-2 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-full ml-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                
                {/* CTA */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <a 
                    href="#contact" 
                    className="text-secondary-600 font-semibold hover:text-secondary-700 transition-colors duration-200 inline-flex items-center gap-2"
                  >
                    اسألنا عن هذه الخدمة
                    <i className="fas fa-arrow-left text-sm" aria-hidden="true"></i>
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
        
        {/* Additional Services */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-secondary-50 to-primary-50 rounded-2xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true, margin: '0px 0px 120px 0px' }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-display font-bold mb-4 gradient-text">
              خدمات إضافية
            </h3>
            <p className="text-lg text-gray-600">
              تُطلب منفصلة أو تُضاف إلى أي باقة
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <Target className="w-12 h-12 text-secondary-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">دراسة المنافسين</h4>
              <p className="text-sm text-gray-600">ماذا يفعل منافسوك، وكيف تتميز عنهم</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <Search className="w-12 h-12 text-secondary-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">تحليل مجاني لصفحتك</h4>
              <p className="text-sm text-gray-600">3 ملاحظات عملية خلال 48 ساعة</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <i className="fas fa-comments text-3xl text-secondary-600 mb-4"></i>
              <h4 className="font-semibold mb-2">تدريب البيع بالرسائل</h4>
              <p className="text-sm text-gray-600">نعلّمك كيف تحوّل المحادثة إلى بيع</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <i className="fas fa-headset text-3xl text-secondary-600 mb-4"></i>
              <h4 className="font-semibold mb-2">خدمة ما بعد البيع</h4>
              <p className="text-sm text-gray-600">متابعة بعد انتهاء الحملة لنتأكد أن النتائج مستمرة</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Section Divider */}
      <div className="mt-16">
        <SectionDivider variant="gradient" />
      </div>
    </section>
  )
}

const Services = () => {
  return (
    <ErrorBoundary>
      <ServicesContent />
    </ErrorBoundary>
  )
}

export default Services