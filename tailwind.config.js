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
      'black-layer': '#00000080',
      'pink-primary': '#f50963',
      'purple-primary': '#6364db',
      'purple-layer': '#03041c8f'
    },
    backgroundImage: {
      'about-carousel': "url('/src/assets/images/about/carousel.jpg')",
      'contact-carousel': "url('/src/assets/images/contact/background.png')"
    },
    fontFamily: {
      heading: ['Space Grotesk', 'sans-serif'],
      'heading-2': ['Syne', 'sans-serif']
    },
    animation: {
      'ping-slow': 'ping 2s linear infinite',
      'ping-slow-delay': 'ping 2s 0.7s linear infinite'
    }
  }
}
export const plugins = [
  plugin(function ({ addComponents }) {
    addComponents({})
  })
]
