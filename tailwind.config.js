/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xs: "10px",
      },
      colors: {
        "royal-blue": {
          50: "#eef4ff",
          100: "#e0eaff",
          200: "#c6d7ff",
          300: "#a4bcfd",
          400: "#8097f9",
          500: "#6273f2",
          600: "#4f55e8",
          700: "#373acb",
          800: "#2f33a4",
          900: "#2d3282",
          950: "#1b1d4b",
        },
      },
    },
  },
  plugins: [],
};
