module.exports = {
  content: ["index.html", "./src/**/*.jsx", "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'blue-pastel-100':'#c8dede',
        'blue-pastel-200':'#76a4a5',
        'blue-pastel-300':'#5c9c9c',
      },
      scale: ['active'],
      backgroundColor: ['active'],
    },
  },
  plugins: [''],
}

