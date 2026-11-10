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
      title: 'استهداف دقيق',
      description: 'نحدد من هو زبونك وأين يوجد، ونوجّه إعلانك إليه وحده',
      color: 'text-secondary-600'
    },
    {
      icon: Sparkles,
      title: 'تصاميم تعبّر عن مشروعك',
      description: 'تصاميم ونصوص مكتوبة لزبونك في حلب، مع تعديلين مجانيين لكل تصميم',
      color: 'text-secondary-600'
    },
    {
      icon: TrendingUp,
      title: 'أرقام واضحة كل أسبوع',
      description: 'تقرير أسبوعي يوضح ما صُرف على الإعلان، وكم رسالة أو طلباً جلب، وتكلفة كل واحد',
      color: 'text-secondary-600'
    },
    {
      icon: Shield,
      title: 'سرية بياناتك',
      description: 'لا نشارك بيانات صفحتك أو زبائنك مع أي طرف، والتزامنا بذلك مكتوب في العقد',
      color: 'text-secondary-600'
    },
    {
      icon: Clock,
      title: 'استجابة سريعة',
      description: 'نرد على استفساراتك عبر واتساب خلال ساعات العمل ونتابع حملتك أولاً بأول',
      color: 'text-secondary-600'
    },
    {
      icon: Award,
      title: 'خبرة عملية في الإعلانات',
      description: 'خبرة فعلية في إدارة حملات فيسبوك وإنستغرام المدفوعة وقياس نتائجها بالأرقام',
      color: 'text-secondary-600'
    }
  ]

  const stats = [
    { number: 'أسبوعياً', color: 'text-black font-bold', label: 'تقرير بنتائج حملتك' },
    { number: '2', color: 'text-black font-bold', label: 'تعديلات مجانية لكل تصميم' },
    { number: '15 يوماً', color: 'text-black font-bold', label: 'إشعار مسبق فقط لإلغاء العقد' },
    { number: 'سرية', color: 'text-black font-bold', label: 'بياناتك وحساباتك محمية' }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true, margin: '0px 0px 120px 0px' }}
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            لماذا تختار
            <span className="block gradient-text mt-2">
              Ai Creative؟
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نُكبّر مشروعك ونكبر معك: شراكة واضحة، بأرقام تراها كل أسبوع
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
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, margin: '0px 0px 120px 0px' }}
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
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true, margin: '0px 0px 120px 0px' }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-display font-bold mb-4 gradient-text">
              التزاماتنا معك
            </h3>
            <p className="text-lg text-gray-600">
              ما تحصل عليه مع كل اشتراك، مكتوب في العقد
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, margin: '0px 0px 120px 0px' }}
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
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true, margin: '0px 0px 120px 0px' }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-display font-bold mb-4 gradient-text">
              كيف نعمل معك؟
            </h3>
            <p className="text-lg text-gray-600">
              4 خطوات واضحة، تعرف فيها أين يذهب كل دولار
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'نفهم مشروعك', desc: 'ماذا تبيع، ومن هو زبونك، وماذا يفعل منافسك' },
              { step: '02', title: 'نضع خطة', desc: 'هدف واضح، وجمهور، وميزانية، ومحتوى' },
              { step: '03', title: 'نطلق ونجرّب', desc: 'أكثر من إعلان، ونستمر بالأفضل أداءً' },
              { step: '04', title: 'نقيس كل أسبوع', desc: 'تقرير بالأرقام: عدد الرسائل وتكلفة كل رسالة' }
            ].map((process, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, margin: '0px 0px 120px 0px' }}
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