/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        studio: {
          900: '#090A0F',
          850: '#0E1117',
          800: '#141822',
          700: '#1D2332',
          600: '#2A3347',
          500: '#404E6B',
          400: '#687B9F',
          300: '#9FB0D0',
          200: '#D1DBEB',
          100: '#F0F4FA',
        },
        accent: {
          cyan: '#00F2FE',
          violet: '#7F00FF',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
