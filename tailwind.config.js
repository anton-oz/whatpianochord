/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkmode: "bg-black",
        lightmode: "",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
