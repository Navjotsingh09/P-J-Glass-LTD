/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'placehold.co'],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
