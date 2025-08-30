'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Upload, Image as ImageIcon, Video, Plus, Check } from 'lucide-react'

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const UploadModal = ({ isOpen, onClose, onSuccess }: UploadModalProps) => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        // إعادة تعيين النموذج
        setFormData({
          title: '',
          category: '',
          type: 'image',
          url: '',
          thumbnail: '',
          description: ''
        })
        onSuccess()
        onClose()
      } else {
        setError(data.message || 'حدث خطأ في رفع العنصر')
      }
    } catch (error) {
      setError('حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

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
            <div className="w-10 h-10 bg-gradient-to-r from-secondary-600 to-primary-600 rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">إضافة عمل جديد</h3>
              <p className="text-sm text-gray-500">أضف عملاً جديداً إلى معرض الأعمال</p>
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
                    ? 'border-secondary-500 bg-secondary-50 text-secondary-700'
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
                    ? 'border-secondary-500 bg-secondary-50 text-secondary-700'
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent resize-none"
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
              className="flex-1 btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  جاري الرفع...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  إضافة العمل
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default UploadModal