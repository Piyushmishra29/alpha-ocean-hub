import Reveal from "./Reveal";

export default function Intro() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
      <Reveal>
        <p className="font-script text-3xl text-sun sm:text-4xl">Surf. Beach. Chill.</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] text-navy sm:text-6xl">
          Best surf school in Weligama<br />for your first wave
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-navy/70">
          Looking for the best surf school in Weligama, Sri Lanka? Alpha Ocean
          Hub offers beginner-friendly surf lessons and board rentals right on Weligama Beach
          — warm water, gentle sandy-bottom waves, and a crew that has your back from the
          first paddle out. Whether it&apos;s your first time on a surfboard or you&apos;re
          looking to improve, our local instructors know every break in the bay.
        </p>
      </Reveal>
    </section>
  );
}
