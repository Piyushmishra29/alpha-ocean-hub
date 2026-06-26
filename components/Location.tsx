import Reveal from "./Reveal";
import { SITE } from "@/lib/site";

export default function Location() {
  return (
    <section id="location" className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center md:gap-16">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan">Find Us</p>
        <h2 className="mt-3 font-display text-5xl uppercase text-navy sm:text-6xl">Weligama Bay</h2>
        <p className="mt-6 max-w-md text-navy/70">
          On the south coast of Sri Lanka — the friendliest beginner wave on the island,
          with a long sandy bay and warm water all year round. Come find us on the beach.
        </p>
        <p className="mt-6 font-script text-3xl text-sun">{SITE.location}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="overflow-hidden rounded-[2rem] shadow-2xl">
          <iframe
            title="Weligama map"
            src={SITE.mapEmbed}
            className="aspect-[4/3] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <a
          href={SITE.mapLink}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan hover:text-navy"
        >
          Open in Maps
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7M7 7h10v10" />
          </svg>
        </a>
      </Reveal>
    </section>
  );
}
