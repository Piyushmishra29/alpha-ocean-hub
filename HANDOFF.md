# Handoff — Alpha Ocean Hub

## Required before launch
- [ ] **WhatsApp number** — set `whatsappNumber` in `lib/site.ts` (currently stub `94000000000`).
- [ ] **Logo** — `public/logo.png` is from a screenshot; replace with a clean transparent PNG/SVG.
- [ ] **Map** — confirm the exact Weligama pin in `lib/site.ts` `mapEmbed`.
- [ ] **Deploy target** — Hostinger vs Pi + Tailscale (build is static either way).

## Notes
- No prices anywhere by design — all price talk happens on WhatsApp.
- Hero scrubs a 114-frame sequence on desktop; mobile shows `public/hero-poster.jpg`.
- Gallery filenames + `FRAME_COUNT` live in `lib/gallery.ts`; update if photos change.
