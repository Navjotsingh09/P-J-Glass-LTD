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
  title: {
    default: 'P&J Glass | Custom Glass Solutions in Romford & London',
    template: '%s | P&J Glass',
  },
  description: 'Expert glass balustrades, kitchen splashbacks, shower screens & mirrors. Premium custom glass solutions in Romford and Greater London. 15+ years experience, 2500+ projects.',
  keywords: ['glass balustrades', 'kitchen splashbacks', 'shower screens', 'glass mirrors', 'Romford', 'Essex', 'London', 'custom glass'],
  authors: [{ name: 'P&J Glass' }],
  creator: 'P&J Glass',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://pjglass.co.uk',
    siteName: 'P&J Glass',
    title: 'P&J Glass | Custom Glass Solutions in Romford & London',
    description: 'Expert glass balustrades, kitchen splashbacks, shower screens & mirrors. Premium custom glass solutions.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'P&J Glass - Custom Glass Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'P&J Glass | Custom Glass Solutions',
    description: 'Expert glass balustrades, kitchen splashbacks, shower screens & mirrors.',
    images: ['/images/og-image.jpg'],
  },
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
  verification: {
    google: 'your-google-verification-code',
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
