import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "deep-sea":
          "linear-gradient(180deg, #6EF1FA 0.13%, #6BECF7 1.15%, #64DDEE 2.16%, #57C6E0 3.18%, #46A5CC 4.45%, #317BB3 5.72%, #2768A8 6.23%, #245495 7.25%, #1B3B80 9.03%, #102B66 11.06%, #111F5C 12.09%, #131A5C 12.64%, #14185C 14.12%, #14165C 14.57%, #1A1058 23.90%, #16115C 24.05%, #18115A 24.60%, #16115C 25.19%, #191159 30.04%, #1A1058 32.32%, #1C1056 33.53%, #1C1056 37.02%, #14165C 39.61%, #112460 41.72%, #102B66 43.91%, #1B3B80 48.81%, #245495 51.86%, #2768A8 53.60%, #317BB3 63.80%, #317BB3 72.55%, #2768A8 74.51%, #245495 76.97%, #1B3B80 84.35%, #102B66 87.09%, #0C316F 90.80%, #0B3574 92.78%, #083979 95.21%, #054083 99.27%, #01478D 100%)",
      },
      colors: {
        fh: {
          bg: "#FFFFFF",
          card: "#FFFFFF",
          accent: "#FFFFFF",
          accentAlt: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        nemo: ["FindingNemo", "sans-serif"],
        picture: ["BlackAndWhitePicture", "sans-serif"],
        bagel: ["BagelFatOne", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
