/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: ".625rem",
      },
      colors: {
        bionic: {
          50: "#F1F7F4",
          100: "#DDEBE5",
          700: "#154733",
          900: "#092017",
          lime: "#A7D129",
        },
      },
      width: {
        "1/9": "11.11111111111111%",
        "2/9": "22.22222222222222%",
        "1/14": "7.142857142857143%",
        "1/7": "14.285714285714286%",
        "3/14": "21.428571428571427%",
        "2/7": "28.57142857142857%",
        "5/14": "35.714285714285715%",
        "3/7": "42.857142857142854%",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: { themes: false },
};
