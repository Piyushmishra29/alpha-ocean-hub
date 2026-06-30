const REVIEWS = [
  {
    name: "Sarah M.",
    text: "Best surf school in Weligama! I'd never stood on a board before and after 2 lessons I was riding waves. The instructors are so patient and really know the breaks. Can't recommend enough.",
    rating: 5,
  },
  {
    name: "Tom W.",
    text: "Rented a board for a week — great quality soft-tops and really fair prices. The crew gave me tips on where to paddle out each day depending on the tide. Alpha Ocean Hub is the real deal.",
    rating: 5,
  },
  {
    name: "Lena K.",
    text: "Did a private lesson as a total beginner. The instructor explained everything clearly, safety first approach, and by the end I was standing up and riding! The Weligama waves are perfect for learning.",
    rating: 5,
  },
  {
    name: "Marcus J.",
    text: "Best surf lessons in Weligama hands down. Friendly vibe, professional coaching, and they really care about your progress. Already planning my next trip back.",
    rating: 5,
  },
];

export default function Reviews() {
  return (
    <section className="bg-cream px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-gold">Reviews</p>
        <h2 className="mt-3 text-center font-display text-5xl uppercase text-navy sm:text-6xl">
          What our surf students say
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r, i) => (
            <div key={i} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/5">
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <svg key={j} viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-navy/70">&ldquo;{r.text}&rdquo;</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-navy">— {r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
