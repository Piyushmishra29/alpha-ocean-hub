import Reveal from "./Reveal";
import WhatsAppButton from "./WhatsAppButton";
import Icon from "./Icon";
import { asset } from "@/lib/asset";

const POINTS = [
  { icon: "wave" as const, text: "Group & private lessons for all levels" },
  { icon: "board" as const, text: "Soft-top board, rashguard & leash included" },
  { icon: "compass" as const, text: "Patient local instructors who know every break" },
  { icon: "gear" as const, text: "Photos of your session to take home" },
];

export default function Lessons() {
  return (
    <section id="lessons" className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-12 md:items-center md:gap-6">
      <Reveal className="md:col-span-5 md:col-start-1">
        <span className="font-display text-7xl text-sun/30 sm:text-8xl">01</span>
        <p className="-mt-3 text-xs font-semibold uppercase tracking-[0.28em] text-cyan">Surf Lessons</p>
        <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] text-navy sm:text-6xl">
          Learn from<br />local legends
        </h2>
        <p className="mt-6 max-w-md text-navy/70">
          Stand up on your very first session. Small groups and private coaching with
          instructors who grew up on these waves — just bring yourself, we&apos;ve got the rest.
        </p>
        <ul className="mt-8 space-y-4">
          {POINTS.map((p) => (
            <li key={p.text} className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan/10 text-cyan">
                <Icon name={p.icon} className="h-5 w-5" />
              </span>
              <span className="text-navy/80">{p.text}</span>
            </li>
          ))}
        </ul>
        <div className="mt-9">
          <WhatsAppButton message="Hi Alpha Ocean Hub! I'd like to book a surf lesson. 🏄">
            Book a Lesson
          </WhatsAppButton>
        </div>
      </Reveal>

      <Reveal delay={0.12} className="md:col-span-6 md:col-start-7">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/photos/group-lesson.jpg")}
            alt="Group surf lesson on Weligama beach"
            loading="lazy"
            decoding="async"
            width={1534}
            height={1280}
            className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl"
          />
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-navy px-6 py-5 text-white shadow-xl sm:block">
            <p className="font-display text-3xl leading-none">100%</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-white/70">Beginner friendly</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
