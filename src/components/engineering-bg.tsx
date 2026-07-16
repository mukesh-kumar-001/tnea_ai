import { cn } from "@/lib/utils";

interface EngineeringBgProps {
  variant?: "dots" | "grid";
  className?: string;
  children?: React.ReactNode;
}

/**
 * Subtle engineering-inspired background pattern.
 * Use as a wrapper or a decorative layer.
 */
export function EngineeringBg({
  variant = "dots",
  className,
  children,
}: EngineeringBgProps) {
  return (
    <div
      className={cn(
        variant === "dots" ? "blueprint-dots" : "blueprint-grid",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Decorative engineering coordinate marker — a small cross + label.
 * Used sparingly at section boundaries for visual identity.
 */
export function CoordinateMarker({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2 select-none", className)}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        className="text-muted-foreground/40"
      >
        <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="0.75" />
        <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="0.75" />
        <circle cx="6" cy="6" r="1.5" fill="currentColor" />
      </svg>
      {label && (
        <span className="text-[9px] font-mono font-medium text-muted-foreground/40 uppercase tracking-wider">
          {label}
        </span>
      )}
    </div>
  );
}

/**
 * Engineering-style section divider with optional coordinate label.
 */
export function EngineeringDivider({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative flex items-center gap-3", className)}>
      <div className="engineering-divider flex-1" />
      {label && (
        <span className="text-[9px] font-mono font-medium text-muted-foreground/30 uppercase tracking-widest shrink-0">
          {label}
        </span>
      )}
      <div className="engineering-divider flex-1" />
    </div>
  );
}
