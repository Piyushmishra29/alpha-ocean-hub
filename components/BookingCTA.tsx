import WhatsAppButton from "./WhatsAppButton";
import { SITE } from "@/lib/site";
import { asset } from "@/lib/asset";

export default function BookingCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-32 text-center sm:py-40">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset("/photos/img-8611.jpg")} alt="" aria-hidden loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-navy/75" />
      <div className="relative z-10 mx-auto max-w-3xl text-white">
        <p className="font-script text-3xl text-gold">Ready when you are</p>
        <h2 className="mt-3 font-display text-6xl uppercase leading-[0.95] sm:text-8xl">
          Let&apos;s get you<br />on a wave
        </h2>
        <p className="mx-auto mt-6 max-w-md text-white/80">
          Message us on WhatsApp for prices &amp; availability — lessons, rentals, or just
          a chat about the surf. Surf. Beach. Chill.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <WhatsAppButton message="Hi Alpha Ocean Hub! I'd like to know about lessons, rentals, prices & availability. 🏄">
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
