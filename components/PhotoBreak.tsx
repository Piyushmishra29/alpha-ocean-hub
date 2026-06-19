"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function PhotoBreak({
  src,
  quote,
  attribution,
}: {
  src: string;
  quote?: string;
  attribution?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative h-[60vh] w-full overflow-hidden sm:h-[80vh]">
      <motion.div style={{ y }} className="absolute inset-0 h-[124%] -top-[12%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" aria-hidden className="h-full w-full object-cover" />
      </motion.div>
      {quote && (
        <>
          <div className="absolute inset-0 bg-navy/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <p className="max-w-3xl font-display text-4xl uppercase leading-[0.98] text-white sm:text-7xl">
              {quote}
            </p>
            {attribution && (
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                {attribution}
              </p>
            )}
          </div>
        </>
      )}
    </section>
  );
}
