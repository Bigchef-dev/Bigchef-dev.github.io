/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00f0ff',
        'neon-orange': '#ff6b35',
        'neon-dark': '#0a0e27',
      },
      backgroundImage: {
        'gradient-cyan-orange': 'linear-gradient(135deg, #00f0ff 0%, #ff6b35 100%)',
        'gradient-orange-cyan': 'linear-gradient(135deg, #ff6b35 0%, #00f0ff 100%)',
      },
      boxShadow: {
        neon: '0 0 10px #00f0ff, inset 0 0 10px rgba(0, 240, 255, 0.2)',
        'neon-orange': '0 0 10px #ff6b35, inset 0 0 10px rgba(255, 107, 53, 0.2)',
        'neon-glow': '0 0 20px #00f0ff, 0 0 40px rgba(0, 240, 255, 0.5)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px #00f0ff' },
          '50%': { boxShadow: '0 0 20px #00f0ff, 0 0 40px rgba(0, 240, 255, 0.5)' },
        },
      },
    },
  },
}
