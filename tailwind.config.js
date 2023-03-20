/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        s1: "#10a063", //hijau mocca
        s2: "#ffcd42", //kuning mocca
        s3: "#e99b5C", //orange mocca
        n: "#ce5050", //merah mocca
        bl: "#6f6f6f",
        title: "#40a02b", //hijau
        pfp: "#f7f7f7", //abu
        accent: "#a6e3a1",
      },
      height: {
        128: "32rem",
      },
      width: {
        128: "32rem",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#eff1f5", //putih abu latte
          secondary: "#6c6f85", //abu muda
          accent: "#a6e3a1", // hijau mocca
          neutral: "#4c4f69", // abu tua latte
          "base-100": "#ffffff", // putih abu latte
          info: "#04a5e5", // biru langit latte
          success: "#40a02b", // hijau latte
          warning: "#df8e1d", // kuning latte
          error: "#e64553", // maroon latte
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
