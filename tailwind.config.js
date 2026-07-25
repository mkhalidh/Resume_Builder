/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#FAFAF7",
        ink: "#16181D",
        jade: {
          DEFAULT: "#0F9D6B",
          50: "#EAF6F0",
        },
        coral: "#FF6B4A",
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
