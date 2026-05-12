# Space Explorer

Interactive astronomy web platform built with Next.js 15, TypeScript,
React Three Fiber, Drei, Tailwind CSS 4, and NASA Open APIs.

## Features

- Real-time 3D Solar System scene
- Planet detail pages for all 8 major planets
- Local scientific planet data
- NASA APOD proxy with 24 hour cache
- NASA Near Earth Object feed with hourly cache
- Mission timeline
- Dynamic planet metadata and OG image route
- Responsive UI for mobile and desktop
- Vercel-ready config and cache headers

## Setup

```bash
npm install
npm run dev
```

## Environment

```bash
NASA_API_KEY=your_nasa_api_key_here
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
```

NASA API key is free from https://api.nasa.gov.

Without `NASA_API_KEY`, the app still builds and uses NASA `DEMO_KEY` plus
fallback content.

## Build

```bash
npm run build
```

## Deploy

Push to GitHub, import the repo in Vercel, set environment variables, then deploy.
