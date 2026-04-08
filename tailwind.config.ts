import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        calendarBlue: {
          DEFAULT: "#1E6FCC",
          light: "#4D94E8",
          dark: "#1450A0",
          muted: "rgba(30,111,204,0.18)",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        flipIn: {
          "0%": {
            transform: "rotateX(-12deg) translateY(-16px)",
            opacity: "0",
          },
          "100%": { transform: "rotateX(0deg) translateY(0)", opacity: "1" },
        },
        flipOut: {
          "0%": { transform: "rotateX(0deg)", opacity: "1" },
          "100%": {
            transform: "rotateX(12deg) translateY(16px)",
            opacity: "0",
          },
        },
        slideInRight: {
          "0%": { transform: "translateX(40px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideOutLeft: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(-40px)", opacity: "0" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-40px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideOutRight: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(40px)", opacity: "0" },
        },
      },
      animation: {
        "flip-in": "flipIn 0.35s ease-out forwards",
        "flip-out": "flipOut 0.35s ease-in forwards",
        "slide-in-right": "slideInRight 0.3s ease-out forwards",
        "slide-out-left": "slideOutLeft 0.3s ease-in forwards",
        "slide-in-left": "slideInLeft 0.3s ease-out forwards",
        "slide-out-right": "slideOutRight 0.3s ease-in forwards",
      },
    },
  },
  plugins: [],
};

export default config;
