'use client'

import { useState, useEffect } from 'react'
// في Next.js 13 مع App Router، نستخدم useRouter من next/navigation
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Upload, 
  Image as ImageIcon, 
  Video, 
  Edit3, 
  Trash2, 
  Plus, 
  LogOut,
  BarChart3,
  Users,
  MessageSquare,
  Eye,
  X,
  Check,
  AlertCircle
} from 'lucide-react'
import UploadModal from '../../../components/admin/UploadModal'
import EditModal from '../../../components/admin/EditModal'
import ErrorBoundary from '@/components/ErrorBoundary'
import LoadingSpinner from '@/components/LoadingSpinner'

interface PortfolioItem {
  id: string
  title: string
  category: string
  type: 'image' | 'video'
  url: string
  thumbnail?: string
  description?: string
  createdAt: string
}

const AdminDashboardContent = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [stats, setStats] = useState({
    totalItems: 0,
    images: 0,
    videos: 0,
    recentUploads: 0
  })
  const router = useRouter()

  // التحقق من صحة التوكن عند تحميل الصفحة
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }

    // التحقق من صحة التوكن مع الخادم
    verifyToken(token)
  }, [])

  const verifyToken = async (token: string) => {
    try {
      if (!token) {
        throw new Error('لم يتم العثور على رمز المصادقة')
      }
      
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || ''
      const response = await fetch(`${base}/api/admin/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'فشل التحقق من الرمز' }))
        throw new Error(errorData.message || 'فشل التحقق من الرمز')
      }

      // تحميل بيانات المعرض
      loadPortfolioItems()
    } catch (error) {
      console.error('خطأ في التحقق من الرمز:', error)
      localStorage.removeItem('adminToken')
      router.push('/admin/login')
    }
  }

  const loadPortfolioItems = async () => {
    try {
      const response = await fetch('/api/portfolio')
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'فشل تحميل بيانات المعرض' }))
        throw new Error(errorData.message || `فشل تحميل البيانات: ${response.status}`)
      }
      
      const data = await response.json()
      const items = Array.isArray(data.items) ? data.items : []
      
      setPortfolioItems(items)
      updateStats(items)
    } catch (error) {
      console.error('خطأ في تحميل بيانات المعرض:', error)
      // يمكن إضافة إشعار للمستخدم هنا
    } finally {
      setIsLoading(false)
    }
  }

  const updateStats = (items: PortfolioItem[]) => {
    const images = items.filter(item => item.type === 'image').length
    const videos = items.filter(item => item.type === 'video').length
    const recentUploads = items.filter(item => {
      const uploadDate = new Date(item.createdAt)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return uploadDate > weekAgo
    }).length

    setStats({
      totalItems: items.length,
      images,
      videos,
      recentUploads
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
  }

  const deleteItem = async (id: string) => {
    if (!id || typeof id !== 'string') {
      console.error('معرف العنصر غير صالح')
      return
    }
    
    if (!confirm('هل أنت متأكد من حذف هذا العنصر؟')) return

    try {
      const token = localStorage.getItem('adminToken')
      
      if (!token) {
        throw new Error('لم يتم العثور على رمز المصادقة')
      }
      
      const response = await fetch(`/api/portfolio/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'فشل حذف العنصر' }))
        throw new Error(errorData.message || `فشل حذف العنصر: ${response.status}`)
      }
      
      // تحديث القائمة بعد الحذف
      loadPortfolioItems()
    } catch (error) {
      console.error('خطأ في حذف العنصر:', error)
      // يمكن إضافة إشعار للمستخدم هنا
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" color="secondary" text="جاري التحميل..." />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-secondary-600 to-primary-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">لوحة التحكم</h1>
                <p className="text-sm text-gray-500">Ai Creative Admin</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Eye className="w-4 h-4" />
                عرض الموقع
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الأعمال</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalItems}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الصور</p>
                <p className="text-3xl font-bold text-gray-900">{stats.images}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الفيديوهات</p>
                <p className="text-3xl font-bold text-gray-900">{stats.videos}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">رفع حديث</p>
                <p className="text-3xl font-bold text-gray-900">{stats.recentUploads}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Upload className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">إدارة المعرض</h2>
          <button
            onClick={() => setShowUploadModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            إضافة عمل جديد
          </button>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="aspect-video relative overflow-hidden">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={item.url}
                    className="w-full h-full object-cover"
                    muted
                  />
                )}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.type === 'image' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {item.type === 'image' ? 'صورة' : 'فيديو'}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{item.category}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString('ar-SA')}
                  </span>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="تعديل"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {portfolioItems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد أعمال بعد</h3>
            <p className="text-gray-500 mb-6">ابدأ بإضافة أول عمل إلى معرضك</p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="btn-primary"
            >
              إضافة عمل جديد
            </button>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSuccess={loadPortfolioItems}
      />

      {/* Edit Modal */}
      <EditModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onSuccess={loadPortfolioItems}
      />
    </div>
  )
}

const AdminDashboard = () => {
  return (
    <ErrorBoundary>
      <AdminDashboardContent />
    </ErrorBoundary>
  )
}

export default AdminDashboard