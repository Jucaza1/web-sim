/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: '#003594',
        gray: '#ededed0',
        orange: '#FF5B41',
      },
    },
  },
  plugins: [],
}

