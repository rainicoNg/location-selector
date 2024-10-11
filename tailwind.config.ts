import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        dark: "var(--dark)",
        disabled: "var(--disabled)"
      }
    },
    screens: {
      tablet: "768px",
      laptop: "1024px",
      desktop: "1280px"
    }
  },
  plugins: []
};
export default config;
