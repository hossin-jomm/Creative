'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Clock, X } from 'lucide-react'
import ErrorBoundary from './ErrorBoundary'
import LoadingSpinner from './LoadingSpinner'
import SectionDivider from './SectionDivider'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import type { Slide } from 'yet-another-react-lightbox'

// Required CSS imports
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'

type PortfolioItem = {
  id: string
  title: string
  description: string
  category: string
  url: string
  type: 'image' | 'video'
  thumbnail: string
  createdAt?: string
}

const PortfolioContent = () => {
  // استخدام hook لمعرفة ما إذا كان المستخدم يفضل تقليل الحركة
  const prefersReducedMotion = useReducedMotion()
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // جلب البيانات من API
    const fetchPortfolioItems = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/portfolio')
        if (response.ok) {
          const data = await response.json()
          // التحقق من وجود البيانات في الشكل الصحيح
          if (data && data.items && Array.isArray(data.items)) {
            setPortfolioItems(data.items)
          } else {
            console.error('بيانات المعرض ليست بالتنسيق المتوقع')
            setPortfolioItems([])
            setError('حدث خطأ في تنسيق البيانات')
          }
        } else {
          console.error('فشل في جلب بيانات المعرض')
          setError('فشل في جلب بيانات المعرض')
        }
      } catch (error) {
        console.error('خطأ في جلب بيانات المعرض:', error)
        setError('حدث خطأ أثناء الاتصال بالخادم')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPortfolioItems()
  }, [])

  // Ensure portfolioItems is an array before filtering
  const filteredItems = Array.isArray(portfolioItems) 
    ? (selectedCategory === 'all' 
      ? portfolioItems 
      : portfolioItems.filter(item => item.category === selectedCategory))
    : []

  const openLightbox = (item: PortfolioItem) => {
    setSelectedItem(item)
    setIsLightboxOpen(true)
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    // Reset selected item after lightbox closes
    setTimeout(() => setSelectedItem(null), 300)
    // Re-enable scrolling
    document.body.style.overflow = 'auto'
  }

  // تعريف الفئات
  const categories = [
    { id: 'all', name: 'الكل' },
    { id: 'إعلانات', name: 'إعلانات' },
    { id: 'موشن جرافيك', name: 'موشن جرافيك' },
    { id: 'تصميم', name: 'تصميم' },
    { id: 'سوشال ميديا', name: 'سوشال ميديا' },
  ]

  // تكوين الحركة بناءً على تفضيل المستخدم
  const animationProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
        viewport: { once: true }
      }
      
  // Prepare slides for lightbox
  const lightboxSlides: Slide[] = selectedItem
    ? [
        {
          src: selectedItem.url,
          title: selectedItem.title || "",
          description: `${
            categories.find((cat) => cat.id === selectedItem.category)?.name ?? ""
          }${
            selectedItem.createdAt
              ? " • " + new Date(selectedItem.createdAt).toLocaleDateString()
              : ""
          }\n${selectedItem.description || ""}`
        },
      ]
    : [];

  return (
    <section id="portfolio" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          {...animationProps}
        >
          <h2 className="text-4xl font-display font-bold text-gray-800 mb-4">معرض أعمالنا</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نفخر بتقديم مجموعة متنوعة من المشاريع التي قمنا بتنفيذها لعملائنا. استكشف أعمالنا واكتشف كيف يمكننا مساعدتك في تحقيق رؤيتك.
          </p>
        </motion.div>
        
        <SectionDivider className="mb-8" variant="gradient" />

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="large" text="جاري تحميل المعرض..." />
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-12 bg-red-50 rounded-lg">
            <p className="text-xl text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            >
              إعادة المحاولة
            </button>
          </div>
        )}

        {/* Content when data is loaded successfully */}
        {!isLoading && !error && (
          <>
            {/* Category Filter */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-secondary-600 to-primary-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </motion.div>

            {/* Portfolio Grid */}
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">لا توجد أعمال متاحة في هذه الفئة حالياً</p>
              </div>
            ) : (
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={prefersReducedMotion ? {} : {
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial={prefersReducedMotion ? undefined : "hidden"}
                whileInView={prefersReducedMotion ? undefined : "show"}
                viewport={{ once: true, margin: "-50px" }}
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="group cursor-pointer"
                    variants={prefersReducedMotion ? {} : {
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                    onClick={() => openLightbox(item)}
                  >
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                      {/* Thumbnail */}
                      <div className="relative overflow-hidden">
                        <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300">
                          <img 
                            src={item.thumbnail || item.url} 
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                          <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <span className="inline-block px-4 py-1 border border-white/60 rounded-full text-sm font-medium mb-2">
                              عرض التفاصيل
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 bg-white">
                        <h3 className="text-lg font-display font-bold mb-2 text-gray-800 group-hover:text-secondary-600 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {item.description}
                        </p>
                        
                        {/* Category Badge */}
                        <div className="mt-4">
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-secondary-100 to-primary-100 text-secondary-700 text-xs font-semibold rounded-full">
                            {categories.find(cat => cat.id === item.category)?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* CTA Section */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-gray-600 mb-6">
                هل تريد أن يكون مشروعك التالي في معرض أعمالنا؟
              </p>
              <a href="#contact" className="btn-primary text-lg px-8 py-4">
                ابدأ مشروعك الآن
              </a>
            </motion.div>
          </>
        )}
      </div>

      {/* Lightbox */}
      {selectedItem?.type === "video" && isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-2xl z-10"
          >
            ✕
          </button>
          <div className="flex items-center justify-center h-full w-full p-8">
            <video
              src={selectedItem.url}
              controls
              className="max-w-full max-h-full"
              autoPlay
            />
          </div>
        </div>
      )}
      
      {/* Yet Another React Lightbox for images */}
      <Lightbox
        open={isLightboxOpen && selectedItem?.type !== "video"}
        close={closeLightbox}
        slides={lightboxSlides}
        plugins={[Captions]}
        captions={{ descriptionTextAlign: "center" }}
      />
    </section>
  )
}

const Portfolio = () => {
  return (
    <ErrorBoundary>
      <PortfolioContent />
      {/* Section Divider */}
      <div className="mt-16">
        <SectionDivider variant="dots" />
      </div>
    </ErrorBoundary>
  )
}

export default Portfolio