module.exports = {
  content: [
    './index.html', // Make sure Tailwind scans the index.html
    './src/**/*.{js,jsx,ts,tsx,vue}', // Scan all Vue components and files in src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
