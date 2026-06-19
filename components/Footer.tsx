import Image from "next/image";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-navy px-6 py-12 text-center text-white/80">
      <Image src="/logo.png" alt="Alpha Ocean Hub" width={160} height={56} className="mx-auto h-12 w-auto" />
      <p className="mt-4 font-display text-2xl text-gold">{SITE.tagline}</p>
      <p className="mt-2 text-sm">{SITE.location}</p>
      <div className="mt-4 flex justify-center gap-5 text-sm">
        <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">
          Instagram
        </a>
      </div>
      <p className="mt-6 text-xs text-white/50">© {SITE.name}. All rights reserved.</p>
    </footer>
  );
}
