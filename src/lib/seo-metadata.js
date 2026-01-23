export const metadata = {
  title: 'P&J Glass - Premium Glass Products & Services | Romford, Essex',
  description: 'Transform your space with P&J Glass. Expert glass balustrades, kitchen splashbacks, shower screens, and mirrors. Professional installation across London & Essex. Free quotes available.',
  keywords: ['glass balustrades', 'kitchen splashbacks', 'shower screens', 'glass mirrors', 'bespoke glass', 'Romford glass', 'Essex glass', 'London glass services'],
  authors: [{ name: 'P&J Glass' }],
  creator: 'P&J Glass',
  publisher: 'P&J Glass',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'P&J Glass - Premium Glass Products & Services',
    description: 'Transform your space with expert glass solutions. Balustrades, splashbacks, shower screens, and more.',
    url: 'https://pjglass.co.uk',
    siteName: 'P&J Glass',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/images/hero-balustrade.jpg',
        width: 1200,
        height: 630,
        alt: 'P&J Glass - Premium Glass Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'P&J Glass - Premium Glass Products & Services',
    description: 'Transform your space with expert glass solutions.',
    images: ['/images/hero-balustrade.jpg'],
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
  alternates: {
    canonical: 'https://pjglass.co.uk',
  },
  category: 'home improvement',
};

// Structured Data for SEO
export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'P&J Glass',
  image: '/images/logo.svg',
  '@id': 'https://pjglass.co.uk',
  url: 'https://pjglass.co.uk',
  telephone: '+44-1708-123456',
  priceRange: '££',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Unit 5, Romford Industrial Estate',
    addressLocality: 'Romford',
    addressRegion: 'Essex',
    postalCode: 'RM1 2XX',
    addressCountry: 'GB',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.5779,
    longitude: 0.1821,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '16:00',
    },
  ],
  sameAs: [
    'https://www.facebook.com/pjglass',
    'https://www.instagram.com/pjglass',
    'https://twitter.com/pjglass',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Romford',
    },
    {
      '@type': 'City',
      name: 'London',
    },
    {
      '@type': 'State',
      name: 'Essex',
    },
  ],
};
