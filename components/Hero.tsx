"use client";
import { motion } from "framer-motion";
import { HERO_IMAGE } from "@/lib/gallery";
import { SITE } from "@/lib/site";
import WhatsAppButton from "./WhatsAppButton";

export default function Hero() {
  return (
    <section id="top" className="relative h-[100svh] w-full overflow-hidden bg-navy">
      {/* Single cinematic shot with a slow, looping Ken Burns zoom */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          alt="Surfing in Weligama, Sri Lanka"
          className="h-full w-full animate-kenburns object-cover"
        />
      </div>

      {/* Scrims for legibility */}
      <div className="absolute inset-0 bg-navy/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-navy/40" />

      {/* Copy */}
      <div className="absolute inset-0 z-10 mx-auto flex max-w-7xl flex-col justify-end px-6 pb-28 sm:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-gold"
        >
          <span className="h-px w-8 bg-gold" />
          {SITE.location}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.32 }}
          className="font-display text-[18vw] uppercase text-white sm:text-[13vw] lg:text-[10.5rem]"
        >
          Ride Your<br />First Wave
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center"
        >
          <p className="max-w-sm text-base text-white/85">
            Beginner-friendly surf lessons &amp; board rentals on the south coast of Sri Lanka.
          </p>
          <WhatsAppButton message="Hi Alpha Ocean Hub! I'd like to book a surf session. 🏄">
            Book on WhatsApp
          </WhatsAppButton>
        </motion.div>
      </div>
    </section>
  );
}
