'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Save, Image as ImageIcon, Video, Check } from 'lucide-react'

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

interface EditModalProps {
  item: PortfolioItem | null
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const EditModal = ({ item, isOpen, onClose, onSuccess }: EditModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    type: 'image' as 'image' | 'video',
    url: '',
    thumbnail: '',
    description: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const categories = [
    'إعلانات مدفوعة',
    'سوشال ميديا',
    'هوية بصرية',
    'موشن جرافيك',
    'تصميم جرافيك',
    'تدريب',
    'أخرى'
  ]

  // تحديث البيانات عند تغيير العنصر
  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title,
        category: item.category,
        type: item.type,
        url: item.url,
        thumbnail: item.thumbnail || '',
        description: item.description || ''
      })
    }
  }, [item])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!item) return
    
    setIsLoading(true)
    setError('')

    // التحقق من البيانات
    if (!formData.title || !formData.category || !formData.url) {
      setError('يرجى ملء جميع الحقول المطلوبة')
      setIsLoading(false)
      return
    }

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/portfolio/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        onSuccess()
        onClose()
      } else {
        setError(data.message || 'حدث خطأ في تحديث العنصر')
      }
    } catch (error) {
      setError('حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen || !item) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Save className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">تعديل العمل</h3>
              <p className="text-sm text-gray-500">تعديل تفاصيل العمل في المعرض</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Type Selection */}
          <div>
            <label className="block text-gray-700 font-semibold mb-3">نوع المحتوى *</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'image' })}
                className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                  formData.type === 'image'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <ImageIcon className="w-6 h-6" />
                <span className="font-medium">صورة</span>
                {formData.type === 'image' && <Check className="w-5 h-5 mr-auto" />}
              </button>
              
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'video' })}
                className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                  formData.type === 'video'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Video className="w-6 h-6" />
                <span className="font-medium">فيديو</span>
                {formData.type === 'video' && <Check className="w-5 h-5 mr-auto" />}
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">عنوان العمل *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="أدخل عنوان العمل"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">التصنيف *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">اختر التصنيف</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* URL */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              رابط {formData.type === 'image' ? 'الصورة' : 'الفيديو'} *
            </label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`أدخل رابط ${formData.type === 'image' ? 'الصورة' : 'الفيديو'}`}
            />
          </div>

          {/* Thumbnail (for videos) */}
          {formData.type === 'video' && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">صورة مصغرة (اختياري)</label>
              <input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="رابط الصورة المصغرة للفيديو"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">الوصف (اختياري)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="وصف مختصر عن العمل"
            />
          </div>

          {/* Preview */}
          {formData.url && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">معاينة</label>
              <div className="border border-gray-200 rounded-lg p-4">
                {formData.type === 'image' ? (
                  <img
                    src={formData.url}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                ) : (
                  <video
                    src={formData.url}
                    className="w-full h-48 object-cover rounded-lg"
                    controls
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  حفظ التغييرات
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default EditModal