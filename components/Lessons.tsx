import Reveal from "./Reveal";
import WhatsAppButton from "./WhatsAppButton";

export default function Lessons() {
  return (
    <section id="lessons" className="grid gap-10 px-6 py-24 md:grid-cols-2 md:items-center md:gap-16 md:px-12">
      <Reveal className="order-2 md:order-1">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan">Surf Lessons</p>
        <h2 className="mt-3 font-display text-5xl text-navy sm:text-6xl">Learn from local legends</h2>
        <p className="mt-5 max-w-md text-navy/75">
          Beginner-friendly, small groups and private sessions with patient local
          instructors who grew up on these waves. Soft-top board, rashguard, and all
          the gear included — just bring yourself.
        </p>
        <ul className="mt-6 space-y-2 text-navy/80">
          <li>🏄 Group &amp; private lessons</li>
          <li>🌊 Beginner to intermediate</li>
          <li>🧒 Kids welcome</li>
          <li>📸 Photos of your session</li>
        </ul>
        <div className="mt-8">
          <WhatsAppButton message="Hi Alpha Ocean Hub! I'd like to book a surf lesson. 🏄">
            Book a Lesson
          </WhatsAppButton>
        </div>
      </Reveal>
      <Reveal delay={0.1} className="order-1 md:order-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/photos/group-lesson.jpg" alt="Surf lesson on Weligama beach" className="aspect-[4/5] w-full rounded-3xl object-cover shadow-xl" />
      </Reveal>
    </section>
  );
}
