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
      {/* eslint-disable-next-line @next/next/no-img-element */}
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
