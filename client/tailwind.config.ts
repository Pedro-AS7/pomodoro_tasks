import type { Config } from "tailwindcss";
import scrollbar from "tailwind-scrollbar";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ajuste conforme sua estrutura
  ],
  theme: {
    extend: {},
  },
  plugins: [
    scrollbar, // usando import
  ],
};

export default config;
