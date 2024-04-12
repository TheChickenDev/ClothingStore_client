import plugin from 'tailwindcss/plugin'
/** @type {import('tailwindcss').Config} */

export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}']
export const theme = {
  extend: {
    colors: {
      greenPrimary: '#57b846',
      greenBold: '#008080',
      main: '#f53d2d',
      yellowPrimary: '#ffcc00',
      grayLayer: 'rgba(0, 0, 0, 0.3)',
      grayPrimary: '#f1f1f1',
      grayBorder: '#eaeaef',
      blackPrimary: '#1d1e23',
      pinkPrimary: '#f50963'
    }
  }
}
export const plugins = [
  plugin(function ({ addComponents }) {
    addComponents({})
  })
]
