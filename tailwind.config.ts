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
        cream: "#F5F0E6",
      },
      fontFamily: {
        "Playfair_Display": ["var(--font-playfair-display)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
