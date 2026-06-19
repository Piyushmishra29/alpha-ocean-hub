import Reveal from "./Reveal";

export default function Intro() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
      <Reveal>
        <p className="font-script text-3xl text-sun sm:text-4xl">Surf. Beach. Chill.</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] text-navy sm:text-6xl">
          Not just surfing.<br />It&apos;s a way to live.
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-navy/70">
          Whether it&apos;s your first time on a board or your hundredth wave, Alpha Ocean
          Hub is your home break in Weligama — warm water, friendly waves, and a crew that
          has your back from the first paddle out.
        </p>
      </Reveal>
    </section>
  );
}
