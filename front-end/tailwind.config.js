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
  },
  plugins: [],
};
