import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#24A1EB",
        warning: "#F9BB12",
        white: "#FFFFFF",
        blue: "#24A1EB",
        yellow: "#F9BB12",
        green: "#00A19A",
        darkblue: "#1A182D",
        gradient:
          "linear-gradient(90deg, #F9BB12 0%, #00A19A 50%, #12A1C3 100%)",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
