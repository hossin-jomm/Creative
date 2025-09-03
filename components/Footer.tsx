'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const prefersReducedMotion = useReducedMotion()

  const footerLinks = {
    company: [
      { name: 'من نحن', href: '#about' },
      { name: 'خدماتنا', href: '#services' },
      { name: 'أعمالنا', href: '#portfolio' },
      { name: 'تواصل معنا', href: '#contact' }
    ],
    services: [
      { name: 'الحملات الإعلانية', href: '#services' },
      { name: 'إدارة السوشال ميديا', href: '#services' },
      { name: 'التدريب الاحترافي', href: '#services' },
      { name: 'الهوية البصرية', href: '#services' }
    ],
    support: [
      { name: 'مركز المساعدة', href: '#' },
      { name: 'الأسئلة الشائعة', href: '#' },
      { name: 'سياسة الخصوصية', href: '#' },
      { name: 'شروط الاستخدام', href: '#' }
    ]
  }

  const socialLinks = [
    {
      name: 'Facebook',
      icon: 'fab fa-facebook-f',
      url: 'https://facebook.com/',
      color: 'hover:bg-blue-600'
    },
    {
      name: 'Instagram',
      icon: 'fab fa-instagram',
      url: 'https://instagram.com/',
      color: 'hover:bg-pink-600'
    },
    {
      name: 'LinkedIn',
      icon: 'fab fa-linkedin-in',
      url: 'https://linkedin.com/company/',
      color: 'hover:bg-blue-700'
    },
    {
      name: 'Twitter',
      icon: 'fab fa-twitter',
      url: 'https://twitter.com/  ',
      color: 'hover:bg-blue-400'
    },
    {
      name: 'TikTok',
      icon: 'fab fa-tiktok',
      url: 'https://tiktok.com/@a',
      color: 'hover:bg-black'
    },
    {
      name: 'YouTube',
      icon: 'fab fa-youtube',
      url: 'https://youtube.com/@a',
      color: 'hover:bg-red-600'
    }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <motion.div
            className="lg:col-span-1"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            viewport={{ once: true }}
          >
            {/* Logo */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-secondary-600 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <span className="font-display font-bold text-2xl gradient-text bg-gradient-to-r from-secondary-400 to-primary-400 bg-clip-text text-transparent">
                Ai Creative
              </span>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              وكالة تسويق رقمي متخصصة في إنشاء حملات تسويقية مبتكرة 
              باستخدام أحدث تقنيات الذكاء الاصطناعي.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 ${social.color} ${prefersReducedMotion ? '' : 'hover:scale-110'}`}
                  whileHover={prefersReducedMotion ? {} : { y: -3 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                >
                  <i className={`${social.icon} text-sm`}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Company Links */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-display font-bold mb-6">الشركة</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Services Links */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-display font-bold mb-6">خدماتنا</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Support Links */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-display font-bold mb-6">الدعم</h3>
            <ul className="space-y-3 mb-6">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <i className="fas fa-envelope w-4"></i>
                <span className="text-sm">info@aicreative.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <i className="fas fa-phone w-4"></i>
                <span className="text-sm">+963 0994661991</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <i className="fas fa-map-marker-alt w-4"></i>
                <span className="text-sm">حلب ، سوريا</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <motion.div
        className="border-t border-gray-800"
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-xl font-display font-bold mb-4">
              اشترك في نشرتنا الإخبارية
            </h3>
            <p className="text-gray-300 mb-6">
              احصل على آخر النصائح والاستراتيجيات التسويقية مباشرة في بريدك الإلكتروني
            </p>
            
            <div className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="btn-primary px-6 py-3 whitespace-nowrap">
                اشتراك
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} Ai Creative. جميع الحقوق محفوظة.
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors duration-200">
                سياسة الخصوصية
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                شروط الاستخدام
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                ملفات تعريف الارتباط
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <motion.button
        className="fixed bottom-20 left-6 w-12 h-12 bg-gradient-to-r from-secondary-600 to-primary-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 z-40"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <i className="fas fa-arrow-up"></i>
      </motion.button>
    </footer>
  )
}

export default Footer