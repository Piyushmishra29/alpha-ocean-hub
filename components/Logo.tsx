import Image from "next/image";

export default function Logo({
  variant = "white",
  className = "h-10 w-auto",
  priority = false,
}: {
  variant?: "white" | "color";
  className?: string;
  priority?: boolean;
}) {
  const src = variant === "white" ? "/logo-white.png" : "/logo-mark.png";
  return (
    <Image
      src={src}
      alt="Alpha Ocean Hub"
      width={390}
      height={190}
      className={className}
      priority={priority}
    />
  );
}
