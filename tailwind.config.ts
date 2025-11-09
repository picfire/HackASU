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
        },
        highlight_text: {
          '0%': { 'background-position-x': '0%' },
          '100%': { 'background-position-x': '-100%' }
        },
      },
      animation: {
        'slow_spin': 'slow_spin 120s linear infinite',
        'highlight_text': 'highlight_text 1s linear'
      }
    },
  },
  plugins: [
    require("daisyui"),
  ],
};
export default config;
