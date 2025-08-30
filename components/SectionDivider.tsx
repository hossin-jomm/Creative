'use client'

import { motion } from 'framer-motion'

type SectionDividerProps = {
  variant?: 'wave' | 'gradient' | 'dots'
  className?: string
  invertColors?: boolean
}

const SectionDivider = ({
  variant = 'gradient',
  className = '',
  invertColors = false
}: SectionDividerProps) => {
  // تحقق من تفضيل المستخدم لتقليل الحركة
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false

  // تكوين الحركة بناءً على تفضيل المستخدم
  const animationProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.7 },
        viewport: { once: true, margin: '-50px' }
      }

  // تحديد الألوان بناءً على خيار عكس الألوان
  const colorClasses = invertColors
    ? 'from-white to-gray-50'
    : 'from-gray-50 to-white'

  if (variant === 'wave') {
    return (
      <motion.div
        className={`w-full overflow-hidden ${className}`}
        {...animationProps}
      >
        <svg
          className="w-full h-auto"
          viewBox="0 0 1440 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,50 C320,120 420,0 720,50 C1020,100 1120,0 1440,70 L1440,100 L0,100 Z"
            className={`fill-current ${invertColors ? 'text-white' : 'text-gray-50'}`}
          />
        </svg>
      </motion.div>
    )
  }

  if (variant === 'dots') {
    return (
      <motion.div
        className={`flex justify-center py-8 ${className}`}
        {...animationProps}
      >
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500`}
            />
          ))}
        </div>
      </motion.div>
    )
  }

  // الخيار الافتراضي: gradient
  return (
    <motion.div
      className={`h-1 w-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 ${className}`}
      {...animationProps}
    />
  )
}

export default function SectionDividerWithErrorBoundary(props: SectionDividerProps) {
  return (
    <SectionDivider {...props} />
  )
}