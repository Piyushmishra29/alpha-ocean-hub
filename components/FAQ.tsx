"use client";
import { useState } from "react";

const FAQS = [
  {
    q: "Is Alpha Ocean Hub the best surf school in Weligama for beginners?",
    a: "Absolutely. We specialize in beginner surf lessons in Weligama — gentle waves, sandy bottom, and patient local instructors who'll have you standing up on your first session. Our small group sizes mean you get individual attention every wave.",
  },
  {
    q: "How much do surf lessons in Weligama cost?",
    a: "We keep our pricing simple and affordable. Message us on WhatsApp for current rates on group lessons, private coaching, and board rentals. No hidden fees — all gear included.",
  },
  {
    q: "Do I need experience to book surf lessons in Weligama?",
    a: "Not at all! Most of our students have never touched a surfboard before. Weligama Bay's sandy-bottom beach break is one of the safest and most consistent beginner waves in Sri Lanka — perfect for learning to surf.",
  },
  {
    q: "What should I bring to my surf lesson in Weligama?",
    a: "Just yourself, sunscreen, and a towel. We provide soft-top surfboards, rashguards, and leashes. The water in Weligama is 27-29°C year-round so no wetsuit needed.",
  },
  {
    q: "What's the best time of year for surfing in Weligama?",
    a: "Weligama delivers 300+ surfable days a year. The best conditions run November to April (dry season) with consistent 1-3 ft waves ideal for beginners. Morning sessions are the most peaceful before the wind picks up.",
  },
  {
    q: "Can I rent a surfboard in Weligama without a lesson?",
    a: "Yes — we offer hourly and daily board rentals for experienced surfers. We have soft-tops and hard boards in various sizes. Just show up at the beach or message us on WhatsApp to reserve.",
  },
  {
    q: "Where is Alpha Ocean Hub located in Weligama?",
    a: "Right on Weligama Beach, the main surf bay on Sri Lanka's south coast. We're easy to find — look for our boards on the sand near the center of the bay. Find us on Google Maps or message us for directions.",
  },
  {
    q: "How long is a typical surf lesson in Weligama?",
    a: "Our standard surf lessons run about 1.5 hours in the water, plus a quick theory session on safety, technique, and reading waves before you paddle out. We recommend booking early morning for the glassiest conditions.",
  },
];

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-navy/10">
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-lg uppercase text-navy sm:text-xl">{q}</span>
        <svg
          viewBox="0 0 24 24"
          className={`mt-1 h-4 w-4 shrink-0 text-cyan transition-transform ${open ? "rotate-45" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
      {open && (
        <div className="pb-5 pr-12 text-sm leading-relaxed text-navy/70">{a}</div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section className="bg-sand px-6 py-24" itemScope itemType="https://schema.org/FAQPage">
      <div className="mx-auto max-w-3xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-cyan">FAQ</p>
        <h2 className="mt-3 text-center font-display text-5xl uppercase text-navy sm:text-6xl">
          Surf lessons in Weligama<br />— your questions answered
        </h2>
        <div className="mt-12">
          {FAQS.map((faq, i) => (
            <div key={i} itemScope itemType="https://schema.org/Question" itemProp="mainEntity">
              <div itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <FAQItem
                  q={faq.q}
                  a={faq.a}
                  open={openIdx === i}
                  onToggle={() => setOpenIdx(openIdx === i ? null : i)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
