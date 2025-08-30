'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import ErrorBoundary from './ErrorBoundary'

const WhatsAppFloatContent = () => {
  // استخدام متغيرات البيئة لرقم الواتساب والرسالة
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+963994661991'
  const message = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || 'مرحباً! أريد الاستفسار عن خدماتكم التسويقية.'
  const prefersReducedMotion = useReducedMotion()
  
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={prefersReducedMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 2 }}
    >
      {/* WhatsApp Button */}
      <motion.button
        onClick={handleWhatsAppClick}
        className="relative w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-2xl transition-all duration-300 group"
        whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
        animate={prefersReducedMotion ? {} : {
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: prefersReducedMotion ? 0 : Infinity,
          repeatType: "reverse",
        }}
      >
        {/* WhatsApp Icon */}
        <i className="fab fa-whatsapp text-2xl"></i>
        
        {/* Pulse Animation */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
        )}
        
        {/* Notification Badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-white">1</span>
        </div>
      </motion.button>
      
      {/* Tooltip */}
      <motion.div
        className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
      >
        <div className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap relative">
          تواصل معنا عبر الواتساب
          {/* Arrow */}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      </motion.div>
      
      {/* Chat Preview (Optional) */}
      <motion.div
        className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 overflow-hidden"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileHover={{ opacity: 1, scale: 1, y: 0 }}
      >
        {/* Header */}
        <div className="bg-green-500 p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <i className="fab fa-whatsapp text-lg"></i>
            </div>
            <div>
              <h4 className="font-semibold">Ai Creative</h4>
              <p className="text-sm opacity-90">متاح الآن</p>
            </div>
          </div>
        </div>
        
        {/* Message */}
        <div className="p-4">
          <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 mb-3">
            <p className="text-sm text-gray-700">
              مرحباً! 👋
              <br />
              كيف يمكننا مساعدتك اليوم؟
            </p>
            <span className="text-xs text-gray-500 mt-1 block">الآن</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-500">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-xs">يكتب...</span>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="border-t border-gray-100 p-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button className="bg-gray-50 hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200">
              💼 خدماتنا
            </button>
            <button className="bg-gray-50 hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200">
              💰 الأسعار
            </button>
            <button className="bg-gray-50 hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200">
              📞 اتصل بنا
            </button>
            <button className="bg-gray-50 hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200">
              📧 البريد
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const WhatsAppFloat = () => {
  return (
    <ErrorBoundary>
      <WhatsAppFloatContent />
    </ErrorBoundary>
  )
}

export default WhatsAppFloat