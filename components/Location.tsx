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
