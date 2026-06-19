import WhatsAppButton from "./WhatsAppButton";
import { SITE } from "@/lib/site";

export default function BookingCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-28 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
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
