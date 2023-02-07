/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.jsx', './src/**/*.html', './src/**/*.tsx', './src/**/*.css'],
  theme: {
    extend: {},
    colors: {
      darkGray: '#333',
      yellow: '#eab308',
      white: '#FFF',
      black: '#000',
      lightYellow: '#fde047',
      bgColorLightGray: '#9ca3af',
      bgColorWhiteIce: '#FAFAFA',
      bgColorGrayThead: '#374151',
      zinc: '#18181b',
      zinc400: '#a1a1aa',
      transparent: 'transparent',
      bgPendente: '#CCB800',
      bgPreparando: '#66CC00',
      bgEntregue: '#00CC9B',
      bgTransito: '#00CCFF',
      bgCancelado: '#CC0000',
    },
    screens: {
      mb: '320px',
      sm: '540px',
      // => @media (min-width: 540px) { ... }
      md: '768px',
      // => @media (min-width: 768px) { ... }
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }
      xl: '1200px',
      // => @media (min-width: 1200px) { ... }
    },
    boxShadow: {
      DEFAULT: '0 0 0 1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0px 5px 10px 0px rgba(0, 0, 0, 0.5)',
      lg: '0 10px 20px rgba(0, 0, 0, .25)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    },
  },
  plugins: [],
};
