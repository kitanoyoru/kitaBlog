/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: "640px",
      md: "748px",
      lg: "1024px",
      xl: "1280px",
    },
    colors: {
      primary: "#0D1117", 
      secondary: "" // maybe violet
    },
    extend: {},
  },
  plugins: [],
}
