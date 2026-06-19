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
        <iframe
          title="Weligama map"
          src={SITE.mapEmbed}
          className="aspect-[4/3] w-full rounded-[2rem] border-0 shadow-2xl"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Reveal>
    </section>
  );
}
