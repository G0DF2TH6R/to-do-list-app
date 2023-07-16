/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '400px'
      },
      colors: {
        'c_blue':'#77BA99',
        'ut_orange':'#FB8B24',
        'crimson':'#D7263D',
        's_black':'#090C02',
        'v_blue':'#80A1D4'
      },
    }
  },
  plugins: [],
}
