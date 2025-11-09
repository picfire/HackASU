import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "purple_background": "#CB9EF0"
      },
      keyframes: {
        slow_spin: {
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        'slow_spin' : 'slow_spin 120s linear infinite'
      }
    },
  },
  plugins: [
    require("daisyui"),
  ],
};
export default config;
