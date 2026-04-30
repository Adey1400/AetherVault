/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Custom color palette - Cyber Minimalist
      colors: {
        obsidian: {
          50: '#f8f7f7',
          100: '#f0eeee',
          200: '#dbd8d8',
          300: '#c7c1c1',
          400: '#9e9696',
          500: '#756f6f',
          600: '#6a6464',
          700: '#585252',
          800: '#464141',
          900: '#050505',
          950: '#000000',
        },
        cyan: {
          glow: '#00d4ff',
          bright: '#00f0ff',
          dim: '#00a8cc',
        },
        purple: {
          glow: '#b026ff',
          bright: '#d946ef',
          dim: '#7e22ce',
        },
      },
      // Glassmorphism backdrop
      backdropBlur: {
        xs: '2px',
      },
      // Custom shadows for glow effects
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 212, 255, 0.3), 0 0 40px rgba(0, 212, 255, 0.1)',
        'glow-cyan-sm': '0 0 10px rgba(0, 212, 255, 0.2)',
        'glow-purple': '0 0 20px rgba(176, 38, 255, 0.3), 0 0 40px rgba(176, 38, 255, 0.1)',
        'glow-purple-sm': '0 0 10px rgba(176, 38, 255, 0.2)',
        'inner-glow': 'inset 0 0 20px rgba(0, 212, 255, 0.1)',
      },
      // Border glow with gradients
      borderColor: {
        'glow-cyan': 'rgba(0, 212, 255, 0.3)',
        'glow-purple': 'rgba(176, 38, 255, 0.3)',
      },
      fontFamily: {
        mono: ['Fira Code', 'JetBrains Mono', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.05em' }],
        sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.02em' }],
        base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.01em' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow-flicker': 'glow-flicker 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-flicker': {
          '0%, 100%': { textShadow: '0 0 10px rgba(0, 212, 255, 0.5)' },
          '50%': { textShadow: '0 0 20px rgba(0, 212, 255, 0.8)' },
        },
      },
      transitionDuration: {
        250: '250ms',
        350: '350ms',
        400: '400ms',
      },
      // Premium rounded corners
      borderRadius: {
        xs: '0.25rem',
        sm: '0.375rem',
        base: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
      },
    },
  },
  plugins: [],
}
