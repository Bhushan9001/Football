/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e61b3d", // Red
        secondary: "#001b36", // Dark Blue
        accent: "#21dfff", // Sky Blue
        customGray: "#666666",
        dbPrimary: "#00A0BE", // Light Blue
        dbSecondary: "#002C6D" // Dark Blue
      },
      backgroundImage: {
        authCardGradient:
          "linear-gradient(345deg, rgba(0,27,54,1) 0%, rgba(18,135,164,1) 76%, rgba(33,223,255,1) 100%)",
        WebsiteHeaderGradientV1:
          "linear-gradient(180deg, #000000 0%, #00000000 100%)",
        WebsiteHeaderGradientV2:
          "linear-gradient(180deg, #00000000 0%, #000000 80%, #000000 100%);",
        DbRowHeaderGradient: "linear-gradient(#515151, #131313)",
      },
      backgroundSize: {
        "50%": "50%",
      },
      fontFamily: {
        "roboto": "'Roboto', sans-serif"
      },
      screens: {
        lgCustom: "1440px",
        xlCustom: "1500px",
      },
    },
  },
  plugins: [],
};
