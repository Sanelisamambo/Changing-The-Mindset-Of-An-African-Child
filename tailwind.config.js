/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-green': '#1E4D2B',
        'gold': '#D4A017',
        'cream': '#FDF8F0',
        'warm-brown': '#5D4037',
        'off-white': '#FAF7F2',
      },
    },
  },
  plugins: [],
};