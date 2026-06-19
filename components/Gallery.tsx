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
            {/* eslint-disable-next-line @next/next/no-img-element */}
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
