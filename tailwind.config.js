/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens:{
          '2xl' : '1320px',
          'xl' : '1280px',
          'lg' : '1024px',
          'md' : '768px',
        }
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1320px",
      },
      colors: {
        primaryColor: "#60E5AE",
        headingColor: "#1F1F1F",
        paraColor: "#667085",
        paraLight: "#667085",
      },
    },
  },
  plugins: [],
};
