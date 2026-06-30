import { asset } from "./asset";

export const HERO_DESKTOP = asset("/photos/hero-desktop.webp");
export const HERO_MOBILE = asset("/photos/hero-mobile.webp");

export const GALLERY: { src: string; alt: string; tall?: boolean }[] = [
  { src: asset("/photos/alpha-03.webp"), alt: "Boards held high on Weligama beach", tall: true },
  { src: asset("/photos/alpha-06.webp"), alt: "Group lesson paddling out" },
  { src: asset("/photos/alpha-10.webp"), alt: "Longboards against the sky" },
  { src: asset("/photos/gallery-new-1.webp"), alt: "Sunrise at Weligama beach", tall: true },
  { src: asset("/photos/alpha-24.webp"), alt: "Longboard duo on the sand" },
  { src: asset("/photos/alpha-14.webp"), alt: "Reflections on the wet sand" },
  { src: asset("/photos/gallery-new-2.webp"), alt: "The Weligama crew", tall: true },
  { src: asset("/photos/alpha-01.webp"), alt: "Sunset palms at Weligama" },
  { src: asset("/photos/img-8611.jpg"), alt: "Carving a clean wave face" },
];
