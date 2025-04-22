/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#81BFDA",       // Biru laut
        secondary: "#B1F0F7",     // Biru muda
        accent: "#FADA7A",        // Kuning
        background: "#F5F0CD",    // Krem lembut
      },
    },
  },
  plugins: [],
};