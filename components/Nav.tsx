"use client";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import WhatsAppButton from "./WhatsAppButton";

const LINKS = [
  { href: "#lessons", label: "Lessons" },
  { href: "#rentals", label: "Rentals" },
  { href: "#gallery", label: "Gallery" },
  { href: "#location", label: "Find Us" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "bg-cream/95 py-2 shadow-[0_1px_0_rgba(11,58,91,0.08)] backdrop-blur" : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#top" aria-label="Alpha Ocean Hub home">
          <Logo variant={solid ? "color" : "white"} className="h-9 w-auto sm:h-10" priority />
        </a>
        <nav className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                solid ? "text-navy/70 hover:text-navy" : "text-white/85 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <WhatsAppButton
          message="Hi Alpha Ocean Hub! I'd like to know about surf lessons & rentals."
          variant={solid ? "primary" : "ghost"}
          className="!px-5 !py-2.5 !text-xs"
        >
          Book
        </WhatsAppButton>
      </div>
    </header>
  );
}
