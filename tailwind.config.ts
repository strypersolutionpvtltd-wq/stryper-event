import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          black: "#0a0a0a",
          yellow: "#facc15",
          gold: "#fbbf24",
        },
        accent: {
          yellow: "#facc15",
          gold: "#fbbf24",
          "gold-light": "#fde68a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": {
            boxShadow:
              "0 0 20px rgba(250, 204, 21, 0.3), 0 0 40px rgba(250, 204, 21, 0.1)",
          },
          "50%": {
            boxShadow:
              "0 0 40px rgba(250, 204, 21, 0.5), 0 0 80px rgba(250, 204, 21, 0.2)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glow-gradient":
          "radial-gradient(circle at center, rgba(250, 204, 21, 0.15) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
