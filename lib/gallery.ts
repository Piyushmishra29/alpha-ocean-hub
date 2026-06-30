import { asset } from "./asset";

export const HERO_DESKTOP = asset("/photos/hero-desktop.webp");
export const HERO_MOBILE = asset("/photos/hero-mobile.webp");

export const GALLERY: { src: string; alt: string; tall?: boolean }[] = [
  { src: asset("/photos/alpha-03.webp"), alt: "Surf boards held high on Weligama beach at sunset", tall: true },
  { src: asset("/photos/alpha-06.webp"), alt: "Beginner surf lesson group paddling out in Weligama Bay" },
  { src: asset("/photos/alpha-10.webp"), alt: "Surfboards against the Weligama sunset sky" },
  { src: asset("/photos/gallery-new-1.webp"), alt: "Sunrise surf session on Weligama Beach, Sri Lanka", tall: true },
  { src: asset("/photos/alpha-24.webp"), alt: "Two surfers with longboards on Weligama sand" },
  { src: asset("/photos/alpha-14.webp"), alt: "Wave reflections on wet sand at Weligama Beach" },
  { src: asset("/photos/gallery-new-2.webp"), alt: "Surf instructors and crew at Alpha Ocean Hub Weligama", tall: true },
  { src: asset("/photos/alpha-01.webp"), alt: "Sunset palm trees at Weligama surf beach" },
  { src: asset("/photos/img-8611.jpg"), alt: "Surfer carving a wave face at Weligama surf break" },
];
