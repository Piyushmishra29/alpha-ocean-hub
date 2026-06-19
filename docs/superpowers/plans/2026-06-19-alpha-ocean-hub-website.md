# Alpha Ocean Hub Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, cinematic, motion-forward marketing website for Alpha Ocean Hub (Weligama surf school) whose only conversion action is WhatsApp.

**Architecture:** Next.js App Router with static export. One page composed of section components. A canvas-based scroll-scrub hero plays a wave-ride image sequence on desktop and falls back to a static image on mobile. Smooth scrolling via Lenis; scroll-reveals and micro-interactions via Framer Motion. All CTAs are `wa.me` deep links built from one config constant. No prices anywhere.

**Tech Stack:** Next.js 15 (App Router, `output: 'export'`), TypeScript, Tailwind CSS 3.4, Framer Motion, Lenis, Vitest (logic tests), ffmpeg (frame extraction), sharp (image optimization).

## Global Constraints

- **No prices on the site, ever.** Price/availability CTAs read "Message us for prices" and route to WhatsApp. (Spec §4, owner-explicit.)
- **WhatsApp-only conversion.** All CTAs are `https://wa.me/<NUMBER>?text=<urlencoded>`; `<NUMBER>` lives in ONE constant `WHATSAPP_NUMBER` in `lib/site.ts`, stubbed as `"94000000000"` until owner supplies it.
- **Static export** — must build with `next build` producing `out/` (no server runtime). `next.config.mjs` sets `output: 'export'` and `images.unoptimized: true`.
- **Brand palette (exact):** Navy `#0B3A5B`, Cyan `#2BA8E0`, Sun coral `#F58A3C`, Sun gold `#F5C242`, Surf green `#3DBE8B`, Sand `#F7F3EC`.
- **Motion restraint:** scroll-scrub hero, scroll-reveals, ONE parallax gallery, button hover micro-interactions. No stacked effects.
- **Mobile:** hero uses a static image (not the canvas sequence) for performance/battery.
- **Instagram:** `https://www.instagram.com/alphaoceanhub/`. **Location:** Weligama, Sri Lanka. **Tagline:** "Surf Beach. Chill."

---

### Task 1: Scaffold Next.js project + brand theme + smooth scroll

**Files:**
- Create: `package.json`, `next.config.mjs`, `tsconfig.json`, `postcss.config.mjs`, `tailwind.config.ts`, `.eslintrc.json`
- Create: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- Create: `components/SmoothScroll.tsx`

**Interfaces:**
- Produces: `<SmoothScroll>` client wrapper (Lenis provider). Tailwind theme tokens: `navy`, `cyan`, `sun`, `gold`, `green`, `sand`. Font CSS vars `--font-display`, `--font-sans`.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "alpha-ocean-hub",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "frames": "bash scripts/extract-frames.sh",
    "optimize": "node scripts/optimize-photos.mjs"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "framer-motion": "^11.3.0",
    "lenis": "^1.1.0"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "@types/node": "^20.14.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^15.0.0",
    "vitest": "^2.0.0",
    "sharp": "^0.33.0"
  }
}
```

- [ ] **Step 2: Create `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create `postcss.config.mjs`**

```js
export default { plugins: { tailwindcss: {}, autoprefixer: {} } };
```

- [ ] **Step 5: Create `tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0B3A5B",
        cyan: "#2BA8E0",
        sun: "#F58A3C",
        gold: "#F5C242",
        green: "#3DBE8B",
        sand: "#F7F3EC",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 6: Create `.eslintrc.json`**

```json
{ "extends": "next/core-web-vitals" }
```

- [ ] **Step 7: Create `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html { scroll-behavior: auto; }
body { @apply bg-sand text-navy font-sans antialiased; }

/* Lenis */
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-stopped { overflow: hidden; }
```

- [ ] **Step 8: Create `components/SmoothScroll.tsx`**

```tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return <>{children}</>;
}
```

- [ ] **Step 9: Create `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const display = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Alpha Ocean Hub — Surf School & Board Rentals, Weligama Sri Lanka",
  description:
    "Learn to surf in Weligama, Sri Lanka. Beginner-friendly surf lessons and board rentals. Surf, sunset & salty vibes. Book on WhatsApp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
