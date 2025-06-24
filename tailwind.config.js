/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#2C2C2C', // Deep charcoal - gray-800
        'secondary': '#8B7355', // Warm taupe - stone-600
        'accent': '#D4A574', // Muted gold - amber-300
        
        // Background Colors
        'background': '#FEFEFE', // Pure white with warmth - white
        'surface': '#F8F8F8', // Soft off-white - gray-50
        
        // Text Colors
        'text-primary': '#1A1A1A', // Rich black with warmth - gray-900
        'text-secondary': '#6B6B6B', // Medium gray - gray-500
        
        // Status Colors
        'success': '#4A7C59', // Forest green - green-700
        'warning': '#B8860B', // Deep amber - yellow-600
        'error': '#A0522D', // Muted terracotta - orange-700
        
        // Border Color
        'border': 'rgba(44, 44, 44, 0.08)', // Subtle border - gray-200
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans 3', 'sans-serif'],
        'caption': ['Inter', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        'heading-normal': '400',
        'heading-medium': '500',
        'heading-semibold': '600',
        'body-normal': '400',
        'body-medium': '500',
        'caption-normal': '400',
        'data-normal': '400',
      },
      boxShadow: {
        'elevation-1': '0 2px 8px rgba(44, 44, 44, 0.08)',
        'elevation-2': '0 4px 16px rgba(44, 44, 44, 0.12)',
        'elevation-3': '0 8px 32px rgba(44, 44, 44, 0.16)',
      },
      borderRadius: {
        'sm': '8px',
        'lg': '16px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms',
      },
      animation: {
        'scale-hover': 'scale 200ms ease-out',
        'fade-in': 'fadeIn 200ms ease-out',
        'pulse-gentle': 'pulseGentle 2s ease-in-out infinite',
      },
      keyframes: {
        scale: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.02)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        'navigation': '1000',
        'dropdown': '1050',
        'modal': '1100',
      },
    },
  },
  plugins: [],
}