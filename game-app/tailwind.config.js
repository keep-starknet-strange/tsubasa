/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: [
    "h-card-xs",
    "h-card-sm",
    "h-card-md",
    "h-card-lg",
    "h-card-xl",
    "w-card-xs",
    "w-card-sm",
    "w-card-md",
    "w-card-lg",
    "w-card-xl",
  ],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        "card-xl": "320px",
        "card-lg": "240px",
        "card-md": "160px",
        "card-sm": "120px",
        "card-xs": "80px",
      },
      width: {
        "card-xl": "224px",
        "card-lg": "168px",
        "card-md": "112px",
        "card-sm": "84px",
        "card-xs": "56px",
      },
      animation: {
        scoreboard: "scoreboard 1s linear forwards",
      },
      boxShadow: {
        md: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        "new-airport": ["var(--font-new-airport)"],
        agrandir: ["var(--font-agrandir)"],
        "erica-one": ["var(--font-erica-one)"],
      },
      keyframes: {
        scoreboard: {
          "0%": { transform: "translateX(calc(100% + 1.5rem))" },
          "90%": { transform: "translateX(calc(-100% - 1.5rem))" },
          "100%": { transform: "translateX(calc(-100% - 1.5rem))" },
        },
      },
    },
    colors: {
      lightBlue: "#B6DAFB",
      red: "#E24A4A",
      black: "#222222",
      white: "#FFFFFF",
      greenBlack: "#0A2F12",
      neon: "#78FF97",
      green: {
        200: "#A3FFB7",
        300: "#97E8A9",
        400: "#8ADD9D",
        500: "#80D794",
        600: "#71CD87",
        700: "#61B174",
        800: "#1D6D2F",
      },
      cyan: {
        200: "#04F0DB",
        300: "#04DCC8",
        600: "#07856D",
        700: "#06745F",
      },
      yellow: {
        200: "#FEDD67",
        300: "#FDC601",
        600: "#837B0A",
        700: "#726B09",
      },
      salmon: {
        200: "#FCBEB5",
        300: "#FA9284",
        600: "#82614B",
        700: "#644B3A",
      },
    },
  },
  plugins: [],
};
