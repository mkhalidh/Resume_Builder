/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#FAFAF7",
        ink: "#16181D",
        jade: {
          DEFAULT: "#14B8A6",
          50: "#E6FBF8",
          100: "#CCF3EC",
          600: "#0D9488",
        },
        coral: "#FF6B4A",
        violet: "#8B5CF6",
        gold: "#FBBF24",
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
