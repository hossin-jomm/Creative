'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import ErrorBoundary from './ErrorBoundary'

const HeaderContent = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'من نحن', href: '#about' },
    { name: 'خدماتنا', href: '#services' },
    { name: 'أعمالنا', href: '#portfolio' },
    { name: 'الأسعار', href: '#pricing' },
    { name: 'تواصل معنا', href: '#contact' },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - تم تغيير الترتيب إلى order-2 ليظهر على اليمين */}
          <Link href="/" className="flex items-center order-2">
            <Image 
              src="/ai-Creative/logo.svg" 
              alt="Ai Creative Logo" 
              width={300} 
              height={120}
              className="w-auto h-8 md:h-10 lg:h-12 max-w-[220px] md:max-w-[300px] lg:max-w-[180px]" 
              priority
            />
          </Link>

          {/* Desktop Navigation - تم تغيير الترتيب إلى order-1 ليظهر على اليسار */}
          <nav className="hidden md:flex items-center order-1">
            <div className="flex gap-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`font-medium text-base lg:text-lg transition-colors duration-200 hover:text-secondary-600 hover:border-b-2 hover:border-secondary-600 py-1 text-right ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>

          {/* Mobile menu button - تم تغيير الترتيب إلى order-1 ليظهر على اليسار */}
          <button
            className="md:hidden p-2 order-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''
                } ${isScrolled ? 'bg-gray-700' : 'bg-white'}`}
              />
              <span
                className={`block w-6 h-0.5 bg-current transition-all duration-300 mt-1 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                } ${isScrolled ? 'bg-gray-700' : 'bg-white'}`}
              />
              <span
                className={`block w-6 h-0.5 bg-current transition-all duration-300 mt-1 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
                } ${isScrolled ? 'bg-gray-700' : 'bg-white'}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation - تم تعديل القائمة المنسدلة لتظهر من اليمين */}
        <motion.nav
          className={`mobile-menu ${isMobileMenuOpen ? 'visible' : 'hidden'} md:hidden py-4 bg-white`}
          initial={prefersReducedMotion ? { opacity: 1, x: '-100%' } : { opacity: 0, x: '-100%' }}
          animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
        >
          <div className="flex flex-col items-end w-full">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-6 py-3 text-gray-700 hover:text-secondary-600 hover:bg-gray-50 transition-colors duration-200 text-right text-base w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="mt-4 px-4 py-2 border-t border-gray-100 w-full">
              <button
                className="w-full py-3 px-6 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl hover:opacity-90 transition-opacity text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                تواصل معنا
              </button>
            </div>
          </div>
          </motion.nav>
      </div>
    </motion.header>
  )
}

const Header = () => {
  return (
    <ErrorBoundary>
      <HeaderContent />
    </ErrorBoundary>
  )
}

export default Header