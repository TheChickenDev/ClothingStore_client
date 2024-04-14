import plugin from 'tailwindcss/plugin'
/** @type {import('tailwindcss').Config} */

export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}']
export const theme = {
  extend: {
    colors: {
      'green-primary': '#57b846',
      'green-bold': '#008080',
      main: '#f53d2d',
      'yellow-primary': '#ffcc00',
      'gray-primary': '#f1f1f1',
      'gray-border': '#eaeaef',
      'black-primary': '#1d1e23',
      'black-layer': '#03041c',
      'pink-primary': '#f50963',
      'purple-primary': '#6364db'
    }
  }
}
export const plugins = [
  plugin(function ({ addComponents }) {
    addComponents({})
  })
]
