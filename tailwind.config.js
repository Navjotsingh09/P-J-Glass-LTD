/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0a0a0a',
          dark: '#111111',
          charcoal: '#1a1a1a',
          grey: '#888888',
          light: '#cccccc',
          white: '#f5f5f5',
          accent: '#5ec4d4',
          navy: '#1a2055',
          blue: '#2d6db5',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.02em', fontWeight: '300' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '300' }],
        'display-md': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '300' }],
        'display-sm': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3', fontWeight: '400' }],
        'label': ['0.75rem', { lineHeight: '1', letterSpacing: '0.15em', fontWeight: '500' }],
      },
      spacing: {
        'section': 'clamp(5rem, 12vw, 10rem)',
      },
      transitionDuration: {
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'slide-in': 'slide-in 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}
