/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'images.unsplash.com', 'mir-s3-cdn-cf.behance.net', 'sample-videos.com'],
  },
  experimental: {
    skipTrailingSlashRedirect: true,
    // تجاوز التحقق من إصدار Node.js
    skipNodeVersionCheck: true,
  },
}

module.exports = nextConfig