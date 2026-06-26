import { HERO_DESKTOP, HERO_MOBILE } from "@/lib/gallery";
import { SITE } from "@/lib/site";
import WhatsAppButton from "./WhatsAppButton";

export default function Hero() {
  return (
    <section id="top" className="relative h-[100svh] w-full overflow-hidden bg-navy">
      {/* Cinematic shot with a slow, looping Ken Burns zoom.
          Landscape on desktop, vertical surfing shot on mobile. */}
      <div className="absolute inset-0">
        {/* <picture> downloads only the matching source (not both). */}
        <picture>
          <source media="(min-width: 768px)" srcSet={HERO_DESKTOP} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_MOBILE}
            alt="Surfing in Weligama, Sri Lanka"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full animate-kenburns object-cover"
          />
        </picture>
      </div>

      {/* Scrims for legibility */}
      <div className="absolute inset-0 bg-navy/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-navy/40" />

      {/* Copy — CSS entrance animation, no JS dependency */}
      <div className="absolute inset-0 z-10 mx-auto flex max-w-7xl flex-col justify-end px-6 pb-28 sm:pb-32">
        <p
          className="hero-in mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-gold"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="h-px w-8 bg-gold" />
          {SITE.location}
        </p>
        <h1
          className="hero-in font-display text-[18vw] uppercase text-white sm:text-[13vw] lg:text-[10.5rem]"
          style={{ animationDelay: "0.28s" }}
        >
          Ride Your<br />First Wave
        </h1>
        <div
          className="hero-in mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center"
          style={{ animationDelay: "0.5s" }}
        >
          <p className="max-w-sm text-base text-white/85">
            Beginner-friendly surf lessons &amp; board rentals on the south coast of Sri Lanka.
          </p>
          <WhatsAppButton message="Hi Alpha Ocean Hub! I'd like to book a surf session. 🏄">
            Book on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
