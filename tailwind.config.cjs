/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        main: "#FAFAFA",
        secondary: "#EFEFEF",
        third: "#DFDFDF",
        white: "#FFFFFF",
        black: "#000000",

        darkToggle: "linear gradient hsl(210, 78%, 56%) to hsl(146, 68%, 55%)",
        darkToggle1: "hsl(210, 78%, 56%)",
        darkToggle2: "hsl(146, 68%, 55%)",
        lightToggle: "hsl(230, 22%, 74%)",

        darkGrayishBlue: "hsl(232, 13%, 33%)",

        darkThemeBG: "hsl(230, 17%, 14%)", // BG
        darkThemePattern: "hsl(232, 19%, 15%)", // (Top BG Pattern)
        DarkDesaturatedBlue: "hsl(228, 28%, 20%)", // (Card BG)
        DesaturatedBlue: "hsl(228, 34%, 66%)", // (Text)

        VeryPaleBlue: "hsl(225, 100%, 98%)", // (Top BG Pattern)
        LightGrayishBlue: "hsl(227, 47%, 96%)", // (Card BG)
        DarkGrayishBlue: "hsl(228, 12%, 44%)", // (Text)
        VeryDarkBlue: "hsl(230, 17%, 14%)", // (Text)
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        xs: "375px",
        sm: "480px",
        md: "756px",
        lg: "1000px",
        xl: "1440px",
        xxl: "1920px",
      },
    },
  },
  plugins: [],
};
