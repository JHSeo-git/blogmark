/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        'hover-hover': { raw: '(hover: hover)' },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['winter', 'dracula'],
    darkTheme: 'dracula',
  },
};
