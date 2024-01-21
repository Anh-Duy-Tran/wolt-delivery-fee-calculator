/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'wolt-grey': '#E7E7E7',
        'wolt-blue': '#039DE0',
        primary: '#03C3EC',
        secondary: '#017AD5',
      },
      boxShadow: {
        'border-like': '0 0px 0px 1.5px #039DE0',
      },
    },
    screens: {
      tablet: '1024px',
    },
  },
  plugins: [],
};
