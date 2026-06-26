export const SITE = {
  name: "Alpha Ocean Hub",
  tagline: "Surf Beach. Chill.",
  location: "Weligama, Sri Lanka",
  lat: 5.9724,
  lng: 80.4292,
  instagram: "https://www.instagram.com/alphaoceanhub/",
  instagramHandle: "@alphaoceanhub",
  // Digits only, country code first, no '+'. (+94 74 261 1910)
  whatsappNumber: "94742611910",
  // Google Maps embed — keyless pb form (the /maps/embed endpoint is
  // iframe-allowed; the older output=embed URL redirects through an
  // X-Frame-Options: SAMEORIGIN response that browsers block).
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m3!2m1!1sWeligama+Beach,+Sri+Lanka!6i14",
  // Deep link for the "open in maps" button.
  mapLink: "https://www.google.com/maps/search/?api=1&query=Weligama+Beach+Sri+Lanka",
} as const;
