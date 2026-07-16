import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon?: ReactNode;
  label: string;
  value: string | number;
  suffix?: string;
  className?: string;
  mono?: boolean;
  countUp?: boolean;
}

/**
 * Premium engineering-style statistic card with optional count-up animation.
 * Uses monospace for numerical values. Subtle perspective tilt on hover.
 */
export function StatCard({
  icon,
  label,
  value,
  suffix,
  className,
  mono = true,
  countUp = false,
}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative p-4 rounded-xl border border-border/60 bg-card",
        "transition-shadow duration-250",
        "hover:shadow-md",
        className
      )}
      whileHover={{ y: -1, scale: 1.01 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {icon && (
        <div className="mb-2.5 text-primary">{icon}</div>
      )}
      <div className="technical-label mb-1">{label}</div>
      <div
        className={cn(
          "text-xl font-bold tracking-tight",
          mono && "font-mono tabular-nums"
        )}
      >
        {countUp && typeof value === "number" && isInView ? (
          <CountUp target={value} suffix={suffix} />
        ) : (
          <>
            {value}
            {suffix}
          </>
        )}
      </div>
    </motion.div>
  );
}

/**
 * Animated count-up number display.
 */
function CountUp({
  target,
  suffix = "",
  duration = 1200,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  return (
    <span>
      {current.toLocaleString()}
      {suffix}
    </span>
  );
}

/**
 * Inline stat for use within cards (label + value pair).
 */
export function InlineStat({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </div>
      <div className="text-sm font-semibold font-mono tabular-nums mt-0.5">
        {value}
      </div>
    </div>
  );
}
