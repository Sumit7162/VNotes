# VNotes — Frontend

React + Vite client for VNotes, an AI note-taker for YouTube videos. Paste a
video URL, and the backend transcribes it and returns structured markdown study
notes that this app renders, searches, and prints.

The API lives in a separate repository:
[VNotes-Backend](https://github.com/Sumit7162/VNotes-Backend).

## Tech stack

| Concern | Choice |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 6 |
| Styling | TailwindCSS |
| Data fetching | TanStack Query |
| Routing | React Router 7 |
| Auth | Google Sign-In (`@react-oauth/google`) |
| Markdown | react-markdown + remark-gfm + remark-math + KaTeX |

## Getting started

Requires Node.js 20+ and a running VNotes backend.

```bash
npm install
cp .env.example .env   # then fill in the two values below
npm run dev
```

The app starts on <http://localhost:5173>.

### Environment

| Variable | Meaning |
|---|---|
| `VITE_GOOGLE_CLIENT_ID` | OAuth 2.0 Client ID from Google Cloud Console → APIs & Services → Credentials. Add `http://localhost:5173` as an authorized JavaScript origin. |
| `VITE_API_URL` | Base URL of the backend API. `http://localhost:8000` for local development. |

`vite.config.ts` also proxies `/api` to `http://localhost:8000`, so a local
backend works without CORS configuration.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload on port 5173 |
| `npm run build` | Type-check (`tsc -b`) then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint over the project |

## Layout

```
src/
├── components/   # Reusable UI: cards, markdown renderer, sidebar, usage stats
├── pages/        # One component per route
├── hooks/        # TanStack Query hooks wrapping the API services
├── services/     # Typed axios clients for each API area
├── types/        # Shared TypeScript definitions
├── utils/        # Small helpers (date formatting, ...)
├── App.tsx       # Routes and layout shell
└── main.tsx      # Entry point and providers
```

## Deployment

`vercel.json` configures a Vercel static build with SPA rewrites. Set
`VITE_GOOGLE_CLIENT_ID` and `VITE_API_URL` as project environment variables,
and add the deployed origin to both the Google OAuth authorized origins and the
backend's `CORS_ORIGINS`.
