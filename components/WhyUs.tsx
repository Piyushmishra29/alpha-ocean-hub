import Reveal from "./Reveal";
import Icon from "./Icon";

const FEATURES = [
  { icon: "wave" as const, title: "Beginner First", body: "Safe, gentle waves and patient coaching. You'll be standing up in no time." },
  { icon: "compass" as const, title: "Local Experts", body: "Born-and-raised instructors who read every tide and break in the bay." },
  { icon: "board" as const, title: "Gear Included", body: "Boards, rashguards, leashes — everything's ready. Just show up and surf." },
  { icon: "gear" as const, title: "Good Vibes", body: "A relaxed crew and a community feel from your first wave onward." },
];

export default function WhyUs() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-cyan">Why Alpha Ocean Hub</p>
        <h2 className="mt-3 text-center font-display text-5xl uppercase text-navy sm:text-6xl">
          Your home break in Weligama
        </h2>
      </Reveal>
      <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.08}>
            <div className="border-t border-navy/15 pt-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white">
                <Icon name={f.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-2xl uppercase text-navy">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/65">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
