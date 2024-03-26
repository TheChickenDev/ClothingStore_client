import plugin from 'tailwindcss/plugin'
/** @type {import('tailwindcss').Config} */

export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}']
export const theme = {
  extend: {
    colors: {
      greenPrimary: '#57b846',
      main: '#f53d2d',
      orangePrimary: '#f63',
      grayLayer: 'rgba(0, 0, 0, 0.3)',
      grayCustom: '#f9fafa'
    }
  }
}
export const plugins = [
  plugin(function ({ addComponents }) {
    addComponents({})
  })
]
