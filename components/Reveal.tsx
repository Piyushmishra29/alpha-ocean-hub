// Plain server component — content is visible by default (no JS required).
// A tiny inline observer in app/layout.tsx adds `.reveal-on` to <html> and
// reveals these on scroll, so a slow/absent JS bundle never hides content.
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      data-reveal=""
      className={className}
      style={{ "--reveal-delay": `${delay}s` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
