/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rose-glow': '#ff4d8d',
        'rose-soft': '#ff85b3',
        'lavender': '#d946ef',
        'blush': '#f472b6',
        'peach': '#f9a8d4',
        'deep': '#0f0f0f',
        'midnight': '#141414',
        'charcoal': '#1c1c1c',
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'vibes': ['"Great Vibes"', 'cursive'],
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'rose-gradient': 'linear-gradient(135deg, #ff4d8d, #d946ef)',
        'dreamy-gradient': 'linear-gradient(180deg, #0f0f0f 0%, #1a0a12 50%, #0f0f0f 100%)',
        'aurora': 'linear-gradient(45deg, #ff4d8d22, #d946ef22, #f472b622)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'drift': 'drift 8s linear infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'heart-beat': 'heartBeat 1.3s ease-in-out infinite',
        'aurora-shift': 'auroraShift 8s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px #ff4d8d44' },
          '50%': { boxShadow: '0 0 60px #ff4d8daa, 0 0 100px #ff4d8d44' },
        },
        sparkle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.3, transform: 'scale(0.5)' },
        },
        drift: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { transform: 'translateY(-100vh) rotate(360deg)', opacity: 0 },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(40px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        heartBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.3)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.3)' },
          '70%': { transform: 'scale(1)' },
        },
        auroraShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        twinkle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.2, transform: 'scale(0.8)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-rose': '0 0 30px #ff4d8d66, 0 0 60px #ff4d8d22',
        'glow-lavender': '0 0 30px #d946ef66, 0 0 60px #d946ef22',
        'glow-soft': '0 0 20px #f472b644',
        'inner-glow': 'inset 0 0 30px #ff4d8d22',
      },
    },
  },
  plugins: [],
}
