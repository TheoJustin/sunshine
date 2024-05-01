/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'teal-custom' : '#2EC4B6',
        'cyan-custom' : '#CBF3F0',
        'orange-custom' : '#FF9F1C',
        'cream-custom' : '#FFBF69',
      },
      animation: {
        'slide-in-left': 'slideInLeft 2.5s forwards',
      },
      keyframes: {
        slideInLeft: {
          '0%': {
            opacity: 0,
            transform: 'translateX(-100%)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
      },
    },
  },
  plugins: [
    
  ],
}