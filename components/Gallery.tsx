"use client";
import { GALLERY } from "@/lib/gallery";

export default function Gallery() {
  return (
    <section id="gallery" className="bg-navy px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Gallery</p>
        <h2 className="mt-3 max-w-2xl font-display text-5xl uppercase text-white sm:text-6xl">
          Moments in the water
        </h2>
        <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 sm:auto-rows-[280px] lg:grid-cols-3">
          {GALLERY.map((g) => (
            <div
              key={g.src}
              className={`group relative overflow-hidden rounded-2xl ${g.tall ? "row-span-2" : ""}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={g.src}
                alt={g.alt}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
