import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import { CartProvider } from '../lib/cart-context';
import { structuredData } from '../lib/seo-metadata';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export const metadata = {
  metadataBase: new URL('https://pj-glass.co.uk'),
  title: {
    default: 'P&J Glass | Premium Glazing Specialists',
    template: '%s | P&J Glass',
  },
  description: 'P&J Glass LTD — your trusted glass design and cutting specialist in England. Premium balustrades, kitchen splashbacks, shower screens, mirrors, and custom glass installations across London & Essex.',
  keywords: ['glass balustrades', 'kitchen splashbacks', 'shower screens', 'glass mirrors', 'bespoke glass', 'architectural glazing', 'Romford glass', 'Essex glass', 'London glass services'],
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
    type: 'website',
    locale: 'en_GB',
    url: 'https://pjglass.co.uk',
    siteName: 'P&J Glass',
    title: 'P&J Glass | Premium Glazing Specialists',
    description: 'We design and install bespoke glass systems for ambitious architectural projects.',
    images: [
      {
        url: '/images/hero-balustrade.jpg',
        width: 1200,
        height: 630,
        alt: 'P&J Glass - Premium Glazing Specialists',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'P&J Glass | Premium Glazing Specialists',
    description: 'We design and install bespoke glass systems for ambitious architectural projects.',
    images: ['/images/hero-balustrade.jpg'],
  },
  alternates: {
    canonical: 'https://pj-glass.co.uk',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} bg-white`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.className} bg-white text-brand-navy`}>
        <CartProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-brand-accent focus:text-brand-navy focus:px-4 focus:py-2 focus:text-sm focus:font-medium">
            Skip to content
          </a>
          <Header />
          <CartDrawer />
          <main id="main-content">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
