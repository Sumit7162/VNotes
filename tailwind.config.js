/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // A cool, near-white ground rather than a tinted gradient. The old page
        // background layered a blue radial over a blue linear gradient, which is
        // what made every screen feel washed; flat surfaces let the accent do
        // the work instead.
        paper: {
          50: "#FFFFFF",
          100: "#F7F9FC",
          200: "#EDF1F7",
          300: "#E2E8F1",
        },
        // One cool neutral ramp. The app previously mixed Tailwind's slate and
        // gray scales at random, which reads as unconsidered however good the
        // accent is.
        ink: {
          300: "#C7D0DC",
          400: "#97A3B4",
          500: "#667588",
          600: "#4A5769",
          700: "#35404F",
          800: "#202936",
          900: "#131A24",
          DEFAULT: "#131A24",
        },
        // Sampled from the logo, whose stroke runs #3040A0 indigo -> #2080C0
        // blue -> #20D0D0 cyan. Used flat and sparingly: one confident blue,
        // never a gradient.
        accent: {
          50: "#EEF4FF",
          100: "#DAE6FE",
          200: "#B9CDFC",
          300: "#8FADF8",
          600: "#2A5FD9",
          700: "#1F49AC",
          800: "#1A3A85",
          DEFAULT: "#2A5FD9",
        },
        // The cyan end of the logo gradient, darkened enough to carry text.
        cyan: {
          50: "#E9FAFB",
          100: "#C7F1F4",
          200: "#97E3E9",
          600: "#0E90A0",
          700: "#0B7280",
          DEFAULT: "#0E90A0",
        },
        // The indigo end, pushed violet so it is distinguishable from `accent`
        // when the two sit side by side in a list of statuses.
        violet: {
          50: "#F1EFFC",
          100: "#DFDAF8",
          200: "#C3BAF1",
          600: "#5B47C4",
          700: "#47379B",
          DEFAULT: "#5B47C4",
        },
        // The one warm hue, kept for the download stage: against a blue system
        // an amber reads instantly as "something is happening".
        gold: {
          50: "#FEF6E7",
          100: "#FCE9C2",
          200: "#F7D593",
          600: "#A9700B",
          700: "#855706",
          DEFAULT: "#A9700B",
        },
        line: {
          DEFAULT: "#DEE5EE",
          strong: "#C9D3E0",
        },
        success: {
          50: "#ECF7F0",
          100: "#D3EDDD",
          200: "#AEDCC1",
          600: "#1F7A4C",
          700: "#175C39",
          DEFAULT: "#1F7A4C",
        },
        danger: {
          50: "#FDF1F1",
          100: "#FADEDE",
          200: "#F3BFBF",
          600: "#C0362F",
          700: "#9A2A24",
          800: "#7A211C",
          DEFAULT: "#C0362F",
        },
      },
      fontFamily: {
        // Fraunces carries the headings, Inter does the reading. Both are loaded
        // in index.html - the stylesheet used to name Inter while nothing ever
        // fetched it, so every screen silently rendered in system-ui.
        display: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        // Three steps used consistently: controls, cards, pills. The original
        // mixed six radii with no rule behind which went where.
        DEFAULT: "6px",
        md: "6px",
        lg: "8px",
        xl: "10px",
        "2xl": "14px",
        "3xl": "18px",
      },
      boxShadow: {
        // Two quiet steps, neutral rather than tinted. Coloured shadows under
        // buttons were part of what made the old interface look generated.
        sm: "0 1px 2px rgba(19, 26, 36, 0.05)",
        DEFAULT: "0 1px 3px rgba(19, 26, 36, 0.07)",
        md: "0 2px 8px rgba(19, 26, 36, 0.08)",
        lg: "0 6px 20px rgba(19, 26, 36, 0.10)",
      },
    },
  },
  plugins: [],
}
