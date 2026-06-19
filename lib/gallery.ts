export const GALLERY: { src: string; alt: string }[] = [
  { src: "/photos/img-2931.jpg", alt: "Surfer riding a wave at Weligama" },
  { src: "/photos/img-8611.jpg", alt: "Carving a clean wave face" },
  { src: "/photos/img-2921.jpg", alt: "Walking the board on a small wave" },
  { src: "/photos/group-lesson.jpg", alt: "Group surf lesson on the beach" },
  { src: "/photos/img-7207.jpg", alt: "Sunset surf session" },
  { src: "/photos/board-portrait.jpg", alt: "Students with their boards" },
  { src: "/photos/img-8393.jpg", alt: "Dropping into a wave" },
  { src: "/photos/img-2924.jpg", alt: "Cruising along the wave" },
];

// public/frames/ contains frame_0001.jpg … frame_0114.jpg
export const FRAME_COUNT = 114;
export const framePath = (i: number) =>
  `/frames/frame_${String(i).padStart(4, "0")}.jpg`;
