/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f2fa',
          100: '#cce5f5',
          200: '#99cceb',
          300: '#66b2e0',
          400: '#3399d6',
          500: '#0078d4',
          600: '#106ebe',
          700: '#0d5a9e',
          800: '#0a477e',
          900: '#07355e',
        },
        accent: {
          DEFAULT: '#ff6b35',
          light: '#ff8c5a',
          dark: '#e85a28',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 8px 30px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 40px rgba(0, 120, 212, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
