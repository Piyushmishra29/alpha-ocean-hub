import { asset } from "./asset";

// Responsive hero: a landscape frame on desktop, a vertical surfing frame on mobile.
// (Swap these to the new AirDropped WebP files once converted.)
export const HERO_DESKTOP = asset("/photos/img-2931.jpg");
export const HERO_MOBILE = asset("/photos/img-8611.jpg");

// Gallery grid — mix of action + lifestyle (real WhatsApp shots), varied ratios.
export const GALLERY: { src: string; alt: string; tall?: boolean }[] = [
  { src: asset("/photos/alpha-03.webp"), alt: "Boards held high on Weligama beach", tall: true },
  { src: asset("/photos/alpha-06.webp"), alt: "Group lesson paddling out" },
  { src: asset("/photos/alpha-10.webp"), alt: "Longboards against the sky" },
  { src: asset("/photos/img-8393.jpg"), alt: "Dropping in with spray flying", tall: true },
  { src: asset("/photos/alpha-24.webp"), alt: "Longboard duo on the sand" },
  { src: asset("/photos/alpha-14.webp"), alt: "Reflections on the wet sand" },
  { src: asset("/photos/alpha-22.webp"), alt: "The beach crew", tall: true },
  { src: asset("/photos/alpha-01.webp"), alt: "Sunset palms at Weligama" },
  { src: asset("/photos/img-8611.jpg"), alt: "Carving a clean wave face" },
];
