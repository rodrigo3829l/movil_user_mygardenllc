/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './public/index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', 
    './src/components/**/*.{vue,js,ts,jsx,tsx}', 
    './src/views/**/*.{vue,js,ts,jsx,tsx}', 
    './src/modules/**/*.{vue,js,ts,jsx,tsx}', 
    './src/styles/**/*.css', 
  ],  
  theme: {
    extend: {
      colors: {
        // Colores para el tema claro
        'input-background': '#F0F5F0',
        'input-text': '#86A286',

        // Colores para los chips
        'chip-background': '#F0F5F0',
        'chip-text': '#000000',

        // Colores para el searchbar
        'searchbar-background': '#F0F5F0',
        'searchbar-text': '#86A286',


        // Colores para el tema oscuro
        dark: {
          'input-background': '#2E3A2D',
          'input-text': '#A5CBA1',
          'chip-background': '#2E3A2D',
          'chip-text': '#FFFFFF',
          'searchbar-background': '#2E3A2D',
          'searchbar-text': '#A5CBA1',
        },
      },
    },
  },
  plugins: [],
}
