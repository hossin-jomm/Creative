/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'images.unsplash.com', 'mir-s3-cdn-cf.behance.net', 'sample-videos.com'],
  },
  skipTrailingSlashRedirect: true,
  experimental: {
    // أي خيارات تجريبية أخرى يمكن إضافتها هنا
  },
}

module.exports = nextConfig