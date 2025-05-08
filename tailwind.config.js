/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./tools/**/*.html",
    "./assets/js/**/*.js",
    "./templates/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#7AAEDC',
        accentRed: '#F27781',
        textMain: '#222',
        textDesc: '#757575',
        bgMain: '#FAFAFA',
      },
      fontFamily: {
        mamelon: ['"Mamelon"', 'sans-serif'],
        rounded: ['"Rounded M+ 1c"', 'sans-serif'],
        noto: ['"Noto Sans JP"', 'sans-serif'],
        sans: ['"Mamelon"', '"Rounded M+ 1c"', '"Noto Sans JP"', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}