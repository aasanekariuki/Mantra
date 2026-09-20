# MANTRA

MANTRA is an African men's wellbeing, development, community and opportunity institution. This repository is the frontend for MANTRA's website — a Vite + React + TypeScript single-page app with no backend, built to be extended into a larger platform over time.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- React Router
- Framer Motion
- Three.js / React Three Fiber / Drei (lazy-loaded hero scene, with a CSS fallback and `prefers-reduced-motion` support)
- React Hook Form + Zod (contact form validation)
- Lucide React icons

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

`npm run build` type-checks the project (`tsc -b`) and then builds with Vite into `dist/`.

## Project structure

```
src/
  assets/        static assets
  components/
    ui/          buttons, headings, tags, forms, modal
    layout/      navbar, mobile menu, footer, page header
    sections/    reusable page sections (pillars, CTA, signature interaction)
    cards/       content cards (program, story, event, opportunity, research)
    animation/   scroll reveal, animated text, page transitions, image reveal
    three/       the 3D hero network scene + fallback
  data/          mock/sample content (programs, stories, events, opportunities, research, partners, pillars)
  hooks/         small reusable hooks (reduced motion, scroll state)
  lib/           utilities
  pages/         route-level pages
  types/         shared content types
```

## Content

All dynamic content (programs, stories, events, opportunities, research, partner categories) lives in `src/data/` as typed local data — no backend or API keys required. Content that isn't real yet (events, opportunities, research, partner logos, impact metrics) is clearly marked as sample/demo/placeholder in the UI rather than presented as real.

## Notes

- The 3D hero (`src/components/three`) is lazy-loaded, checks for WebGL support, and falls back to a static CSS visual if WebGL is unavailable or `prefers-reduced-motion` is set.
- Google Fonts (Space Grotesk, Inter) are loaded via `index.html`; the type stack falls back to system sans-serif fonts if the network request fails.
- No environment variables or API keys are required to run or build this project.
# Mantra
