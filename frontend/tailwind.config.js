// frontend/tailwind.config.js
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#003594",
        gray: "#ededed",
        orange: "#FF5B41",
        white: "#ffffff",
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
      },
    },
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [],
};
