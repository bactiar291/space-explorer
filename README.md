# Manspace

Platform astronomi interaktif berbahasa Indonesia. Dibangun dengan Next.js 15,
TypeScript, React Three Fiber, Drei, Tailwind CSS 4, dan NASA Open APIs.

## Features

- Simulasi tata surya 3D real-time
- Dashboard detail untuk 8 planet utama
- Animasi 3D khusus di setiap halaman planet
- Data ilmiah planet lokal, cepat tanpa runtime NASA
- Proxy NASA APOD dengan cache 24 jam
- Feed objek dekat Bumi dengan cache per jam
- Timeline misi antariksa
- Metadata dan OG image dinamis
- UI responsif untuk HP dan desktop
- Konfigurasi Vercel siap deploy

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

NASA API key gratis dari https://api.nasa.gov.

Tanpa `NASA_API_KEY`, aplikasi tetap build dan memakai NASA `DEMO_KEY`
plus konten cadangan.

## Build

```bash
npm run build
```

## Deploy

Push ke GitHub, import repo di Vercel, set environment variables bila ada, lalu deploy.
