/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
  ],
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
        // Tooltip
        'slide-up-fade': {
          '0%': { opacity: 0, transform: 'translateY(2px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-right-fade': {
          '0%': { opacity: 0, transform: 'translateX(-2px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        'slide-down-fade': {
          '0%': { opacity: 0, transform: 'translateY(-2px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-left-fade': {
          '0%': { opacity: 0, transform: 'translateX(2px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      },
      animation: {
        'spin-loading': 'spin 1.4s linear 0s infinite normal none running',
        'circle-loading': 'circle 1.4s ease-in-out infinite',
        // Tooltip
        'slide-up-fade': 'slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right-fade': 'slide-right-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down-fade': 'slide-down-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left-fade': 'slide-left-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('daisyui'), require('tailwindcss-radix')],
  daisyui: {
    themes: ['winter', 'dracula'],
    darkTheme: 'dracula',
  },
};
