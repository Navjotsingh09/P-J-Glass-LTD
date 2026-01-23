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
        // P&J Glass Brand Colors
        primary: {
          DEFAULT: '#1E88E5',
          dark: '#1565C0',
          light: '#42A5F5',
        },
        secondary: {
          DEFAULT: '#00ACC1',
          dark: '#00838F',
          light: '#26C6DA',
        },
        neutral: {
          dark: '#263238',
          grey: '#546E7A',
          light: '#ECEFF1',
          white: '#FFFFFF',
        },
        success: '#43A047',
        warning: '#FB8C00',
        error: '#E53935',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'h1': 'clamp(2rem, 5vw, 3rem)',
        'h2': 'clamp(1.75rem, 4vw, 2.25rem)',
        'h3': 'clamp(1.5rem, 3vw, 1.75rem)',
      },
      spacing: {
        'section': 'clamp(4rem, 8vw, 6rem)',
      },
      borderRadius: {
        'card': '0.5rem',
      },
      boxShadow: {
        'card': '0 2px 4px rgba(0,0,0,0.1)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.15)',
        'button': '0 2px 8px rgba(67, 160, 71, 0.3)',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '300ms',
        'slow': '500ms',
      },
    },
  },
  plugins: [],
}
