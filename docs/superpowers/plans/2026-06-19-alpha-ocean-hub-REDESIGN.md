# Alpha Ocean Hub — REDESIGN Plan (v2)

> Replaces the v1 build, which looked amateurish. Grounded in research of the best
> surf-school sites (Lapoint, Dreamsea, Sansara, Rip Curl, Cleanline).

## What went wrong in v1 (fix these)

1. **Hero used the wrong asset.** `Video-533.mp4` is a Mahjong reel, not surf. We have
   NO surf video — only stills. → Kill the scroll-scrub. Hero becomes a cinematic
   photo treatment.
2. **Logo didn't fit.** The source is a logo inside a white circle; it clashed on the
   navy nav. → Produce a transparent-background logo + a white "knockout" version for
   dark sections.
3. **Childish styling.** Emoji bullets (🏄🌊🧒), flat full-screen navy blocks, generic
   bordered cards, cramped spacing. → Editorial, photography-led, no emoji.

## Design principles (from research)

- **Let the photos breathe.** Full-bleed imagery, minimal text over it, image tells the
  story. Stop competing with flat color blocks.
- **Palette discipline.** Sandy/cream base (`#F7F3EC`), deep ocean navy for text
  (`#0B3A5B`), ONE warm accent (sunset coral `#F58A3C`) used sparingly. Cyan/green only
  as micro-accents. ~80% of the page is cream + photography.
- **Editorial rhythm.** Generous whitespace, big type, alternating image/text, full-bleed
  photo "breaks" between content blocks.
- **Type.** Display: Anton or Bebas Neue (condensed, surf-poster energy) at large scale
  with tight leading + letter-spacing. Body: Inter, 16px+, relaxed line-height. Optional
  handwritten accent (Caveat) for the "Surf Beach. Chill" tagline echoing the logo.
- **Motion, restrained (2–3 beats):** Lenis smooth scroll, slow Ken Burns zoom on hero,
  scroll-reveals, ONE parallax photo break, a subtle word marquee. No stacking.

## New hero (no video)

**Option chosen: cinematic cross-fade.** Full-screen stack of the 3 strongest riding
shots (`img-2931`, `img-8611`, `img-2921`), each with a slow Ken Burns zoom, cross-fading
every ~5s. Dark bottom gradient scrim for legibility. Overlay: small location kicker,
huge "RIDE YOUR FIRST WAVE", one-line subhead, single coral WhatsApp button, scroll cue.
Mobile: same, single image (no crossfade loop) for battery. This needs no video and looks
premium with the assets we have.

## Logo treatment

- Generate `public/logo-mark.png` (transparent, white circle removed) and
  `public/logo-white.png` (knockout for dark backgrounds) from `assets/brand/logo-source.png`.
- Nav: white-knockout logo (mark + wordmark) at ~150px, left.
- Footer: full-color logo on cream, or white logo on navy footer.
- If background removal is imperfect, fall back to the mark only + a text wordmark set in
  the display font (cleaner than a haloed PNG).

## Page structure (v2)

1. **Hero** — cross-fade cinematic (above).
2. **Intro / marquee** — cream. A short editorial line ("Surf. Sunset. Salty vibes.")
   + a slow horizontal marquee of words (SURF · LEARN · RENT · CHILL · WELIGAMA) in
   outlined display type. One refined motion beat.
3. **Lessons** — editorial split: oversized number "01", heading, tight copy, a clean
   feature list (custom check icons, NO emoji), coral CTA. Large photo, full-height,
   slightly overlapping the text column.
4. **Full-bleed photo break #1** — a wide action shot, parallax, with a short pull-quote
   ("Not just surfing. It's a lifestyle.") in white.
5. **Rentals** — editorial split mirrored ("02"). Boards photo.
6. **Why Alpha Ocean Hub** — 4 columns, icon (line SVG, not emoji) + title + one line.
   Thin dividers, no boxy borders. Cream.
7. **Gallery** — refined asymmetric grid / masonry of the real shots, subtle parallax,
   hover zoom, rounded-none full-bleed feel.
8. **Full-bleed photo break #2** — sunset shot + "Weligama, Sri Lanka" overlaid.
9. **Location** — map + short copy, minimal.
10. **Booking CTA** — full-bleed surf photo + dark scrim, "Ready to paddle out?",
    WhatsApp + Instagram. "Message us for prices & availability."
11. **Footer** — logo, tagline, socials, credit.

## Component changes (concrete)

- `components/Hero.tsx` → rewrite to `CrossfadeHero` (Ken Burns + crossfade); delete
  canvas/scrub logic and the `framePath`/`FRAME_COUNT` usage. Remove `public/frames/`.
- New `components/Marquee.tsx` (CSS/Framer marquee).
- New `components/PhotoBreak.tsx` (full-bleed parallax image + optional quote) — reused twice.
- New `components/Icon.tsx` — small set of line icons (wave, board, sun, instructor) as
  inline SVG to replace emoji.
- `Lessons.tsx` / `Rentals.tsx` → editorial split with big section numbers, icon lists,
  overlapping image, tighter type scale.
- `WhyUs.tsx` → divider columns with line icons, no card borders.
- `Gallery.tsx` → asymmetric grid, better aspect ratios.
- `Nav.tsx` → white-knockout logo, refined spacing, hide CTA until scrolled past hero
  (or keep but restyle to coral outline).
- `tailwind.config.ts` → add display font (Anton) + Caveat accent; keep palette.
- `app/globals.css` → type scale, selection color, smoother defaults.
- Delete `scripts/extract-frames.sh` reliance; `lib/gallery.ts` loses FRAME_COUNT.

## Assets to regenerate

- Remove white background from logo → `public/logo-mark.png`, `public/logo-white.png`.
- Pick a genuine sunset/golden-hour shot for the photo breaks (from `public/photos`).
- Re-pick the 3 best hero stills (sharp, well-composed riding shots).
- `public/hero-poster.jpg` / `og.jpg` → regenerate from a real surf photo (currently the
  Mahjong frame — must be replaced).

## Out of scope (unchanged)

- WhatsApp-only conversion, no prices.
- Next.js static export, Tailwind, Framer Motion, Lenis.
- Single page.

## Acceptance

- Zero emoji; zero flat full-screen navy blocks; photography-led.
- Hero is real surf imagery with Ken Burns + crossfade, no Mahjong, no magenta.
- Logo sits cleanly (knockout on dark, full-color on light), no white halo.
- Reads as a premium surf brand comparable to Lapoint/Dreamsea, not a template.
