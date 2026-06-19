import Reveal from "./Reveal";

const FEATURES = [
  { icon: "🌱", title: "Beginner-friendly", body: "Stand up on your first session — that's the promise. Patient coaching, safe waves." },
  { icon: "🧭", title: "Local experts", body: "Born-and-raised instructors who know every break and tide in Weligama bay." },
  { icon: "🌅", title: "Golden-hour sessions", body: "Sunrise glass and sunset glow — we surf when the ocean looks its best." },
  { icon: "🎒", title: "All gear included", body: "Boards, rashguards, leashes — everything's ready. Just show up and surf." },
];

export default function WhyUs() {
  return (
    <section className="px-6 py-24 md:px-12">
      <Reveal>
        <h2 className="text-center font-display text-5xl text-navy sm:text-6xl">Why Alpha Ocean Hub</h2>
      </Reveal>
      <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.08}>
            <div className="h-full rounded-3xl border border-navy/10 bg-white p-7 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="text-4xl">{f.icon}</div>
              <h3 className="mt-4 font-display text-2xl text-navy">{f.title}</h3>
              <p className="mt-2 text-sm text-navy/70">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
