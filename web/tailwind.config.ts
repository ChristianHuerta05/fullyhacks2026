import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // ============================================
      // COLOR SYSTEM
      // Primary ocean/underwater theme colors
      // ============================================
      colors: {
        // Primary accent colors
        fh: {
          // Light cyan accent (primary highlight)
          cyan: {
            DEFAULT: "#BEF3FC",
            light: "#D4F7FD",
            dark: "#6EF1FA",
          },
          // Deep ocean blues
          ocean: {
            lightest: "#317BB3",
            light: "#2768A8",
            DEFAULT: "#245495",
            dark: "#1B3B80",
            darker: "#102B66",
            darkest: "#14165C",
          },
          // Accent teal for FAQ/highlights
          teal: {
            DEFAULT: "#14B8A6", // teal-500
            dark: "#0D9488", // teal-600
          },
          // Sky blue accent
          sky: {
            DEFAULT: "#7DD3FC", // sky-300
            light: "#BAE6FD", // sky-200
          },
          // Card colors for Rolls section
          card: {
            purple: "#8E69CE",
            blue: "#6991CE",
            teal: "#69CEC3",
          },
          // Card title colors
          title: {
            purple: "#3B087D",
            blue: "#080E7D",
            teal: "#08717D",
          },
        },
      },

      // ============================================
      // TYPOGRAPHY SCALE
      // Consistent font sizes for headings & body
      // ============================================
      fontSize: {
        // Display sizes (hero headings, major titles)
        "display-2xl": ["9.25rem", { lineHeight: "1", letterSpacing: "0.02em" }], // 148px - stats
        "display-xl": ["7rem", { lineHeight: "1", letterSpacing: "0.02em" }], // 112px - hero title
        "display-lg": ["6rem", { lineHeight: "1.1", letterSpacing: "0.01em" }], // 96px - section titles
        "display-md": ["5.25rem", { lineHeight: "1.1", letterSpacing: "0.01em" }], // 84px - stat labels
        "display-sm": ["4.5rem", { lineHeight: "1.2" }], // 72px - about title

        // Heading sizes
        "heading-xl": ["3.75rem", { lineHeight: "1.2" }], // 60px - countdown subtitle
        "heading-lg": ["3rem", { lineHeight: "1.25" }], // 48px - buttons
        "heading-md": ["2.25rem", { lineHeight: "1.3" }], // 36px - card titles
        "heading-sm": ["1.875rem", { lineHeight: "1.4" }], // 30px - subheadings
        "heading-xs": ["1.5rem", { lineHeight: "1.4" }], // 24px - small headings

        // Body text sizes
        "body-xl": ["1.5rem", { lineHeight: "1.5" }], // 24px
        "body-lg": ["1.25rem", { lineHeight: "1.6" }], // 20px
        "body-md": ["1.125rem", { lineHeight: "1.6" }], // 18px
        "body-sm": ["1rem", { lineHeight: "1.6" }], // 16px
        "body-xs": ["0.875rem", { lineHeight: "1.5" }], // 14px

        // Caption/fine print
        caption: ["0.75rem", { lineHeight: "1.5" }], // 12px
        "caption-sm": ["0.625rem", { lineHeight: "1.4" }], // 10px
      },

      // ============================================
      // FONT FAMILIES
      // ============================================
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        nemo: ["FindingNemo", "sans-serif"],
        picture: ["BlackAndWhitePicture", "sans-serif"],
        bagel: ["BagelFatOne", "sans-serif"],
      },

      // ============================================
      // SPACING SCALE
      // Custom values for section gaps and margins
      // ============================================
      spacing: {
        // Section spacing
        "section-sm": "3rem", // 48px
        "section-md": "5rem", // 80px
        "section-lg": "7.5rem", // 120px
        "section-xl": "10rem", // 160px

        // Content gaps
        "gap-xs": "0.5rem", // 8px
        "gap-sm": "1rem", // 16px
        "gap-md": "1.5rem", // 24px
        "gap-lg": "2.5rem", // 40px
        "gap-xl": "4rem", // 64px

        // Large hero-specific values
        "18": "4.5rem", // 72px
        "22": "5.5rem", // 88px
        "25": "6.25rem", // 100px
        "30": "7.5rem", // 120px
        "55": "13.75rem", // 220px (bottle padding)
        "100": "25rem", // 400px
        "110": "27.5rem", // 440px
        "120": "30rem", // 480px
        "145": "36.25rem", // 580px
        "155": "38.75rem", // 620px
        "254": "63.5rem", // 1016px (positioning)
      },

      // ============================================
      // BORDER RADIUS
      // ============================================
      borderRadius: {
        xl2: "1.25rem", // 20px
        "2xl": "1rem", // 16px
        "3xl": "1.5rem", // 24px
        "4xl": "2rem", // 32px
      },

      // ============================================
      // MAX WIDTH
      // Container constraints
      // ============================================
      maxWidth: {
        content: "1200px",
        "content-sm": "800px",
        "content-lg": "1400px",
        "400": "100rem", // 1600px for FAQ
      },

      // ============================================
      // BACKGROUND IMAGES
      // ============================================
      backgroundImage: {
        "deep-sea": `linear-gradient(180deg, 
          #6EF1FA 0.13%, #6BECF7 1.15%, #64DDEE 2.16%, #57C6E0 3.18%, 
          #46A5CC 4.45%, #317BB3 5.72%, #2768A8 6.23%, #245495 7.25%, 
          #1B3B80 9.03%, #102B66 11.06%, #111F5C 12.09%, #131A5C 12.64%, 
          #14185C 14.12%, #14165C 14.57%, #1A1058 23.90%, #16115C 24.05%, 
          #18115A 24.60%, #16115C 25.19%, #191159 30.04%, #1A1058 32.32%, 
          #1C1056 33.53%, #1C1056 37.02%, #14165C 39.61%, #112460 41.72%, 
          #102B66 43.91%, #1B3B80 48.81%, #245495 51.86%, #2768A8 53.60%, 
          #317BB3 63.80%, #317BB3 72.55%, #2768A8 74.51%, #245495 76.97%, 
          #1B3B80 84.35%, #102B66 87.09%, #0C316F 90.80%, #0B3574 92.78%, 
          #083979 95.21%, #054083 99.27%, #01478D 100%)`,
      },

      // ============================================
      // ANIMATIONS
      // ============================================
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(-15deg)" },
          "50%": { transform: "translateY(-20px) rotate(-14deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      // ============================================
      // BOX SHADOWS
      // ============================================
      boxShadow: {
        button: "0px 4px 4px rgba(255, 255, 255, 0.25)",
        card: "0 8px 32px rgba(0, 0, 0, 0.12)",
        soft: "0 18px 60px rgba(15, 23, 42, 0.9)",
      },

      // ============================================
      // BACKDROP BLUR
      // ============================================
      backdropBlur: {
        heavy: "100px",
      },
    },
  },
  plugins: [],
};

export default config;
