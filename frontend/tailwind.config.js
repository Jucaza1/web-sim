// frontend/tailwind.config.js
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "var(--color-navy)",
        gray: "var(--color-gray)",
        orange: "var(--color-orange)",
        white: "var(--color-white)",
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
      },
      
    },
  },
  plugins: [],
};
