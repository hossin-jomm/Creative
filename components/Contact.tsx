'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import ErrorBoundary from './ErrorBoundary'
import LoadingSpinner from './LoadingSpinner'
import SectionDivider from './SectionDivider'
import * as validation from '@/utils/validation'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // تحقق من صحة البيانات أثناء الكتابة
    validateField(name, value)
  }
  
  const validateField = (name: string, value: string) => {
    let errorMessage = ''
    
    switch (name) {
      case 'name':
        if (!validation.isNotEmpty(value)) {
          errorMessage = validation.createErrorMessage('الاسم', 'required')
        } else if (!validation.hasMinLength(value, 3)) {
          errorMessage = validation.createErrorMessage('الاسم', 'minLength')
        }
        break
      case 'email':
        if (!validation.isNotEmpty(value)) {
          errorMessage = validation.createErrorMessage('البريد الإلكتروني', 'required')
        } else if (!validation.isValidEmail(value)) {
          errorMessage = validation.createErrorMessage('البريد الإلكتروني', 'email')
        }
        break
      case 'phone':
        if (value && !validation.isValidPhoneNumber(value)) {
          errorMessage = validation.createErrorMessage('رقم الهاتف', 'phone')
        }
        break
      case 'message':
        if (!validation.isNotEmpty(value)) {
          errorMessage = validation.createErrorMessage('الرسالة', 'required')
        } else if (!validation.hasMinLength(value, 10)) {
          errorMessage = 'يجب أن تحتوي الرسالة على 10 أحرف على الأقل'
        }
        break
      default:
        break
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }))
    
    return !errorMessage
  }

  const validateForm = () => {
    // التحقق من جميع الحقول
    const nameValid = validateField('name', formData.name)
    const emailValid = validateField('email', formData.email)
    const phoneValid = validateField('phone', formData.phone)
    const messageValid = validateField('message', formData.message)
    
    return nameValid && emailValid && phoneValid && messageValid
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // التحقق من صحة النموذج قبل الإرسال
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // محاكاة إرسال النموذج
      // في التطبيق الحقيقي، يمكن استبدال هذا بطلب API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsSubmitted(true)
      setFormData({ name: '', email: '', phone: '', service: '', message: '' })
      setErrors({ name: '', email: '', phone: '', message: '' })
      
      // إخفاء رسالة النجاح بعد 5 ثوان
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      value: 'info@aicreative.com',
      link: 'mailto:info@aicreative.com'
    },
    {
      icon: Phone,
      title: 'رقم الهاتف',
      value: '+963 994661991',
      link: 'tel:+963994661991'
    },
    {
      icon: MapPin,
      title: 'العنوان',
      value: 'حلب، سوريا',
      link: '#'
    }
  ]

  const socialLinks = [
    {
      name: 'Facebook',
      icon: 'fab fa-facebook-f',
      url: 'https://facebook.com/',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Instagram',
      icon: 'fab fa-instagram',
      url: 'https://instagram.com/',
      color: 'hover:text-pink-600'
    },
    {
      name: 'LinkedIn',
      icon: 'fab fa-linkedin-in',
      url: 'https://linkedin.com/company/',
      color: 'hover:text-blue-700'
    },
    {
      name: 'Twitter',
      icon: 'fab fa-twitter',
      url: 'https://twitter.com/',
      color: 'hover:text-blue-400'
    },
    {
      name: 'TikTok',
      icon: 'fab fa-tiktok',
      url: 'https://tiktok.com/',
      color: 'hover:text-black'
    },
    {
      name: 'YouTube',
      icon: 'fab fa-youtube',
      url: 'https://youtube.com/',
      color: 'hover:text-red-600'
    }
  ]

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
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
            تواصل
            <span className="block gradient-text mt-2">
              معنا الآن
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            هل أنت مستعد لتطوير عملك وتحقيق نجاح باهر؟ تواصل معنا اليوم 
            ودعنا نساعدك في بناء استراتيجية تسويقية ناجحة
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-display font-bold mb-6 gradient-text">
              أرسل لنا رسالة
            </h3>
            
            {isSubmitted && (
              <motion.div
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-green-700">تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.</p>
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200 ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    placeholder="أدخل اسمك الكامل"
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-600 text-sm flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200 ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-600 text-sm flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200 ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    placeholder="+963 123 456 789"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-red-600 text-sm flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    الخدمة المطلوبة
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">اختر الخدمة</option>
                    <option value="ads">الحملات الإعلانية</option>
                    <option value="social">إدارة السوشال ميديا</option>
                    <option value="training">التدريب</option>
                    <option value="branding">الهوية البصرية</option>
                    <option value="video">الموشن جرافيك</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  رسالتك *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-200 resize-none ${errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  placeholder="أخبرنا عن مشروعك وكيف يمكننا مساعدتك..."
                />
                {errors.message && (
                  <p className="mt-1 text-red-600 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.message}
                  </p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="small" color="white" />
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    إرسال الرسالة
                  </>
                )}
              </button>
            </form>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Contact Details */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-display font-bold mb-6 gradient-text">
                معلومات التواصل
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <motion.a
                      key={index}
                      href={info.link}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
                      whileHover={{ x: 10 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{info.title}</h4>
                        <p className="text-gray-600">{info.value}</p>
                      </div>
                    </motion.a>
                  )
                })}
              </div>
            </div>
            
            {/* Social Media */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-display font-bold mb-6 gradient-text">
                تابعنا على
              </h3>
              
              <div className="grid grid-cols-3 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group ${social.color}`}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-gray-200 transition-colors duration-200">
                      <i className={`${social.icon} text-xl text-gray-600`}></i>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
            
            {/* Working Hours */}
            <div className="bg-gradient-to-r from-secondary-600 to-primary-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-display font-bold mb-6">
                ساعات العمل
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>الأحد - الخميس</span>
                  <span className="font-semibold">9:00 ص - 6:00 م</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>الجمعة</span>
                  <span className="font-semibold">10:00 ص - 4:00 م</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>السبت</span>
                  <span className="font-semibold">مغلق</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm opacity-90">
                  <i className="fas fa-clock ml-2"></i>
                  نحن متاحون للرد على استفساراتكم خلال ساعات العمل
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const Contact = () => {
  return (
    <ErrorBoundary>
      <ContactForm />
    </ErrorBoundary>
  )
}

export default Contact