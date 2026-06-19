# Alpha Ocean Hub — Website Design Spec

**Date:** 2026-06-19
**Status:** Approved direction, pending spec review
**Owner:** Piyush (SMARK8ING / Daily Mark8ing)

## 1. Overview

Alpha Ocean Hub is a surf school and board-rental operation in **Weligama, South Coast Sri Lanka** (Instagram: [@alphaoceanhub](https://www.instagram.com/alphaoceanhub/), tagged as a "Surfing Spot"). The business does two things: **surf lessons** (beginner-friendly, group & private) and **board rentals**, sold on a "surf, sunset & salty vibes" lifestyle.

This spec defines a **single-page, motion-forward marketing website** whose only conversion action is **WhatsApp** (no on-site pricing, no booking backend).

### Goals
- A "very cool looking," cinematic, immersive site that feels like being in the water.
- Drive every visitor to WhatsApp to enquire/book.
- Showcase the real surf photography supplied by the owner.

### Non-goals (YAGNI)
- No on-site prices (explicitly excluded — WhatsApp handles pricing conversations).
- No booking calendar, payments, accounts, or CMS.
- No multi-page routing — one long scroll.

## 2. Deliverable & Tech Stack

- **Next.js** (App Router) with **static export** (`output: 'export'`) — same proven stack as Ommi Forge / Mountwood, deployable as static files.
- **Tailwind CSS** for styling.
- **Framer Motion** for scroll-reveals and micro-interactions.
- **Lenis** for smooth scrolling.
- **Scroll-scrub hero:** a canvas-based image-sequence scrubbed on scroll (the Ommi Forge technique). Frames extracted from `assets/Video-533.mp4` (a wave-ride clip) — target ~60–100 frames. Mobile falls back to a static hero image for performance/battery (per the project mobile-pin policy).
- **Deploy target:** TBD — Hostinger static hosting OR Pi + Tailscale Funnel. Build output is static either way.

## 3. Page Structure (single long scroll)

1. **Hero** — full-screen wave (scroll-scrub on desktop, static image on mobile). Logo top-left. Headline "RIDE YOUR FIRST WAVE", sub "Weligama, Sri Lanka". Primary `Book on WhatsApp` button. Scroll cue.
2. **The Vibe** — short manifesto: *"Not just surfing. It's a lifestyle."* / *"Surf, sunset & salty vibes."* Scroll-reveal text over ocean imagery.
3. **Surf Lessons** — beginner-friendly framing, what's included (board, rashguard, instructor), group & private. CTA → WhatsApp ("Hi Alpha Ocean Hub! I'd like to book a surf lesson 🏄").
4. **Board Rentals** — soft-tops and boards, beach pickup. CTA → WhatsApp ("Hi! I'd like to rent a board 🏄").
5. **Why Alpha Ocean Hub** — 3–4 feature cards: beginner-friendly guarantee, local expert instructor, golden-hour sessions, all gear included.
6. **Gallery** — masonry/marquee of real surf photos with subtle parallax.
7. **Where We Are** — Weligama bay, embedded map, hours.
8. **Booking CTA** — large closing block: `Message us on WhatsApp` + Instagram link (@alphaoceanhub). Note: *"Message us for prices & availability."*
9. **Footer** — logo, socials, tagline "Surf Beach. Chill."

## 4. WhatsApp Integration

- All CTAs are `https://wa.me/<NUMBER>?text=<prefilled message>` links (URL-encoded).
- **No prices shown anywhere on the site.** Price/availability CTAs read "Message us for prices" and route to WhatsApp.
- `<NUMBER>` supplied by owner — stubbed as a single config constant (`WHATSAPP_NUMBER`) until provided, so it's a one-line change.

## 5. Brand System (derived from logo)

| Token | Hex | Use |
|-------|-----|-----|
| Navy (deep) | `#0B3A5B` | text, dark sections |
| Cyan | `#2BA8E0` | primary accent, links |
| Sun Coral → Gold | `#F58A3C` → `#F5C242` | gradient accents, sun motif |
| Surf Green | `#3DBE8B` | secondary accent (surfboard) |
| Sand | `#F7F3EC` | light backgrounds |

- **Type:** bold condensed display for oversized cinematic headlines + clean sans (e.g. Inter) for body. Logo's script style ("Surf Beach. Chill") used sparingly as an accent.
- **Motion budget (deliberate, not stacked):** scroll-scrub hero, scroll-reveals, one parallax gallery, button hover micro-interactions. Avoid 10 stacked effects ("restraint over stacking").

## 6. Assets (in repo)

- `assets/brand/logo-source.png` — logo (needs background removal / SVG recreation for clean use).
- `assets/photos/` — 16 images: instructor riding-wave action shots (IMG_2921/2931/8611 etc.), group lesson shots, board portrait, lesson stills.
- `assets/Video-533.mp4` — source clip for the hero frame sequence.

## 7. Open Items (to confirm)

- **WhatsApp number** — owner to supply (stubbed until then).
- **Deploy target** — Hostinger vs Pi+Tailscale.
- **Logo asset** — recreate as transparent PNG/SVG from the source screenshot for crisp rendering.
- **Map/hours** — exact Weligama location pin + opening hours.

## 8. Success Criteria

- Loads fast (static export, optimized images).
- Hero scroll-scrub is smooth on desktop; graceful static fallback on mobile.
- Every section has a clear WhatsApp path; zero prices on page.
- Reads as a cinematic, premium surf brand — not a template.
