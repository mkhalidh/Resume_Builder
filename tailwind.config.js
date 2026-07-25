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
  // Tailwind's default color utilities emit `rgb(r g b / var(--tw-text-opacity))`
  // so the separate `text-opacity-*` utilities can compose with them. html2canvas
  // (used for PDF export) can't resolve that CSS variable indirection and renders
  // garbled colors as a result. Disabling these core plugins makes every color
  // utility compile to a plain, fully-resolved color instead — the app doesn't
  // use the separate opacity utilities anywhere, so this has no visual effect
  // on screen, only on export.
  corePlugins: {
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    ringOpacity: false,
    placeholderOpacity: false,
  },
  plugins: [],
};
