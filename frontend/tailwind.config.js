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
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#333',
            a: {
              color: '#24A1EB',
              '&:hover': {
                color: '#00A19A',
              },
            },
            'h1, h2, h3, h4': {
              color: '#1A182D',
              fontWeight: '600',
            },
            code: {
              color: '#00A19A',
              backgroundColor: '#f0f0f0',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: 0,
            },
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui(), require('@tailwindcss/typography')],
};
