import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const display = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://alphaoceanhub.com"),
  title: "Alpha Ocean Hub — Surf School & Board Rentals, Weligama Sri Lanka",
  description:
    "Learn to surf in Weligama, Sri Lanka. Beginner-friendly surf lessons and board rentals. Surf, sunset & salty vibes. Book on WhatsApp.",
  openGraph: {
    title: "Alpha Ocean Hub — Surf Weligama, Sri Lanka",
    description: "Beginner-friendly surf lessons & board rentals. Surf. Beach. Chill.",
    images: ["/og.jpg"],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
