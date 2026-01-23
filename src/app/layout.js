import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  metadataBase: new URL('https://pjglass.co.uk'),
  title: {
    default: 'P&J Glass | Premium Glass Solutions in Romford & Essex',
    template: '%s | P&J Glass',
  },
  description: 'Transform your space with P&J Glass. Expert glass balustrades, kitchen splashbacks, shower screens, and mirrors. Professional installation across London & Essex. Free quotes. Call 01708 123 456.',
  keywords: ['glass balustrades', 'kitchen splashbacks', 'shower screens', 'glass mirrors', 'bespoke glass', 'Romford glass', 'Essex glass', 'London glass services', 'glass installation', 'frameless glass'],
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
    title: 'P&J Glass | Premium Glass Solutions in Romford & Essex',
    description: 'Transform your space with expert glass solutions. Balustrades, splashbacks, shower screens, and more. Professional installation across London & Essex.',
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
    title: 'P&J Glass | Premium Glass Solutions',
    description: 'Transform your space with expert glass solutions. Balustrades, splashbacks, shower screens & mirrors.',
    images: ['/images/hero-balustrade.jpg'],
  },
  alternates: {
    canonical: 'https://pjglass.co.uk',
  },
  category: 'home improvement',
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