```

- [ ] **Step 10: Create placeholder `app/page.tsx`**

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="font-display text-6xl text-navy">ALPHA OCEAN HUB</h1>
    </main>
  );
}
```

- [ ] **Step 11: Install and run dev server to verify scaffold**

Run: `npm install && npm run dev`
Expected: Dev server starts on `http://localhost:3000`; page shows "ALPHA OCEAN HUB" in Bebas Neue on sand background, no console errors.

- [ ] **Step 12: Verify static export builds**

Run: `npm run build`
Expected: Build succeeds and produces an `out/` directory.

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js static-export project with brand theme + Lenis smooth scroll"
```

---

### Task 2: Site config + WhatsApp link helper (TDD)

**Files:**
- Create: `lib/site.ts`
- Create: `lib/whatsapp.ts`
- Test: `lib/whatsapp.test.ts`
- Create: `vitest.config.ts`

**Interfaces:**
- Produces: `SITE` config object; `waLink(message: string): string` returning a `https://wa.me/<number>?text=<encoded>` URL. Used by every CTA in later tasks.

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
export default defineConfig({ test: { environment: "node" } });
```

- [ ] **Step 2: Write the failing test `lib/whatsapp.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { waLink } from "./whatsapp";
import { SITE } from "./site";

describe("waLink", () => {
  it("builds a wa.me url with the site number", () => {
    expect(waLink("hi")).toContain(`https://wa.me/${SITE.whatsappNumber}`);
  });
  it("url-encodes the message text", () => {
    const url = waLink("I'd like a lesson 🏄");
    expect(url).toContain("text=I'd%20like%20a%20lesson%20%F0%9F%8F%84");
  });
  it("has no spaces in the final url", () => {
    expect(waLink("a b c").includes(" ")).toBe(false);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `./whatsapp` / `./site`.

- [ ] **Step 4: Create `lib/site.ts`**

```ts
export const SITE = {
  name: "Alpha Ocean Hub",
  tagline: "Surf Beach. Chill.",
  location: "Weligama, Sri Lanka",
  instagram: "https://www.instagram.com/alphaoceanhub/",
  instagramHandle: "@alphaoceanhub",
  // Stub until owner supplies real number. Digits only, country code first, no '+'.
  whatsappNumber: "94000000000",
  // Weligama bay Google Maps embed (place search).
  mapEmbed:
    "https://www.google.com/maps?q=Weligama%20Beach%20Sri%20Lanka&output=embed",
} as const;
```

- [ ] **Step 5: Create `lib/whatsapp.ts`**

```ts
import { SITE } from "./site";

export function waLink(message: string): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${SITE.whatsappNumber}?text=${text}`;
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npm test`
Expected: PASS (3 tests).

- [ ] **Step 7: Commit**

```bash
git add lib/ vitest.config.ts
git commit -m "feat: add site config and tested WhatsApp link helper"
```

---

### Task 3: Process assets — optimize photos, extract hero frames, place logo

**Files:**
- Create: `scripts/optimize-photos.mjs`
- Create: `scripts/extract-frames.sh`
- Create: `public/photos/*` (generated, web-optimized)
- Create: `public/frames/*` (generated hero sequence)
- Create: `public/logo.png`, `public/hero-poster.jpg`
- Create: `lib/gallery.ts`

**Interfaces:**
- Produces: web-ready images in `public/photos/`, a numbered frame sequence `public/frames/frame_0001.jpg …`, `FRAME_COUNT` constant, and `GALLERY` array of `{ src, alt }` consumed by the Gallery task. `public/hero-poster.jpg` (a single strong wave still) consumed by the Hero task as the mobile fallback / poster.

- [ ] **Step 1: Create `scripts/optimize-photos.mjs`**

```js
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "assets/photos";
const OUT = "public/photos";

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f));

for (const file of files) {
  const base = path.parse(file).name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  await sharp(path.join(SRC, file))
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUT, `${base}.jpg`));
  console.log("optimized", base);
}
console.log("done:", files.length, "photos");
```

- [ ] **Step 2: Run photo optimization**

Run: `npm run optimize`
Expected: `public/photos/` populated with optimized `.jpg` files (one per source image); console prints "done: N photos".

- [ ] **Step 3: Create `scripts/extract-frames.sh`**

```bash
#!/usr/bin/env bash
set -euo pipefail
SRC="assets/Video-533.mp4"
OUT="public/frames"
mkdir -p "$OUT"
# Extract ~90 frames, scaled to 1280 wide, sequential numbering.
ffmpeg -y -i "$SRC" -vf "fps=15,scale=1280:-2" -q:v 4 "$OUT/frame_%04d.jpg"
COUNT=$(ls "$OUT" | wc -l | tr -d ' ')
echo "extracted $COUNT frames"
# Use a mid-sequence frame as the static poster / mobile fallback.
MID=$(printf "frame_%04d.jpg" $(( COUNT / 2 )))
cp "$OUT/$MID" public/hero-poster.jpg
echo "poster: $MID"
```

- [ ] **Step 4: Run frame extraction**

Run: `npm run frames`
Expected: `public/frames/frame_0001.jpg …` created; `public/hero-poster.jpg` written; console prints frame count. (If `ffmpeg` is missing: `brew install ffmpeg` then re-run.)

- [ ] **Step 5: Create the logo file**

Copy the source logo into `public/` for now (a clean transparent SVG/PNG can replace it later without code changes):

```bash
cp assets/brand/logo-source.png public/logo.png
```

Expected: `public/logo.png` exists.

- [ ] **Step 6: Create `lib/gallery.ts`** — list the optimized photos to feature (use the actual filenames produced in Step 2; the riding-wave action shots first).

```ts
// Update the filenames below to match what scripts/optimize-photos.mjs produced
// in public/photos/ (run `ls public/photos`). Action shots first.
export const GALLERY: { src: string; alt: string }[] = [
  { src: "/photos/img-2931.jpg", alt: "Surfer riding a wave at Weligama" },
  { src: "/photos/img-8611.jpg", alt: "Carving a clean wave face" },
  { src: "/photos/img-2921.jpg", alt: "Walking the board on a small wave" },
  { src: "/photos/group-lesson.jpg", alt: "Group surf lesson on the beach" },
  { src: "/photos/board-portrait.jpg", alt: "Students with their boards" },
  { src: "/photos/img-7207.jpg", alt: "Sunset surf session" },
];

// Set this from `ls public/frames | wc -l`.
export const FRAME_COUNT = 90;
export const framePath = (i: number) =>
  `/frames/frame_${String(i).padStart(4, "0")}.jpg`;
```

- [ ] **Step 7: Verify the referenced files exist**

Run: `ls public/photos public/frames public/logo.png public/hero-poster.jpg`
Expected: All listed paths exist. Adjust `GALLERY` filenames and `FRAME_COUNT` in `lib/gallery.ts` to match the actual output.

- [ ] **Step 8: Commit**

```bash
git add scripts/ lib/gallery.ts public/photos public/frames public/logo.png public/hero-poster.jpg
git commit -m "chore: optimize photos, extract hero frame sequence, add logo + gallery manifest"
```

---

### Task 4: Shared UI — Reveal wrapper, WhatsApp button, top Nav

**Files:**
- Create: `components/Reveal.tsx`
- Create: `components/WhatsAppButton.tsx`
- Create: `components/Nav.tsx`

**Interfaces:**
- Consumes: `waLink` (Task 2), `SITE` (Task 2).
- Produces: `<Reveal>` (fade/slide-up on scroll into view), `<WhatsAppButton message variant>` (primary/light/ghost), `<Nav>` (fixed transparent → solid on scroll, logo + WhatsApp CTA).

- [ ] **Step 1: Create `components/Reveal.tsx`**

```tsx
"use client";
import { motion } from "framer-motion";

export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create `components/WhatsAppButton.tsx`**

```tsx
"use client";
import { waLink } from "@/lib/whatsapp";

type Variant = "primary" | "light" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-green text-white hover:bg-[#2fa376]",
  light: "bg-white text-navy hover:bg-sand",
  ghost: "bg-white/10 text-white ring-1 ring-white/40 backdrop-blur hover:bg-white/20",
};

export default function WhatsAppButton({
  message,
  children,
  variant = "primary",
  className = "",
}: {
  message: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${styles[variant]} ${className}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 fill-current">
        <path d="M12 2a10 10 0 0 0-8.6 15.07L2 22l5.06-1.33A10 10 0 1 0 12 2Zm5.3 14.2c-.22.62-1.3 1.2-1.8 1.24-.46.04-.9.2-3.04-.64-2.57-1-4.2-3.6-4.33-3.77-.13-.17-1.04-1.38-1.04-2.64 0-1.26.66-1.88.9-2.14a.94.94 0 0 1 .68-.32c.17 0 .34 0 .49.01.16.01.37-.06.58.44.22.52.74 1.8.8 1.93.07.13.11.28.02.45-.09.17-.13.28-.26.43-.13.15-.27.34-.39.46-.13.13-.26.27-.11.53.15.26.66 1.09 1.42 1.77.98.87 1.8 1.14 2.06 1.27.26.13.41.11.56-.07.15-.17.64-.75.81-1.01.17-.26.34-.22.58-.13.24.09 1.5.71 1.76.84.26.13.43.19.49.3.06.1.06.62-.16 1.24Z" />
      </svg>
      {children}
    </a>
  );
}
```

- [ ] **Step 3: Create `components/Nav.tsx`**

```tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import WhatsAppButton from "./WhatsAppButton";

export default function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-navy/90 backdrop-blur shadow-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Image src="/logo.png" alt="Alpha Ocean Hub" width={140} height={48} className="h-10 w-auto" priority />
        <WhatsAppButton message="Hi Alpha Ocean Hub! I'd like to know about surf lessons & rentals." variant="ghost" className="!px-5 !py-2.5">
          Book Now
        </WhatsAppButton>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 5: Commit**

```bash
git add components/Reveal.tsx components/WhatsAppButton.tsx components/Nav.tsx
git commit -m "feat: shared Reveal, WhatsAppButton, and scroll-aware Nav components"
```

---

### Task 5: Hero with scroll-scrub image sequence + mobile fallback

**Files:**
- Create: `components/Hero.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `FRAME_COUNT`, `framePath` (Task 3), `SITE` (Task 2), `WhatsAppButton` (Task 4).
- Produces: `<Hero>` — full-viewport section. Desktop: a `position: sticky` canvas scrubbed across a tall scroll track using `useScroll`/`framer-motion`, preloading frames. Mobile (`< 768px`): static `hero-poster.jpg` background, no canvas.

- [ ] **Step 1: Create `components/Hero.tsx`**

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { FRAME_COUNT, framePath } from "@/lib/gallery";
import { SITE } from "@/lib/site";
import WhatsAppButton from "./WhatsAppButton";

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

function ScrubCanvas() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const frame = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

  useEffect(() => {
    images.current = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image();
      img.src = framePath(i + 1);
      return img;
    });
  }, []);

  useEffect(() => {
    const render = (v: number) => {
      const canvas = canvasRef.current;
      const img = images.current[Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(v) - 1))];
      if (!canvas || !img || !img.complete || !img.naturalWidth) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const { width, height } = canvas;
      const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, (width - w) / 2, (height - h) / 2, w, h);
    };
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(frame.get());
    };
    resize();
    window.addEventListener("resize", resize);
    const unsub = frame.on("change", render);
    return () => {
      window.removeEventListener("resize", resize);
      unsub();
    };
  }, [frame]);

  return (
    <div ref={trackRef} className="relative h-[280vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy/70" />
        <HeroCopy />
      </div>
    </div>
  );
}

function HeroCopy() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center text-white">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gold"
      >
        {SITE.location}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35 }}
        className="font-display text-6xl leading-[0.9] sm:text-8xl md:text-9xl"
      >
        Ride Your<br />First Wave
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.6 }}
        className="mt-5 max-w-md text-base text-white/85 sm:text-lg"
      >
        Surf, sunset &amp; salty vibes on the south coast of Sri Lanka.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.8 }}
        className="mt-8"
      >
        <WhatsAppButton
          variant="primary"
          message="Hi Alpha Ocean Hub! I'd like to book a surf session. 🏄"
        >
          Book on WhatsApp
        </WhatsAppButton>
      </motion.div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-xs uppercase tracking-widest text-white/70">
        Scroll
      </div>
    </div>
  );
}

function StaticHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <img src="/hero-poster.jpg" alt="Surfing in Weligama" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy/70" />
      <HeroCopy />
    </section>
  );
}

export default function Hero() {
  const mobile = useIsMobile();
  return mobile ? <StaticHero /> : <ScrubCanvas />;
}
```

- [ ] **Step 2: Wire Hero into `app/page.tsx`**

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Run dev and verify the scrub**

Run: `npm run dev`
Expected: On desktop, scrolling through the hero advances the wave frames smoothly while copy stays pinned; resizing keeps the image filling the viewport. Throttle to a mobile viewport (< 768px) and confirm it shows the static poster instead. No console errors.

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx app/page.tsx
git commit -m "feat: scroll-scrub canvas hero with mobile static fallback"
```

---

### Task 6: Vibe + Lessons + Rentals content sections

**Files:**
- Create: `components/Vibe.tsx`
- Create: `components/Lessons.tsx`
- Create: `components/Rentals.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 4), `WhatsAppButton` (Task 4), optimized photos (Task 3).
- Produces: three `<section>` components added to the page in order.

- [ ] **Step 1: Create `components/Vibe.tsx`**

```tsx
import Reveal from "./Reveal";

export default function Vibe() {
  return (
    <section className="bg-navy px-6 py-28 text-center text-white">
      <Reveal>
        <p className="mx-auto max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
          Not just surfing.<br />
          <span className="text-gold">It&apos;s a lifestyle.</span>
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mx-auto mt-6 max-w-xl text-white/75">
          Whether it&apos;s your first time on a board or your hundredth wave, Alpha Ocean
          Hub is your home break in Weligama — good vibes, warm water, and a crew that
          has your back.
        </p>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/Lessons.tsx`**

```tsx
import Reveal from "./Reveal";
import WhatsAppButton from "./WhatsAppButton";

export default function Lessons() {
  return (
    <section id="lessons" className="grid gap-10 px-6 py-24 md:grid-cols-2 md:items-center md:gap-16 md:px-12">
      <Reveal className="order-2 md:order-1">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan">Surf Lessons</p>
        <h2 className="mt-3 font-display text-5xl text-navy sm:text-6xl">Learn from local legends</h2>
        <p className="mt-5 max-w-md text-navy/75">
          Beginner-friendly, small groups and private sessions with patient local
          instructors who grew up on these waves. Soft-top board, rashguard, and all
          the gear included — just bring yourself.
        </p>
        <ul className="mt-6 space-y-2 text-navy/80">
          <li>🏄 Group &amp; private lessons</li>
          <li>🌊 Beginner to intermediate</li>
          <li>🧒 Kids welcome</li>
          <li>📸 Photos of your session</li>
        </ul>
        <div className="mt-8">
          <WhatsAppButton message="Hi Alpha Ocean Hub! I'd like to book a surf lesson. 🏄">
            Book a Lesson
          </WhatsAppButton>
        </div>
      </Reveal>
      <Reveal delay={0.1} className="order-1 md:order-2">
        <img src="/photos/group-lesson.jpg" alt="Surf lesson on Weligama beach" className="aspect-[4/5] w-full rounded-3xl object-cover shadow-xl" />
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 3: Create `components/Rentals.tsx`**

```tsx
import Reveal from "./Reveal";
import WhatsAppButton from "./WhatsAppButton";

export default function Rentals() {
  return (
    <section id="rentals" className="grid gap-10 bg-sand px-6 py-24 md:grid-cols-2 md:items-center md:gap-16 md:px-12">
      <Reveal>
        <img src="/photos/board-portrait.jpg" alt="Surfboards ready to rent" className="aspect-[4/5] w-full rounded-3xl object-cover shadow-xl" />
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sun">Board Rentals</p>
        <h2 className="mt-3 font-display text-5xl text-navy sm:text-6xl">Grab a board, hit the water</h2>
        <p className="mt-5 max-w-md text-navy/75">
          A full quiver of soft-tops and hard boards for every level, ready at the
          beach. Hourly or daily — paddle out whenever the waves are calling.
        </p>
        <ul className="mt-6 space-y-2 text-navy/80">
          <li>🛹 Soft-tops &amp; hard boards</li>
          <li>⏱️ Hourly &amp; daily</li>
          <li>📍 Pickup right on Weligama beach</li>
        </ul>
        <div className="mt-8">
          <WhatsAppButton variant="primary" message="Hi Alpha Ocean Hub! I'd like to rent a board. 🏄">
            Rent a Board
          </WhatsAppButton>
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 4: Add sections to `app/page.tsx`**

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Vibe from "@/components/Vibe";
import Lessons from "@/components/Lessons";
import Rentals from "@/components/Rentals";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Vibe />
        <Lessons />
        <Rentals />
      </main>
    </>
  );
}
```

- [ ] **Step 5: Run dev and verify**

Run: `npm run dev`
Expected: Vibe (navy), Lessons (white, image right), Rentals (sand, image left) render with scroll-reveals; CTA buttons open WhatsApp; images load. No console errors.

- [ ] **Step 6: Commit**

```bash
git add components/Vibe.tsx components/Lessons.tsx components/Rentals.tsx app/page.tsx
git commit -m "feat: vibe, lessons, and rentals sections"
```

---

### Task 7: Why Us + Gallery (parallax) + Location sections

**Files:**
- Create: `components/WhyUs.tsx`
- Create: `components/Gallery.tsx`
- Create: `components/Location.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 4), `GALLERY` (Task 3), `SITE` (Task 2).
- Produces: three `<section>` components. Gallery uses ONE parallax effect (the single allowed parallax per Global Constraints).

- [ ] **Step 1: Create `components/WhyUs.tsx`**

```tsx
import Reveal from "./Reveal";

const FEATURES = [
  { icon: "🌱", title: "Beginner-friendly", body: "Stand up on your first session — that's the promise. Patient coaching, safe waves." },
  { icon: "🧭", title: "Local experts", body: "Born-and-raised instructors who know every break and tide in Weligama bay." },
  { icon: "🌅", title: "Golden-hour sessions", body: "Sunrise glass and sunset glow — we surf when the ocean looks its best." },
  { icon: "🎒", title: "All gear included", body: "Boards, rashguards, leashes — everything's ready. Just show up and surf." },
];

export default function WhyUs() {
  return (
    <section className="px-6 py-24 md:px-12">
      <Reveal>
        <h2 className="text-center font-display text-5xl text-navy sm:text-6xl">Why Alpha Ocean Hub</h2>
      </Reveal>
      <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.08}>
            <div className="h-full rounded-3xl border border-navy/10 bg-white p-7 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="text-4xl">{f.icon}</div>
              <h3 className="mt-4 font-display text-2xl text-navy">{f.title}</h3>
              <p className="mt-2 text-sm text-navy/70">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/Gallery.tsx`** (single parallax effect)

```tsx
"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { GALLERY } from "@/lib/gallery";

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={ref} className="overflow-hidden bg-navy px-6 py-24">
      <h2 className="mb-12 text-center font-display text-5xl text-white sm:text-6xl">In the water</h2>
      <motion.div style={{ y }} className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-3">
        {GALLERY.map((g, i) => (
          <div
            key={g.src}
            className={`overflow-hidden rounded-2xl ${i % 5 === 0 ? "row-span-2" : ""}`}
          >
            <img
              src={g.src}
              alt={g.alt}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 3: Create `components/Location.tsx`**

```tsx
import Reveal from "./Reveal";
import { SITE } from "@/lib/site";

export default function Location() {
  return (
    <section id="location" className="grid gap-10 px-6 py-24 md:grid-cols-2 md:items-center md:gap-16 md:px-12">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan">Find us</p>
        <h2 className="mt-3 font-display text-5xl text-navy sm:text-6xl">Weligama Bay</h2>
        <p className="mt-5 max-w-md text-navy/75">
          On the south coast of Sri Lanka — the friendliest beginner wave on the island,
          with a long sandy bay and warm water all year round. Come find us on the beach.
        </p>
        <p className="mt-4 font-semibold text-navy">{SITE.location}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <iframe
          title="Weligama map"
          src={SITE.mapEmbed}
          className="aspect-[4/3] w-full rounded-3xl border-0 shadow-xl"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 4: Add sections to `app/page.tsx`** (between Rentals and the closing tags)

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Vibe from "@/components/Vibe";
import Lessons from "@/components/Lessons";
import Rentals from "@/components/Rentals";
import WhyUs from "@/components/WhyUs";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Vibe />
        <Lessons />
        <Rentals />
        <WhyUs />
        <Gallery />
        <Location />
      </main>
    </>
  );
}
```

- [ ] **Step 5: Run dev and verify**

Run: `npm run dev`
Expected: WhyUs cards lift on hover; Gallery grid drifts subtly (parallax) on scroll and images zoom on hover; Location map embed loads. No console errors.

- [ ] **Step 6: Commit**

```bash
git add components/WhyUs.tsx components/Gallery.tsx components/Location.tsx app/page.tsx
git commit -m "feat: why-us, parallax gallery, and location sections"
```

---

### Task 8: Booking CTA + Footer, final assembly, SEO + export verification

**Files:**
- Create: `components/BookingCTA.tsx`
- Create: `components/Footer.tsx`
- Modify: `app/page.tsx`
- Create: `app/icon.png` (favicon), `public/og.jpg`
- Modify: `app/layout.tsx` (Open Graph metadata)

**Interfaces:**
- Consumes: `WhatsAppButton` (Task 4), `SITE` (Task 2).
- Produces: closing CTA section + footer; complete page; static export verified.

- [ ] **Step 1: Create `components/BookingCTA.tsx`**

```tsx
import WhatsAppButton from "./WhatsAppButton";
import { SITE } from "@/lib/site";

export default function BookingCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-28 text-center">
      <img src="/hero-poster.jpg" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-navy/80" />
      <div className="relative z-10 mx-auto max-w-2xl text-white">
        <h2 className="font-display text-5xl sm:text-7xl">Ready to paddle out?</h2>
        <p className="mx-auto mt-5 max-w-md text-white/85">
          Message us on WhatsApp for prices &amp; availability — we&apos;ll get you on a
          wave. Surf. Beach. Chill.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <WhatsAppButton variant="primary" message="Hi Alpha Ocean Hub! I'd like to know about lessons, rentals, prices & availability. 🏄">
            Message us on WhatsApp
          </WhatsAppButton>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-white ring-1 ring-white/40 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/20"
          >
            {SITE.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/Footer.tsx`**

```tsx
import Image from "next/image";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-navy px-6 py-12 text-center text-white/80">
      <Image src="/logo.png" alt="Alpha Ocean Hub" width={160} height={56} className="mx-auto h-12 w-auto" />
      <p className="mt-4 font-display text-2xl text-gold">{SITE.tagline}</p>
      <p className="mt-2 text-sm">{SITE.location}</p>
      <div className="mt-4 flex justify-center gap-5 text-sm">
        <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">
          Instagram
        </a>
      </div>
      <p className="mt-6 text-xs text-white/50">© {SITE.name}. All rights reserved.</p>
    </footer>
  );
}
```

- [ ] **Step 3: Finalize `app/page.tsx`**

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Vibe from "@/components/Vibe";
import Lessons from "@/components/Lessons";
import Rentals from "@/components/Rentals";
import WhyUs from "@/components/WhyUs";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import BookingCTA from "@/components/BookingCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Vibe />
        <Lessons />
        <Rentals />
        <WhyUs />
        <Gallery />
        <Location />
        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Add favicon + OG image**

```bash
cp public/logo.png app/icon.png
cp public/hero-poster.jpg public/og.jpg
```

- [ ] **Step 5: Add Open Graph metadata in `app/layout.tsx`** — replace the `metadata` export with:

```tsx
export const metadata: Metadata = {
  title: "Alpha Ocean Hub — Surf School & Board Rentals, Weligama Sri Lanka",
  description:
    "Learn to surf in Weligama, Sri Lanka. Beginner-friendly surf lessons and board rentals. Surf, sunset & salty vibes. Book on WhatsApp.",
  openGraph: {
    title: "Alpha Ocean Hub — Surf Weligama, Sri Lanka",
    description: "Beginner-friendly surf lessons & board rentals. Surf. Beach. Chill.",
    images: ["/og.jpg"],
    type: "website",
  },
};
```

- [ ] **Step 6: Run the full test suite**

Run: `npm test`
Expected: PASS (WhatsApp helper tests).

- [ ] **Step 7: Typecheck + lint + static export**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: No type errors, no lint errors, build succeeds and produces `out/` containing `index.html` and `_next/`, `photos/`, `frames/` assets.

- [ ] **Step 8: Smoke-test the exported static site**

Run: `npx serve out` (or `python3 -m http.server -d out 4000`)
Expected: Opening the served URL shows the full page; hero scrubs on desktop; all WhatsApp buttons link to `wa.me/94000000000?text=...`; no console errors.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: booking CTA, footer, SEO/OG metadata; verified static export"
```

---

### Task 9: README + deploy notes + owner handoff

**Files:**
- Create: `README.md`
- Create: `HANDOFF.md`

**Interfaces:**
- Consumes: nothing. Documents how to set the WhatsApp number, regenerate assets, build, and deploy.

- [ ] **Step 1: Create `README.md`** (project-specific per the branch-per-project rule)

```markdown
# Alpha Ocean Hub

Cinematic single-page marketing site for Alpha Ocean Hub — a surf school &
board-rental shop in Weligama, Sri Lanka. Surf lessons + board rentals,
WhatsApp-only enquiries (no on-site prices).

## Stack
Next.js (static export) · Tailwind · Framer Motion · Lenis

## Develop
```bash
npm install
npm run dev
```

## Assets
- `npm run optimize` — re-optimize photos from `assets/photos/` into `public/photos/`
- `npm run frames` — extract the hero scroll-scrub sequence from `assets/Video-533.mp4` (needs `ffmpeg`)

## Configure
Edit `lib/site.ts` — set `whatsappNumber` (digits only, country code first, no `+`).

## Build & deploy
```bash
npm run build   # outputs static site to out/
```
Upload `out/` to Hostinger static hosting, or serve via the Pi + Tailscale Funnel.
```

- [ ] **Step 2: Create `HANDOFF.md`** with the open items.

```markdown
# Handoff — Alpha Ocean Hub

## Required before launch
- [ ] **WhatsApp number** — set `whatsappNumber` in `lib/site.ts` (currently stub `94000000000`).
- [ ] **Logo** — `public/logo.png` is from a screenshot; replace with a clean transparent PNG/SVG.
- [ ] **Map** — confirm the exact Weligama pin in `lib/site.ts` `mapEmbed`.
- [ ] **Deploy target** — Hostinger vs Pi + Tailscale (build is static either way).

## Notes
- No prices anywhere by design — all price talk happens on WhatsApp.
- Hero scrubs a frame sequence on desktop; mobile shows `public/hero-poster.jpg`.
- Gallery filenames live in `lib/gallery.ts`; update if photos change.
```

- [ ] **Step 3: Commit**

```bash
git add README.md HANDOFF.md
git commit -m "docs: README and owner handoff notes"
```

---

## Self-Review

**Spec coverage:**
- §2 Tech stack → Task 1 ✓
- §3 all 9 sections → Hero (T5), Vibe/Lessons/Rentals (T6), WhyUs/Gallery/Location (T7), BookingCTA/Footer (T8) ✓
- §4 WhatsApp, no prices → `waLink` (T2), every CTA uses it, BookingCTA says "Message us for prices" ✓
- §5 brand palette + fonts → Task 1 theme ✓
- §6 assets → Task 3 ✓
- Mobile hero fallback → Task 5 ✓
- Motion restraint (one parallax) → only Gallery uses parallax (T7) ✓

**Placeholder scan:** `whatsappNumber` stub and gallery filenames are explicitly flagged as "update to match real output / owner input," not hidden TODOs. Code blocks are complete and runnable. No "TBD" in implementation steps.

**Type consistency:** `waLink(message)`, `SITE`, `FRAME_COUNT`/`framePath`, `GALLERY`, `<Reveal delay className>`, `<WhatsAppButton message variant>` are defined once (T2–T4) and used with matching signatures throughout.
