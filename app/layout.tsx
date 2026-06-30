import type { Metadata } from "next";
import { Anton, Inter, Caveat } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { SITE } from "@/lib/site";
import "./globals.css";

const display = Anton({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const script = Caveat({ weight: ["500", "700"], subsets: ["latin"], variable: "--font-script" });

export const metadata: Metadata = {
  metadataBase: new URL("https://alphaoceanhub.com"),
  title: "Alpha Ocean Hub — Best Surf School in Weligama | Surf Lessons & Board Rentals",
  description:
    "Best surf school in Weligama, Sri Lanka. Beginner-friendly surf lessons for all levels, board rentals, and friendly local instructors. Learn to surf in Weligama Bay's gentle waves. Book on WhatsApp.",
  keywords: [
    "surf school weligama",
    "surf lessons weligama",
    "best surf school weligama",
    "learn to surf weligama",
    "weligama surf",
    "beginner surf lessons weligama",
    "surf board rental weligama",
    "surfing weligama sri lanka",
    "weligama surf lessons for beginners",
    "surf school sri lanka",
  ],
  openGraph: {
    title: "Alpha Ocean Hub — Best Surf School in Weligama, Sri Lanka",
    description: "Learn to surf in Weligama with the best surf school. Beginner-friendly lessons & board rentals on Weligama Beach. Surf. Beach. Chill.",
    images: ["/og.jpg"],
    type: "website",
    locale: "en_US",
    siteName: "Alpha Ocean Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alpha Ocean Hub — Best Surf School in Weligama",
    description: "Beginner-friendly surf lessons & board rentals in Weligama, Sri Lanka.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://alphaoceanhub.com" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${script.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://marine-api.open-meteo.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="preload" href="/photos/hero-desktop.webp" as="image" media="(min-width: 768px)" fetchPriority="high" />
        <link rel="preload" href="/photos/hero-mobile.webp" as="image" media="(max-width: 767px)" fetchPriority="high" />
        {/* Self-contained scroll-reveal observer. Runs independently of the
            app bundle so content reveals even on a slow connection. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Alpha Ocean Hub",
              description: "Best surf school in Weligama, Sri Lanka. Beginner-friendly surf lessons and board rentals.",
              url: "https://alphaoceanhub.com",
              telephone: "+94742611910",
              email: "hello@alphaoceanhub.com",
              image: "https://alphaoceanhub.com/og.jpg",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Weligama",
                addressRegion: "Southern Province",
                addressCountry: "LK",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 5.9724,
                longitude: 80.4292,
              },
              openingHours: "Mo-Su 07:00-18:00",
              priceRange: "$",
              sameAs: [
                "https://www.instagram.com/alphaoceanhub/",
                `https://wa.me/${SITE.whatsappNumber}`,
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                bestRating: "5",
                ratingCount: "48",
              },
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document,h=d.documentElement;h.classList.add('reveal-on');function passed(){var els=d.querySelectorAll('[data-reveal]:not([data-shown])');for(var i=0;i<els.length;i++){if(els[i].getBoundingClientRect().bottom<=0)els[i].setAttribute('data-shown','');}}function arm(){var els=d.querySelectorAll('[data-reveal]');if(!('IntersectionObserver' in window)){for(var i=0;i<els.length;i++)els[i].setAttribute('data-shown','');return;}var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.setAttribute('data-shown','');io.unobserve(e.target);}});},{rootMargin:'0px 0px -80px 0px'});els.forEach(function(el){io.observe(el);});passed();window.addEventListener('scroll',passed,{passive:true});window.addEventListener('load',passed);}if(d.readyState!=='loading')arm();else d.addEventListener('DOMContentLoaded',arm);})();",
          }}
        />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
