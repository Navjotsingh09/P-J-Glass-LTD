/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'placehold.co', 'placeholder.io', 'cdn.shopify.com', 'www.crlaurence.co.uk', 'www.egw.co.uk', 'www.pilkington.com'],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Old WordPress pages → new site pages (301 permanent)
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/about-us/', destination: '/about', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/contact-us/', destination: '/contact', permanent: true },
      { source: '/shop', destination: '/products', permanent: true },
      { source: '/shop/', destination: '/products', permanent: true },
      { source: '/shop/:path*', destination: '/products', permanent: true },
      { source: '/gallery', destination: '/portfolio', permanent: true },
      { source: '/gallery/', destination: '/portfolio', permanent: true },
      { source: '/our-work', destination: '/portfolio', permanent: true },
      { source: '/our-work/', destination: '/portfolio', permanent: true },
      { source: '/portfolio/', destination: '/portfolio', permanent: true },
      { source: '/our-projects', destination: '/portfolio', permanent: true },
      { source: '/our-projects/', destination: '/portfolio', permanent: true },
      // WordPress service pages
      { source: '/services/', destination: '/products', permanent: true },
      { source: '/services/glass-balustrades', destination: '/services/balustrades', permanent: true },
      { source: '/services/glass-balustrades/', destination: '/services/balustrades', permanent: true },
      { source: '/services/glass-splashbacks', destination: '/services/splashbacks', permanent: true },
      { source: '/services/glass-splashbacks/', destination: '/services/splashbacks', permanent: true },
      { source: '/services/glass-mirrors', destination: '/services/mirrors', permanent: true },
      { source: '/services/glass-mirrors/', destination: '/services/mirrors', permanent: true },
      { source: '/services/shower-screens', destination: '/showers', permanent: true },
      { source: '/services/shower-screens/', destination: '/showers', permanent: true },
      { source: '/services/shower-glass', destination: '/showers', permanent: true },
      { source: '/services/shower-enclosures', destination: '/showers', permanent: true },
      // WordPress common paths
      { source: '/home', destination: '/', permanent: true },
      { source: '/home/', destination: '/', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/index.php', destination: '/', permanent: true },
      { source: '/faq', destination: '/faqs', permanent: true },
      { source: '/faq/', destination: '/faqs', permanent: true },
      { source: '/frequently-asked-questions', destination: '/faqs', permanent: true },
      { source: '/trade-account', destination: '/trade', permanent: true },
      { source: '/trade-account/', destination: '/trade', permanent: true },
      { source: '/trade-accounts', destination: '/trade', permanent: true },
      { source: '/glass-calculator', destination: '/glass-calculator', permanent: false },
      // WordPress blog/feed remnants
      { source: '/feed', destination: '/', permanent: true },
      { source: '/feed/', destination: '/', permanent: true },
      { source: '/blog', destination: '/', permanent: true },
      { source: '/blog/', destination: '/', permanent: true },
      { source: '/blog/:path*', destination: '/', permanent: true },
      // WordPress admin/login (block crawling, redirect to home)
      { source: '/wp-admin', destination: '/', permanent: true },
      { source: '/wp-admin/:path*', destination: '/', permanent: true },
      { source: '/wp-login.php', destination: '/', permanent: true },
      { source: '/wp-content/:path*', destination: '/', permanent: true },
      { source: '/wp-includes/:path*', destination: '/', permanent: true },
      { source: '/xmlrpc.php', destination: '/', permanent: true },
      // WordPress category/tag URLs
      { source: '/category/:path*', destination: '/products', permanent: true },
      { source: '/tag/:path*', destination: '/products', permanent: true },
      { source: '/product/:path*', destination: '/products', permanent: true },
      { source: '/product-category/:path*', destination: '/products', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
}

module.exports = nextConfig
