const WORDS = ["Surf", "Learn", "Rent", "Chill", "Weligama", "Salty Vibes"];

export default function Marquee() {
  const run = [...WORDS, ...WORDS];
  return (
    <div className="overflow-hidden border-y border-navy/10 bg-cream py-6">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {run.map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-4xl uppercase text-outline sm:text-6xl">{w}</span>
            <span className="text-2xl text-sun">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
