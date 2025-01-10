/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./design/src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
           DEFAULT: "var(--primary)",
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
          950: "var(--primary-950)",
        },
        secondary1: {
           DEFAULT: "var(--secondary-1)",
          50: "var(--secondary-1-50)",
          100: "var(--secondary-1-100)",
          200: "var(--secondary-1-200)",
          300: "var(--secondary-1-300)",
          400: "var(--secondary-1-400)",
          500: "var(--secondary-1-500)",
          600: "var(--secondary-1-600)",
          700: "var(--secondary-1-700)",
          800: "var(--secondary-1-800)",
          900: "var(--secondary-1-900)",
          950: "var(--secondary-1-950)",
        },
        secondary2: {
          DEFAULT: "var(--secondary-2)",
         50: "var(--secondary-2-50)",
         100: "var(--secondary-2-100)",
         200: "var(--secondary-2-200)",
         300: "var(--secondary-2-300)",
         400: "var(--secondary-2-400)",
         500: "var(--secondary-2-500)",
         600: "var(--secondary-2-600)",
         700: "var(--secondary-2-700)",
         800: "var(--secondary-2-800)",
         900: "var(--secondary-2-900)",
         950: "var(--secondary-2-950)",
       },
        specialcolor: {
          1: "var(--special-1)",
          2: "var(--special-2)",
          3: "var(--special-3)",
       },

      }
    },
  },
  plugins: [],
}

