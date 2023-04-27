/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        showup: "showup 0.76s ease-in-out"
      }, 
      keyframes: {
        showup: {
          '0%': { 
            opacity: 0,
            transform: 'scale(0.4)',
          },
          '50%': {
            opacity: 0.76
          },
          '100%': { 
            transform: 'scale(1)' ,
            opacity: 1,
          },
        }
      }
    },
  },
  plugins: [],
}

