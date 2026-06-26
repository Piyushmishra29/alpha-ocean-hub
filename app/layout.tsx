import type { Metadata } from "next";
import { Anton, Inter, Caveat } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const display = Anton({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const script = Caveat({ weight: ["500", "700"], subsets: ["latin"], variable: "--font-script" });

export const metadata: Metadata = {
  metadataBase: new URL("https://alphaoceanhub.com"),
  title: "Alpha Ocean Hub — Surf School & Board Rentals, Weligama Sri Lanka",
  description:
    "Learn to surf in Weligama, Sri Lanka. Beginner-friendly surf lessons and board rentals. Surf, beach, chill. Book on WhatsApp.",
  openGraph: {
    title: "Alpha Ocean Hub — Surf Weligama, Sri Lanka",
    description: "Beginner-friendly surf lessons & board rentals. Surf. Beach. Chill.",
    images: ["/og.jpg"],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${script.variable}`}>
      <head>
        {/* Self-contained scroll-reveal observer. Runs independently of the
            app bundle so content reveals even on a slow connection. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document,h=d.documentElement;h.classList.add('reveal-on');function arm(){var els=d.querySelectorAll('[data-reveal]');if(!('IntersectionObserver' in window)){for(var i=0;i<els.length;i++)els[i].setAttribute('data-shown','');return;}var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.setAttribute('data-shown','');io.unobserve(e.target);}});},{rootMargin:'0px 0px -80px 0px'});els.forEach(function(el){io.observe(el);});}if(d.readyState!=='loading')arm();else d.addEventListener('DOMContentLoaded',arm);})();",
          }}
        />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
