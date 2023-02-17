/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "s1": "#a6e3a1", //hijau
        "s2": "#f9e2af", //kuning
        "s3": "#fab387", //orange
        "n": "#f38ba8", //merah
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