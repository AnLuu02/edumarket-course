/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "slide-text":
          "slideText 3s 2s steps(30, end) forwards infinite alternate",
        morph: "morph 6s ease-in-out infinite",
        wiggle: "wiggle 1s ease infinite",
        fadeTop: "fadeTop 0.3s ease-in-out",
        fadeBottom: "fadeBottom 0.3s ease-in-out"
      },
      keyframes: {
        slideText: {
          "0%": {
            width: "0"
          },
          "100%": {
            width: "100%"
          }
        },
        morph: {
          "0%": { borderRadius: "30% 70% 70% 30% / 43% 36% 64% 57%" },
          "50%": { borderRadius: "58% 42% 30% 70% / 58% 66% 34% 42%" },
          "100%": { borderRadius: "30% 70% 70% 30% / 43% 36% 64% 57%" }
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg) scale(0.9) " },
          "10%": { transform: "rotate(0deg) scale(1)" },
          "20%": { transform: "rotate(-3deg) scale(1)" },
          "30%": { transform: "rotate(3deg) scale(1)" },
          "40%": { transform: "rotate(-3deg) scale(1)" },
          "50%": { transform: "rotate(3deg) scale(1)" }
        },
        fadeTop: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        fadeBottom: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
};
