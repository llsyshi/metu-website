/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Microsoft YaHei"', '"微软雅黑"', 'Arial', 'sans-serif'],
        display: ['"Microsoft YaHei"', '"微软雅黑"', 'Arial', 'sans-serif'],
      },
      colors: {
        carbon: '#0b0b0c',
        graphite: '#1e1f21',
        steel: '#aeb4ba',
        mist: '#f4f4f1',
        champagne: '#b99056',
        oxblood: '#8f1f1f',
      },
      boxShadow: {
        metal: '0 24px 80px rgba(11, 11, 12, 0.16)',
      },
    },
  },
  plugins: [],
}
