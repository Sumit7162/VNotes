/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm paper rather than a cold blue-grey. The whole point of the
        // palette is that a note-taking app should feel like paper, so the
        // neutrals carry a little red and yellow instead of blue.
        paper: {
          50: "#FFFDFA",
          100: "#FAF7F2",
          200: "#F3EEE6",
          300: "#EBE4D9",
        },
        // A single ink ramp. Previously the app mixed Tailwind's slate and gray
        // scales at random, which is a large part of why it read as generic.
        ink: {
          300: "#D6D3D1",
          400: "#A8A29E",
          500: "#78716C",
          600: "#57534E",
          700: "#44403C",
          800: "#292524",
          900: "#1C1917",
          DEFAULT: "#1C1917",
        },
        // One accent, used sparingly and always flat. Rust reads as considered
        // where the old sky-to-indigo gradient read as a default.
        accent: {
          50: "#FDF4F1",
          100: "#F9E3DC",
          200: "#F0C4B6",
          300: "#E09B85",
          600: "#B4442A",
          700: "#93351F",
          800: "#742A19",
          DEFAULT: "#B4442A",
        },
        line: {
          DEFAULT: "#E7E0D6",
          strong: "#D8CFC1",
        },
        success: {
          50: "#F1F6F0",
          100: "#DFEBDD",
          600: "#4D7C4A",
          700: "#3D6339",
          DEFAULT: "#4D7C4A",
        },
        danger: {
          50: "#FCF2F0",
          100: "#F7E1DD",
          200: "#EFC5BD",
          600: "#B23A2E",
          700: "#8F2C22",
          800: "#71231B",
          DEFAULT: "#B23A2E",
        },
      },
      fontFamily: {
        // Fraunces carries the warmth; Inter does the reading. Both are loaded
        // in index.html - the previous stylesheet named Inter but nothing ever
        // fetched it, so the app silently rendered in system-ui.
        display: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        // Three steps, used consistently: controls, cards, pills. The old code
        // mixed six radii with no rule behind which went where.
        DEFAULT: "6px",
        md: "6px",
        lg: "8px",
        xl: "10px",
        "2xl": "14px",
        "3xl": "18px",
      },
      boxShadow: {
        // Paper does not glow. One quiet lift for hover, one for popovers.
        sm: "0 1px 2px rgba(28, 25, 23, 0.04)",
        DEFAULT: "0 1px 3px rgba(28, 25, 23, 0.06)",
        md: "0 2px 8px rgba(28, 25, 23, 0.07)",
        lg: "0 6px 20px rgba(28, 25, 23, 0.09)",
      },
    },
  },
  plugins: [],
}
