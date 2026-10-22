/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0C1116',
          soft: '#1A222B',
        },
        electric: {
          DEFAULT: '#1B4DFF',
          deep: '#0F2FA8',
        },
        skywash: '#7CC0EF',
        pale: {
          DEFAULT: '#E7EDF5',
          deep: '#D3DDEA',
        },
        navynight: '#0A2A5E',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
