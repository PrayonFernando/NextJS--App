# Imperial Courses – Next.js + Tailwind

A responsive courses catalog implementing the provided Figma design with a pixel-accurate container grid and dynamic data from the public API.

## Tech Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Server Components w/ ISR (`revalidate: 60`)
- `next/image` (set to `unoptimized` for simplicity in this take-home)

## Getting Started

```bash
npm i
npm run dev
# open http://localhost:3000
```

> Node 18+ is recommended.

## Scripts
- `dev` – local dev server
- `build` – production build
- `start` – run production server
- `lint` – ESLint

## API
Data is fetched server-side from:
`https://66fcfeedc3a184a84d18a7f4.mockapi.io/imperial/api/v1/courses`

- Revalidated every 60 seconds for freshness.
- Cards render title, subtitle, price, meta, and image.
- Courses grouped by `category` into sections.

## Design Notes
- `.container` grid with tuned paddings and breakpoints to mimic common Figma frames (sm→2, lg→3, xl→4 columns).
- Card baseline: `rounded-2xl`, `shadow-sm`, subtle border; hover elevation.
- Typography sizes are set to be easily tweaked to match exact Figma tokens.

## Performance
- Server rendering + ISR to keep pages fast and cached.
- Dynamic import for card skeleton (example of lazy loading).
- `next/image` included; `unoptimized: true` to avoid remotePatterns setup. For production, configure `images.remotePatterns` to match CDN domains and turn optimization back on.

## Scaling Strategy
- Move fetching behind `/api` routes with cache and logging.
- Add pagination and search to limit payloads.
- Adopt SWR/React Query on the client for interactive filters.
- CDN for images; pre-generate common category pages.
- Add monitoring (Vercel Analytics / Sentry).

## Repository & Access
- Create a **private** GitHub repo and push this project.
- Invite:
  - **User**: `ImperialEdutech`
  - **Email**: `it@globaledulink.co.uk`

## Commit Guidelines
- `chore: init Next.js + TS + Tailwind`
- `feat: types and API util with ISR`
- `feat: CourseCard + CategorySection components`
- `feat: server fetch + category grouping`
- `style: spacing/typography parity`
- `perf: dynamic import loader`

## Deployment
- Recommended: **Vercel** (framework detection auto).
- Add your deploy URL to this README once live.
