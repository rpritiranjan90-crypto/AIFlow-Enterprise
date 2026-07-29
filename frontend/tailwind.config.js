/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#080C14',
          'dark-surface': '#0F172A',
          'dark-card': 'rgba(15, 23, 42, 0.75)',
          light: '#F8FAFC',
          'light-surface': '#FFFFFF',
        },
        brand: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          cyan: '#06B6D4',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(99, 102, 241, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px -5px rgba(99, 102, 241, 0.4)',
        'glow-cyan': '0 0 20px -5px rgba(6, 182, 212, 0.4)',
        card: '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};
