'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { 
  Megaphone, 
  Users, 
  GraduationCap, 
  Palette, 
  Video, 
  BarChart3,
  Target,
  Smartphone
} from 'lucide-react'
import ErrorBoundary from './ErrorBoundary'
import SectionDivider from './SectionDivider'

const ServicesContent = () => {
  // استخدام hook لمعرفة ما إذا كان المستخدم يفضل تقليل الحركة
  const prefersReducedMotion = useReducedMotion()
  const services = [
    {
      icon: Megaphone,
      title: 'الحملات الإعلانية المدفوعة',
      description: 'إنشاء وإدارة حملات إعلانية احترافية على جميع المنصات مع دراسة مفصلة للنتائج وتحليل الأداء',
      features: ['Facebook Ads', 'Google Ads', 'Instagram Ads', 'تحليل النتائج'],
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: Users,
      title: 'إدارة السوشال ميديا',
      description: 'إدارة شاملة لحساباتك على منصات التواصل الاجتماعي مع محتوى إبداعي يجذب جمهورك المستهدف',
      features: ['إنشاء المحتوى', 'جدولة المنشورات', 'التفاعل مع الجمهور', 'تقارير الأداء'],
      color: 'from-pink-500 to-rose-600'
    },
    {
      icon: GraduationCap,
      title: 'التدريب الاحترافي',
      description: 'برامج تدريبية متخصصة في التسويق الرقمي لتأهيل الشباب وخلق فرص عمل حقيقية',
      features: ['Facebook Ads', 'Google Ads', 'TikTok Ads', 'شهادات معتمدة'],
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: Palette,
      title: 'تصميم الهوية البصرية',
      description: 'تصميم هوية بصرية متكاملة تعكس شخصية علامتك التجارية وتميزها عن المنافسين',
      features: ['تصميم الشعار', 'الألوان والخطوط', 'دليل الهوية', 'تطبيقات الهوية'],
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Video,
      title: 'موشن جرافيك وإنتاج الفيديو',
      description: 'إنتاج فيديوهات احترافية وموشن جرافيك مبهر يحكي قصة علامتك التجارية بطريقة جذابة',
      features: ['موشن جرافيك', 'فيديوهات ترويجية', 'أنيميشن 2D/3D', 'مونتاج احترافي'],
      color: 'from-purple-500 to-indigo-600'
    },
    {
      icon: BarChart3,
      title: 'تحليل البيانات والتقارير',
      description: 'تحليل شامل لأداء حملاتك التسويقية مع تقارير مفصلة وتوصيات لتحسين النتائج',
      features: ['Google Analytics', 'تقارير مخصصة', 'تحليل المنافسين', 'KPIs'],
      color: 'from-cyan-500 to-blue-600'
    }
  ]

  return (
    <section id="services" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            خدماتنا
            <span className="block gradient-text mt-2">
              المتخصصة
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نقدم مجموعة شاملة من الخدمات التسويقية المتطورة التي تلبي جميع احتياجات 
            عملك الرقمي وتحقق أهدافك التسويقية بكفاءة عالية
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                className="card p-8 group cursor-pointer"
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : index * 0.1 }}
                viewport={{ once: true }}
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
                    اطلب الخدمة الآن
                    <i className="fas fa-arrow-left text-sm"></i>
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
        
        {/* Additional Services */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-secondary-50 to-primary-50 rounded-2xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-display font-bold mb-4 gradient-text">
              خدمات إضافية مميزة
            </h3>
            <p className="text-lg text-gray-600">
              نقدم أيضاً خدمات متخصصة لتلبية احتياجاتك الفريدة
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <Target className="w-12 h-12 text-secondary-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">استراتيجيات مخصصة</h4>
              <p className="text-sm text-gray-600">خطط تسويقية مصممة خصيصاً لعملك</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <Smartphone className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <p className="font-semibold mb-2">تطبيقات الجوال</p>
              <p className="text-sm text-gray-600">تسويق التطبيقات وزيادة التحميلات</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <i className="fas fa-comments text-3xl text-accent-600 mb-4"></i>
              <h4 className="font-semibold mb-2">تدريب البيع بالرسائل</h4>
              <p className="text-sm text-gray-600">تعلم فن البيع عبر المحادثات</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <i className="fas fa-headset text-3xl text-orange-600 mb-4"></i>
              <h4 className="font-semibold mb-2">خدمة ما بعد البيع</h4>
              <p className="text-sm text-gray-600">دعم مستمر لضمان نجاحك</p>
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