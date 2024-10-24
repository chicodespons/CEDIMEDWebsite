import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/[locale]/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vubBlue: "#003399",
        uzGreen: "#BCBE00",
        grayBack: "#F3F3F3",
        uzGray: "#5F604A",
        vubOrange: "#ff6600"
      },
      fontFamily: {
        sans: ["Roboto", "Arial", "Helvetica", "sans-serif"]
      }
    },
  },
  plugins: [],
};
export default config;
