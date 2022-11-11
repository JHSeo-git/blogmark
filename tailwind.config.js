/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      screens: {
        'hover-hover': { raw: '(hover: hover)' },
      },
      keyframes: {
        circle: {
          '0%': {
            'stroke-dasharray': '1, 200',
            'stroke-dashoffset': '0',
          },
          '50%': {
            'stroke-dasharray': '100, 200',
            'stroke-dashoffset': '-15px',
          },
          '100%': {
            'stroke-dasharray': '100, 200',
            'stroke-dashoffset': '-125px',
          },
        },
      },
      animation: {
        'spin-loading': 'spin 1.4s linear 0s infinite normal none running',
        'circle-loading': 'circle 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['winter', 'dracula'],
    darkTheme: 'dracula',
  },
};
