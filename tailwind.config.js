/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        planear:   '#3B82F6',
        hacer:     '#10B981',
        verificar: '#F59E0B',
        actuar:    '#EF4444',
      },
    },
  },
  plugins: [],
}
