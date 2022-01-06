module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: "class", // false, 'media' or 'class'
  blur: "class",
  theme: {
    maxHeight: {
      xxs: '8.5rem',
      xs: '14rem',
      sm: '17rem',
      md: '25rem',
      lg: '30rem',
      xl: '36rem',
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '1px 1px 3px 0 rgba(0, 0, 0, 0.1), 1px 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      'dark': '1px 1px 5px rgba(255, 255, 255, 0.1)',
      none: 'none',
    },
    extend: {
      backdropBlur: {
        xs: '2px',
      }
    }
  },
  variants: {
    scrollbar: ['rounded', 'dark'],
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
  ],
}
