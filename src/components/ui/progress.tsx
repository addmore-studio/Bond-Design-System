import { cn } from "@/lib/utils";

export interface ProgressProps {
  /** Current value (0–max) */
  value: number;
  max?: number;
  variant?: "default" | "success" | "warning" | "danger";
  size?: "sm" | "md";
  /** Show percentage label at the trailing edge */
  showLabel?: boolean;
  className?: string;
}

const fillColor: Record<string, string> = {
  default: "bg-bronze-400",
  success: "bg-green-500",
  warning: "bg-orange-500",
  danger:  "bg-red-500",
};

export function Progress({ value, max = 100, variant = "default", size = "md", showLabel, className }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("flex-1 overflow-hidden rounded-full bg-surface-3", size === "sm" ? "h-1" : "h-1.5")}>
        <div
          className={cn("h-full rounded-full transition-all duration-300", fillColor[variant])}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="shrink-0 w-9 text-right text-[11px] font-[450] tabular-nums text-ink-muted">
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
}

export function Spinner({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={cn("animate-spin", className)}
      aria-label="Loading"
    >
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
      <path d="M8 2a6 6 0 0 1 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
