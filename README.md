# Alpha Ocean Hub

Cinematic single-page marketing site for **Alpha Ocean Hub** — a surf school &
board-rental shop in Weligama, Sri Lanka. Surf lessons + board rentals,
WhatsApp-only enquiries (no on-site prices).

## Stack
Next.js (static export) · Tailwind · Framer Motion · Lenis

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
```

## Assets
- `npm run optimize` — re-optimize photos from `assets/photos/` into `public/photos/`
- `npm run frames` — extract the hero scroll-scrub sequence from `assets/Video-533.mp4` into `public/frames/` (needs `ffmpeg`)

## Configure
Edit `lib/site.ts` — set `whatsappNumber` (digits only, country code first, no `+`).
If you change the photo set, update `lib/gallery.ts` (gallery list + `FRAME_COUNT`).

## Build & deploy
```bash
npm run build    # outputs static site to out/
```
Upload `out/` to Hostinger static hosting, or serve via the Pi + Tailscale Funnel.
