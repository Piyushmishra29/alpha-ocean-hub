"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import WhatsAppButton from "./WhatsAppButton";

export default function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-navy/90 backdrop-blur shadow-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Image src="/logo.png" alt="Alpha Ocean Hub" width={140} height={48} className="h-10 w-auto" priority />
        <WhatsAppButton message="Hi Alpha Ocean Hub! I'd like to know about surf lessons & rentals." variant="ghost" className="!px-5 !py-2.5">
          Book Now
        </WhatsAppButton>
      </div>
    </header>
  );
}
