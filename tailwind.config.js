/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "s1": "#a6e3a1", //hijau mocca
        "s2": "#f9e2af", //kuning mocca
        "s3": "#fab387", //orange mocca
        "n": "#f38ba8", //merah mocca
        "title": "#40a02b", //hijau
        "pfp": "#f7f7f7", //abu
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
          "primary": "#eff1f5", //putih abu latte
          "secondary": "#6c6f85", //abu muda
          "accent": "#a6e3a1", // hijau mocca
          "neutral": "#4c4f69", // abu tua latte
          "base-100": "#ffffff", // putih abu latte
          "info": "#04a5e5", // biru langit latte
          "success": "#40a02b", // hijau latte
          "warning": "#df8e1d", // kuning latte
          "error": "#e64553", // maroon latte
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}