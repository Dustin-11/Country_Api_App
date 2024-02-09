/* eslint-disable */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: 'hsl(0, 0%, 100%)',
        lightGray: 'hsl(0, 0%, 98%)', // Light Mode Background
        darkGray: 'hsl(0, 0%, 52%)', // Light Mode Input
        darkBlue: 'hsl(200, 15%, 8%)', // Light Mode Text
        veryBlue: 'hsl(207, 26%, 17%)', // Dark Mode Background
        blue: 'hsl(209, 23%, 22%)', // Dark Mode Elements
        white: 'hsl(0, 0%, 100%)', // Dark Mode Text & Light Mode Elements
      },
      fontFamily: {
        custom: ['Nunito Sans', 'sans-serif'],
      },
      fontWeight: {
        customweight: 300,
      },
    },
  },
  plugins: [],
}

