import Logo from "./Logo";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-navy px-6 py-14 text-white/75">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3 sm:text-left">
        <div>
          <Logo variant="white" className="h-12 w-auto" />
          <p className="mt-3 font-script text-xl text-gold">{SITE.tagline}</p>
          <p className="mt-1 text-sm">{SITE.location}</p>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Surf Lessons</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="#lessons" className="transition-colors hover:text-white">Beginner surf lessons Weligama</a></li>
            <li><a href="#rentals" className="transition-colors hover:text-white">Surf board rental Weligama</a></li>
            <li><a href="#gallery" className="transition-colors hover:text-white">Surf gallery</a></li>
            <li><a href="#location" className="transition-colors hover:text-white">Find us on Weligama Beach</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Connect</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Instagram</a></li>
            <li><a href={`https://wa.me/${SITE.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">WhatsApp</a></li>
            <li><a href="#top" className="transition-colors hover:text-white">Back to top</a></li>
          </ul>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-white/30">© {SITE.name} — Best surf school in Weligama, Sri Lanka. All rights reserved.</p>
    </footer>
  );
}
