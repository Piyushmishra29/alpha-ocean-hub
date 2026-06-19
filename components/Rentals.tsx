import Reveal from "./Reveal";
import WhatsAppButton from "./WhatsAppButton";

export default function Rentals() {
  return (
    <section id="rentals" className="grid gap-10 bg-sand px-6 py-24 md:grid-cols-2 md:items-center md:gap-16 md:px-12">
      <Reveal>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/photos/board-portrait.jpg" alt="Surfboards ready to rent" className="aspect-[4/5] w-full rounded-3xl object-cover shadow-xl" />
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sun">Board Rentals</p>
        <h2 className="mt-3 font-display text-5xl text-navy sm:text-6xl">Grab a board, hit the water</h2>
        <p className="mt-5 max-w-md text-navy/75">
          A full quiver of soft-tops and hard boards for every level, ready at the
          beach. Hourly or daily — paddle out whenever the waves are calling.
        </p>
        <ul className="mt-6 space-y-2 text-navy/80">
          <li>🛹 Soft-tops &amp; hard boards</li>
          <li>⏱️ Hourly &amp; daily</li>
          <li>📍 Pickup right on Weligama beach</li>
        </ul>
        <div className="mt-8">
          <WhatsAppButton variant="primary" message="Hi Alpha Ocean Hub! I'd like to rent a board. 🏄">
            Rent a Board
          </WhatsAppButton>
        </div>
      </Reveal>
    </section>
  );
}
