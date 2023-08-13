/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        scoreboard: "scoreboard 1s linear forwards 100ms",
      },
      boxShadow: {
        md: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        "new-airport": ["var(--font-new-airport)"],
      },
      keyframes: {
        scoreboard: {
          "90%": { transform: "translateX(calc(-100% - 1.5rem))" },
          "100%": { transform: "translateX(calc(-100% - 1.5rem))" },
        },
      },
    },
  },
  plugins: [],
};
