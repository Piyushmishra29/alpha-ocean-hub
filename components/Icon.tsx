type IconName = "wave" | "board" | "compass" | "gear";

const paths: Record<IconName, React.ReactNode> = {
  wave: (
    <path d="M2 16c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M4 11c0-4 3-7 7-7 3 0 5 2 5 4 0 1.5-1 2.5-2.5 2.5S16 11 16 10" />
  ),
  board: (
    <path d="M12 2c4 3 6 8 6 12s-2 6-6 8c-4-2-6-4-6-8s2-9 6-12ZM12 6v12" />
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
    </>
  ),
};

export default function Icon({
  name,
  className = "h-7 w-7",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
