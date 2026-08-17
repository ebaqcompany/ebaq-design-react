/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("@relume_io/relume-tailwind")],
  theme: {
    extend: {
      fontSize: {
        "10xl": ["5.5rem", { lineHeight: "1" }],
        handwriting: ["1.75rem", { lineHeight: "2.25rem" }],
      },
      lineHeight: {
        display: "0.9",
      },
      maxWidth: {
        "archive-search": "25rem",
        "archive-search-compact": "21rem",
      },
      fontFamily: {
        sans: ['"Roboto"', 'sans-serif'],
        heading: ['"Roboto Condensed"', 'sans-serif'],
        handwriting: ['"Caveat"', 'sans-serif'],
      },
      letterSpacing: {
        handwriting: "-0.03em",
      },
      animation: {
        "marquee-top": "marquee-top 30s linear infinite",
        "marquee-bottom": "marquee-bottom 30s linear infinite",
      },
      keyframes: {
        "marquee-top": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-bottom": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
