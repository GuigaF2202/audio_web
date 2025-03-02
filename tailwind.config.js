/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  safelist: [
    // Classes dinâmicas para as cores do roadmap pricing
    'bg-audio-yellow', 'bg-audio-yellow/10', 'bg-audio-yellow/20', 'bg-audio-yellow/50', 'bg-audio-yellow/70',
    'bg-audio-pink', 'bg-audio-pink/10', 'bg-audio-pink/20', 'bg-audio-pink/50', 'bg-audio-pink/70',
    'bg-audio-blue', 'bg-audio-blue/10', 'bg-audio-blue/20', 'bg-audio-blue/50', 'bg-audio-blue/70',
    'bg-audio-purple', 'bg-audio-purple/10', 'bg-audio-purple/20', 'bg-audio-purple/50', 'bg-audio-purple/70',
    'bg-audio-coral', 'bg-audio-coral/10', 'bg-audio-coral/20', 'bg-audio-coral/50', 'bg-audio-coral/70',
    'bg-audio-orange', 'bg-audio-orange/10', 'bg-audio-orange/20', 'bg-audio-orange/50', 'bg-audio-orange/70',
    'text-audio-yellow', 'text-audio-pink', 'text-audio-blue', 'text-audio-purple', 'text-audio-coral', 'text-audio-orange',
    'border-audio-yellow', 'border-audio-pink', 'border-audio-blue', 'border-audio-purple', 'border-audio-coral', 'border-audio-orange',
    'shadow-audio-yellow/10', 'shadow-audio-pink/10', 'shadow-audio-blue/10', 'shadow-audio-purple/10', 'shadow-audio-coral/10', 'shadow-audio-orange/10',
  ],
  theme: {
    extend: {
      colors: {
        'audio-blue': '#1E88E5',
        'audio-purple': '#8E24AA',
        'audio-pink': '#E91E63',
        'audio-coral': '#F44336',
        'audio-orange': '#FF7043',
        'audio-yellow': '#FFC107',
        'streama-pink': '#E91E63',
        'streama-pink-dark': '#C2185B',
        'streama-pink-light': '#F48FB1',
        'neon-pink': '#E91E63',
        'violet-purple': '#8E24AA',
        'electric-purple': '#8E24AA',
        'deep-purple': '#4B0082',
        'soft-black': '#1A1A1A',
        'streama-yellow': '#FFC107',
        'primary': '#E91E63',
        'primary-dark': '#C2185B',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'streama-gradient': 'linear-gradient(135deg, #1E88E5 0%, #8E24AA 30%, #E91E63 50%, #F44336 70%, #FF7043 85%, #FFC107 100%)',
        'streama-gradient-short': 'linear-gradient(135deg, #8E24AA 0%, #E91E63 50%, #FF7043 100%)',
        'streama-waves': "url('/src/assets/wave-bg.svg')",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fadeIn': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }
    },
  },
  plugins: [],
} 