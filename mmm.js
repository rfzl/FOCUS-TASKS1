/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          'light-blue': '#B1F0F7',
          'medium-blue': '#81BFDA',
          'cream': '#F5F0CD',
          'yellow': '#FADA7A',
        },
      },
    },
    plugins: [],
  }