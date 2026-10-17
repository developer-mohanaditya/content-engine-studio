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
          950: '#000000', // Pure OLED Pitch Black
          900: '#050505',
          850: '#0c0c0c',
          800: '#141414',
          750: '#1c1c1c',
          700: '#262626',
          600: '#383838',
          500: '#5e5e5e',
          400: '#8e8e8e',
          300: '#c2c2c2',
          200: '#e6e6e6',
          100: '#ffffff',
        },
        slate: {
          border: '#1f1f1f',
          subtle: '#2c2c2c',
          active: '#ffffff',
        },
        accent: {
          cyan: '#ffffff',     // Monochrome remapping: pure white
          violet: '#d4d4d4',   // Monochrome remapping: light zinc
          emerald: '#ffffff',  // Monochrome remapping: pure white
          amber: '#e5e5e5',   // Monochrome remapping: crisp off-white
          rose: '#ef4444',    // Recording red only
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
