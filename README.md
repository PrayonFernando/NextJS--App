# Imperial EduTech – Next.js App

A responsive courses catalog implementing the provided Figma design with a container grid and dynamic data from the public API.

# LINK :

`https://next-js-app-five-phi.vercel.app/`

# -----Tech Stack------

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Server Components w/ ISR (`revalidate: 60`)
- `next/image` (set to `unoptimized` for simplicity in this take-home)

## Starting the project

npm i
npm run dev
and then open localhost:3000

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
- Dynamic import for card skeleton with lazy loading.

## Scaling Strategy

- Move fetching behind `/api` routes with cache and logging.
- Add pagination and search to limit payloads.
- Adopt SWR/React Query on the client for interactive filters.
- CDN for images; pre-generate common category pages.
- Add monitoring (Vercel Analytics / Sentry).

## Deployment

- Using `VERCEL`

## ----------------------------Thank you ------------------------
