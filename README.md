# 🔍 GitHub Repository Search

A tiny web app to search and explore GitHub repositories in real-time.

## ✨ Overview
- Search GitHub repositories by name
- Shows: full name, stars, last update, description (as tooltip), language
- Basic loading/error states
- 100% client-side via GitHub Public API (no auth)

## 🧰 Tech Stack
- React 19
- TypeScript
- Vite 7
- Tailwind CSS
- ESLint
- Prettier

## ⚙️ Requirements
- Node.js: confirms a minimum version (recent LTS compatible with Vite 7)
- pnpm globally (recommended)

## ▶️ Quick Start
1) Install dependencies
   - pnpm: `pnpm install`

2) Start the dev server
   - `pnpm run dev`
   - Typical local URL: http://localhost:5173

3) Production build → `pnpm run build`
4) Preview build → `pnpm run preview`
5) Lint project → `pnpm run lint`

## 📜 Scripts (package.json)
- `dev`: start Vite
- `build`: type-check (`tsc -b`) then Vite build
- `lint`: ESLint
- `preview`: preview the build
- TODO: add `format` (e.g., `npx prettier . --write`)

## 🔐 Environment Variables
- None required
- TODO: optional `GITHUB_TOKEN` support to raise rate limits (Authorization header)

## 🗂 Quick Structure
- `index.html` → loads `src/main.tsx`
- `src/main.tsx` → bootstraps React + global styles
- `src/App.tsx` → main UI
- `src/services/fetchData.tsx` → GitHub API requests
- `src/styles/` → Tailwind + app styles
- `vite.config.ts` → Vite config (React + Tailwind, `@` alias)

## 🧪 Tests
- No testing framework configured
- TODO: add Vitest + Testing Library and a CI workflow

## 🌐 GitHub API Notes
- `GET https://api.github.com/search/repositories?q=<query>&page=<page>&per_page=10`
- Rate limits apply to unauthenticated requests
- TODO: UX: format `updated_at`, highlight the most-starred row, pagination, color by language

## 📄 License
- License file present: see `LICENSE.txt`
