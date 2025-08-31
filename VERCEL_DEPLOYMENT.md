# دليل النشر على Vercel

هذا الدليل يشرح خطوات نشر مشروع Ai Creative على منصة Vercel.

## الخطوات

### 1. التحضير للنشر

1. تأكد من أن لديك حساب على [Vercel](https://vercel.com)
2. تأكد من أن المشروع موجود على GitHub

### 2. النشر من خلال واجهة Vercel

1. قم بتسجيل الدخول إلى حسابك على Vercel
2. انقر على زر "New Project" في لوحة التحكم
3. اختر مستودع المشروع من قائمة المستودعات المتاحة
4. اضبط الإعدادات التالية:
   - **Project Name**: creative
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: npm run build
   - **Output Directory**: .next
5. في قسم "Environment Variables"، أضف المتغيرات البيئية التالية:
   ```
   JWT_SECRET=creative-production-jwt-secret-key-2024
   NEXT_PUBLIC_APP_NAME=Ai Creative
   NEXT_PUBLIC_APP_URL=https://creative-dttddsgjj-hossin-jomms-projects.vercel.app
   NEXT_PUBLIC_WHATSAPP_NUMBER=+963000000000
   NEXT_PUBLIC_WHATSAPP_MESSAGE=مرحباً، أريد الاستفسار عن خدماتكم
   API_BASE_URL=https://creative-dttddsgjj-hossin-jomms-projects.vercel.app/api
   ```
6. انقر على زر "Deploy" للبدء في عملية النشر

### 3. النشر باستخدام Vercel CLI

1. قم بتثبيت Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. قم بتسجيل الدخول إلى حسابك على Vercel:
   ```bash
   vercel login
   ```

3. انتقل إلى مجلد المشروع وقم بتنفيذ الأمر التالي للنشر:
   ```bash
   vercel
   ```

4. اتبع التعليمات التي تظهر في سطر الأوامر لإكمال عملية النشر

### 4. تحديث النشر

بعد إجراء تغييرات على المشروع، يمكنك تحديث النشر باستخدام أحد الطرق التالية:

- **من خلال GitHub**: قم بدفع التغييرات إلى مستودع GitHub، وسيقوم Vercel تلقائيًا بإعادة بناء ونشر المشروع
- **باستخدام Vercel CLI**: قم بتنفيذ الأمر التالي في مجلد المشروع:
  ```bash
  vercel --prod
  ```

## الوصول إلى الموقع

بعد اكتمال عملية النشر، سيكون الموقع متاحًا على الرابط:
[https://creative-dttddsgjj-hossin-jomms-projects.vercel.app](https://creative-dttddsgjj-hossin-jomms-projects.vercel.app)

## استكشاف الأخطاء وإصلاحها

- إذا واجهت مشكلة في النشر، تحقق من سجلات البناء في لوحة تحكم Vercel
- تأكد من أن جميع المتغيرات البيئية المطلوبة قد تم تعيينها بشكل صحيح
- تحقق من أن ملف `vercel.json` موجود ومكون بشكل صحيح
- إذا كانت هناك مشكلة في البناء، جرب بناء المشروع محليًا باستخدام `npm run build` للتحقق من عدم وجود أخطاء