import Reveal from "./Reveal";

export default function Vibe() {
  return (
    <section className="bg-navy px-6 py-28 text-center text-white">
      <Reveal>
        <p className="mx-auto max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
          Not just surfing.<br />
          <span className="text-gold">It&apos;s a lifestyle.</span>
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mx-auto mt-6 max-w-xl text-white/75">
          Whether it&apos;s your first time on a board or your hundredth wave, Alpha Ocean
          Hub is your home break in Weligama — good vibes, warm water, and a crew that
          has your back.
        </p>
      </Reveal>
    </section>
  );
}
