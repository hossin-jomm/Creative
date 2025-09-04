'use client'

import { motion } from 'framer-motion'
import { 
  Target, 
  Sparkles, 
  HeadphonesIcon, 
  MessageSquare,
  TrendingUp,
  Shield,
  Clock,
  Award
} from 'lucide-react'

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Target,
      title: 'استراتيجيات تسويق مستهدفة',
      description: 'نحلل جمهورك المستهدف بدقة ونضع استراتيجيات مخصصة تحقق أفضل النتائج',
      color: 'text-blue-600'
    },
    {
      icon: Sparkles,
      title: 'تصميمات فريدة وجودة عالية',
      description: 'فريق إبداعي متخصص يقدم تصميمات مبتكرة ومحتوى عالي الجودة يميز علامتك التجارية',
      color: 'text-purple-600'
    },
    {
      icon: HeadphonesIcon,
      title: 'خدمة ما بعد البيع المتميزة',
      description: 'دعم فني مستمر ومتابعة دورية لضمان تحقيق أهدافك وتطوير أدائك باستمرار',
      color: 'text-green-600'
    },
    {
      icon: MessageSquare,
      title: 'تدريب العملاء على البيع بالرسائل',
      description: 'برامج تدريبية متخصصة لتعليم فن البيع عبر المحادثات وزيادة معدلات التحويل',
      color: 'text-orange-600'
    },
    {
      icon: TrendingUp,
      title: 'نتائج مثبتة وقابلة للقياس',
      description: 'تقارير شفافة ومفصلة تظهر تحسن الأداء وعائد الاستثمار بوضوح',
      color: 'text-red-600'
    },
    {
      icon: Shield,
      title: 'أمان وموثوقية عالية',
      description: 'حماية كاملة لبياناتك وحساباتك مع التزام تام بمعايير الأمان والخصوصية',
      color: 'text-indigo-600'
    },
    {
      icon: Clock,
      title: 'استجابة سريعة 24/7',
      description: 'فريق دعم متاح على مدار الساعة للرد على استفساراتك وحل أي مشاكل فورياً',
      color: 'text-gray-600'
    },
    {
      icon: Award,
      title: 'خبرة وشهادات معتمدة',
      description: 'فريق من الخبراء المعتمدين من Google و Facebook مع سنوات من الخبرة العملية',
      color: 'text-yellow-600'
    }
  ]

  const stats = [
    { number: '98%' ,color: 'text-black font-bold', label: 'معدل رضا العملاء' },
    { number: '300%',color: 'text-black font-bold' , label: 'متوسط زيادة المبيعات' },
    { number: '24h',color: 'text-black font-bold' , label: 'وقت الاستجابة' },
    { number: '500+',color: 'text-black font-bold' , label: 'مشروع ناجح' }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            لماذا تختار
            <span className="block gradient-text mt-2">
              Ai Creative؟
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نحن لا نقدم مجرد خدمات تسويقية، بل نبني شراكات طويلة الأمد تضمن نجاحك 
            وتطوير عملك بشكل مستدام ومربح
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="mb-4">
                  <Icon className={`w-12 h-12 ${reason.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <h3 className="text-lg font-display font-bold mb-3 text-gray-800">
                  {reason.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-display font-bold mb-4 gradient-text">
              أرقام تتحدث عن نفسها
            </h3>
            <p className="text-lg text-gray-600">
              إنجازاتنا مع عملائنا خلال السنوات الماضية
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`text-4xl lg:text-5xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-display font-bold mb-4 gradient-text">
              كيف نعمل معك؟
            </h3>
            <p className="text-lg text-gray-600">
              عملية واضحة ومنظمة لضمان تحقيق أفضل النتائج
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'التحليل والدراسة', desc: 'دراسة شاملة لعملك والسوق المستهدف' },
              { step: '02', title: 'وضع الاستراتيجية', desc: 'تطوير خطة تسويقية مخصصة لأهدافك' },
              { step: '03', title: 'التنفيذ والمتابعة', desc: 'تطبيق الخطة مع متابعة دقيقة للنتائج' },
              { step: '04', title: 'التحسين المستمر', desc: 'تطوير وتحسين الأداء بناءً على البيانات' }
            ].map((process, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  {process.step}
                </div>
                <h4 className="text-lg font-semibold mb-2">{process.title}</h4>
                <p className="text-gray-600 text-sm">{process.desc}</p>
                
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-secondary-300 to-primary-300 transform -translate-x-1/2"></div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUs