import Logo from "./Logo";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-navy px-6 py-14 text-center text-white/75">
      <Logo variant="white" className="mx-auto h-12 w-auto" />
      <p className="mt-5 font-script text-2xl text-gold">{SITE.tagline}</p>
      <p className="mt-2 text-sm">{SITE.location}</p>
      <div className="mt-5 flex justify-center gap-6 text-xs font-semibold uppercase tracking-[0.2em]">
        <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
          Instagram
        </a>
        <a href="#top" className="transition-colors hover:text-white">
          Back to top
        </a>
      </div>
      <p className="mt-8 text-xs text-white/40">© {SITE.name}. All rights reserved.</p>
    </footer>
  );
}
