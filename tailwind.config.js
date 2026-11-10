const headingTypography = Object.fromEntries(
  ["h1", "h2", "h3", "h4", "h5", "h6"].map((heading) => [heading, { lineHeight: "1" }]),
);

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
      colors: {
        "brand-primary": "rgb(var(--color-brand-primary-rgb) / <alpha-value>)",
        "surface-muted": "var(--color-surface-muted)",
      },
      borderColor: {
        "brand-primary": "rgb(var(--color-brand-primary-rgb) / <alpha-value>)",
      },
      fontSize: {
        h1: ["var(--type-h1)", { lineHeight: "1" }],
        h2: ["var(--type-h2)", { lineHeight: "1" }],
        h3: ["var(--type-h3)", { lineHeight: "1" }],
        h4: ["var(--type-h4)", { lineHeight: "1" }],
        h5: ["var(--type-h5)", { lineHeight: "1" }],
        h6: ["var(--type-h6)", { lineHeight: "1" }],
        h7: ["var(--type-h7)", { lineHeight: "1" }],
        md: ["var(--type-medium)", { lineHeight: "1.5" }],
        lg: ["var(--type-large)", { lineHeight: "1.5" }],
        medium: ["var(--type-medium)", { lineHeight: "1.5" }],
        large: ["var(--type-large)", { lineHeight: "1.5" }],
        regular: ["1rem", { lineHeight: "1.5" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        tiny: ["0.75rem", { lineHeight: "1.5" }],
        "10xl": ["clamp(2.75rem, 1.833333rem + 4.583333vw, 5.5rem)", { lineHeight: "1" }],
        handwriting: ["1.75rem", { lineHeight: "2.25rem" }],
      },
      lineHeight: {
        display: "1",
      },
      maxWidth: {
        "archive-search": "25rem",
        "archive-search-compact": "21rem",
      },
      // Relume's prose preset owns article heading styles; use the same leading.
      typography: {
        DEFAULT: { css: headingTypography },
        md: { css: headingTypography },
        lg: { css: headingTypography },
      },
      fontFamily: {
        mono: ['"Roboto Mono"', 'monospace'],
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
