/**
 * وظائف التحقق من صحة البيانات للاستخدام في جميع أنحاء التطبيق
 */

// التحقق من البريد الإلكتروني
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// التحقق من أن النص ليس فارغًا
export const isNotEmpty = (text: string): boolean => {
  return text.trim().length > 0;
};

// التحقق من الحد الأدنى للطول
export const hasMinLength = (text: string, minLength: number): boolean => {
  return text.trim().length >= minLength;
};

// التحقق من الحد الأقصى للطول
export const hasMaxLength = (text: string, maxLength: number): boolean => {
  return text.trim().length <= maxLength;
};

// التحقق من أن النص يحتوي على أحرف فقط
export const containsOnlyLetters = (text: string): boolean => {
  const letterRegex = /^[A-Za-z\u0600-\u06FF\s]+$/; // يدعم الأحرف العربية والإنجليزية
  return letterRegex.test(text);
};

// التحقق من أن النص يحتوي على أرقام فقط
export const containsOnlyNumbers = (text: string): boolean => {
  const numberRegex = /^[0-9]+$/;
  return numberRegex.test(text);
};

// التحقق من أن النص يحتوي على أحرف وأرقام
export const containsLettersAndNumbers = (text: string): boolean => {
  const letterNumberRegex = /^(?=.*[0-9])(?=.*[A-Za-z\u0600-\u06FF])[A-Za-z\u0600-\u06FF0-9\s]+$/;
  return letterNumberRegex.test(text);
};

// التحقق من صحة رابط URL
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

// التحقق من صحة رقم الهاتف (يمكن تعديله حسب تنسيق الهاتف المطلوب)
export const isValidPhoneNumber = (phone: string): boolean => {
  // هذا مثال بسيط، يمكن تعديله حسب تنسيق الهاتف المطلوب
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
};

// التحقق من أن القيمة هي رقم صحيح
export const isInteger = (value: string): boolean => {
  return /^-?\d+$/.test(value);
};

// التحقق من أن القيمة هي رقم عشري
export const isDecimal = (value: string): boolean => {
  return /^-?\d+(\.\d+)?$/.test(value);
};

// التحقق من أن القيمة في نطاق معين
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

// التحقق من تطابق كلمتي المرور
export const passwordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

// التحقق من قوة كلمة المرور
export const isStrongPassword = (password: string): boolean => {
  // على الأقل 8 أحرف، حرف كبير واحد، حرف صغير واحد، رقم واحد، وحرف خاص واحد
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  return strongPasswordRegex.test(password);
};

// دالة مساعدة للتحقق من عدة شروط معًا
export const validateAll = (validations: boolean[]): boolean => {
  return validations.every(isValid => isValid);
};

// دالة لإنشاء رسائل خطأ
export const createErrorMessage = (fieldName: string, validationType: string): string => {
  const errorMessages: Record<string, Record<string, string>> = {
    ar: {
      required: `حقل ${fieldName} مطلوب`,
      email: `يرجى إدخال بريد إلكتروني صحيح`,
      minLength: `يجب أن يحتوي ${fieldName} على الأقل على الحد الأدنى من الأحرف`,
      maxLength: `يجب أن لا يتجاوز ${fieldName} الحد الأقصى من الأحرف`,
      url: `يرجى إدخال رابط صحيح`,
      phone: `يرجى إدخال رقم هاتف صحيح`,
      passwordMatch: `كلمات المرور غير متطابقة`,
      strongPassword: `يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، وحرف كبير، وحرف صغير، ورقم، وحرف خاص`,
      integer: `يجب أن يكون ${fieldName} رقمًا صحيحًا`,
      decimal: `يجب أن يكون ${fieldName} رقمًا`,
      range: `يجب أن يكون ${fieldName} ضمن النطاق المحدد`,
      onlyLetters: `يجب أن يحتوي ${fieldName} على أحرف فقط`,
      onlyNumbers: `يجب أن يحتوي ${fieldName} على أرقام فقط`,
      lettersAndNumbers: `يجب أن يحتوي ${fieldName} على أحرف وأرقام`
    },
    en: {
      required: `${fieldName} is required`,
      email: `Please enter a valid email`,
      minLength: `${fieldName} must have at least the minimum number of characters`,
      maxLength: `${fieldName} must not exceed the maximum number of characters`,
      url: `Please enter a valid URL`,
      phone: `Please enter a valid phone number`,
      passwordMatch: `Passwords do not match`,
      strongPassword: `Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character`,
      integer: `${fieldName} must be an integer`,
      decimal: `${fieldName} must be a number`,
      range: `${fieldName} must be within the specified range`,
      onlyLetters: `${fieldName} must contain only letters`,
      onlyNumbers: `${fieldName} must contain only numbers`,
      lettersAndNumbers: `${fieldName} must contain both letters and numbers`
    }
  };

  // استخدام اللغة العربية كافتراضي
  return errorMessages.ar[validationType] || `خطأ في حقل ${fieldName}`;
};