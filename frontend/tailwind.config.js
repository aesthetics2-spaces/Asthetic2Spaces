/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // very important!
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ["Cinzel", "serif"],
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#004E64",     
        secondary: "#E3B04B",    
        accent: "#46B5D1",       
        neutral: "#1F2937",     
        light: "#F9FAFB",        
        muted: "#CBD5E1",        
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(to right, #CBD5E1 1px, transparent 1px),
          linear-gradient(to bottom, #CBD5E1 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid': '20px 20px',
      }
    },
  },
  plugins: [],
};