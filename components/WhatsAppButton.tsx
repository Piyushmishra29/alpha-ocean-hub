"use client";
import { waLink } from "@/lib/whatsapp";

type Variant = "primary" | "light" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-green text-white hover:bg-[#2fa376]",
  light: "bg-white text-navy hover:bg-sand",
  ghost: "bg-white/10 text-white ring-1 ring-white/40 backdrop-blur hover:bg-white/20",
};

export default function WhatsAppButton({
  message,
  children,
  variant = "primary",
  className = "",
}: {
  message: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${styles[variant]} ${className}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 fill-current">
        <path d="M12 2a10 10 0 0 0-8.6 15.07L2 22l5.06-1.33A10 10 0 1 0 12 2Zm5.3 14.2c-.22.62-1.3 1.2-1.8 1.24-.46.04-.9.2-3.04-.64-2.57-1-4.2-3.6-4.33-3.77-.13-.17-1.04-1.38-1.04-2.64 0-1.26.66-1.88.9-2.14a.94.94 0 0 1 .68-.32c.17 0 .34 0 .49.01.16.01.37-.06.58.44.22.52.74 1.8.8 1.93.07.13.11.28.02.45-.09.17-.13.28-.26.43-.13.15-.27.34-.39.46-.13.13-.26.27-.11.53.15.26.66 1.09 1.42 1.77.98.87 1.8 1.14 2.06 1.27.26.13.41.11.56-.07.15-.17.64-.75.81-1.01.17-.26.34-.22.58-.13.24.09 1.5.71 1.76.84.26.13.43.19.49.3.06.1.06.62-.16 1.24Z" />
      </svg>
      {children}
    </a>
  );
}
