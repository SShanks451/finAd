/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-lime": "#07804f", // Add your custom color here
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
        usmodern: ["Playwrite US Modern", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },

      fontWeight: {
        400: "400",
        600: "600",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      });
    },
  ],
};
