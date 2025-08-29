export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f9f6f3",
          100: "#f1ece5", 
          200: "#e2d5c3",
          300: "#d2ba9c",
          400: "#c19e74",
          500: "#b38456",
          600: "#a0764d",
          700: "#856141",
          800: "#6b4e38",
          900: "#5a4230",
          950: "#2d2116",
        },
        secondary: {
          50: "#effcf6",
          100: "#daface",
          200: "#b6f2b0",
          300: "#83e487",
          400: "#4dcf5c",
          500: "#2ab143",
          600: "#1d9235",
          700: "#1a742d",
          800: "#195c28",
          900: "#174c25",
        },
        accent: {
          blue: "#3b82f6",
          orange: "#f97316",
          green: "#10b981",
        },
        dark: {
          100: "#d5d5d5",
          200: "#ababab",
          300: "#818181",
          400: "#575757",
          500: "#2d2d2d",
          600: "#242424",
          700: "#1b1b1b",
          800: "#121212",
          900: "#090909",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};