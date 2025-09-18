import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "var(--primary)",
        secondaryColor: "var(--secondary)",
        accentColor: "var(--accent)",
        Body: "var(--text-body)",
        Light: "var(--text-light)",
        Dark: "var(--text-dark)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      listStyleImage: {
        myAccent: "url('/check.svg')",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translate(0%)'},
          '100%': { transform: 'translate(-100%)'},
        }
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      }
    },
  },
  plugins: [],
} satisfies Config;
