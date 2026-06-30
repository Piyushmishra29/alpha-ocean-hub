import Reveal from "./Reveal";
import WhatsAppButton from "./WhatsAppButton";
import Icon from "./Icon";
import { asset } from "@/lib/asset";

const POINTS = [
  { icon: "board" as const, text: "Soft-tops & hard boards for every level" },
  { icon: "gear" as const, text: "Hourly or daily — surf on your schedule" },
  { icon: "compass" as const, text: "Pickup right on Weligama beach" },
];

export default function Rentals() {
  return (
    <section id="rentals" className="bg-sand">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-12 md:items-center md:gap-6">
        <Reveal className="md:col-span-6 md:col-start-1 md:order-1">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/photos/903869d4-6dd6-4842-80f1-4a0dffde2d68.jpg")}
              alt="Heading out with a board at Weligama"
              loading="lazy"
              decoding="async"
              width={828}
              height={1472}
              className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl"
            />
          </div>
        </Reveal>

        <Reveal delay={0.12} className="md:col-span-5 md:col-start-8 md:order-2">
          <span className="font-display text-7xl text-sun/30 sm:text-8xl">02</span>
          <p className="-mt-3 text-xs font-semibold uppercase tracking-[0.28em] text-sun">Board Rentals</p>
          <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] text-navy sm:text-6xl">
            Grab a board,<br />hit the water
          </h2>
          <p className="mt-6 max-w-md text-navy/70">
            A full quiver ready at the beach. Paddle out whenever the waves are calling —
            no booking gymnastics, just good times in the water.
          </p>
          <ul className="mt-8 space-y-4">
            {POINTS.map((p) => (
              <li key={p.text} className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sun/15 text-sun">
                  <Icon name={p.icon} className="h-5 w-5" />
                </span>
                <span className="text-navy/80">{p.text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <WhatsAppButton message="Hi Alpha Ocean Hub! I'd like to rent a board. 🏄">
              Rent a Board
            </WhatsAppButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
