import { cn } from "@/lib/utils";

export interface BadgeProps {
  children: React.ReactNode;
  /** Optional icon shown at the leading edge */
  icon?: React.ReactNode;
  /**
   * Color variant.
   * - `bronze` (default) — brand bronze pill
   * - `neutral` — subtle grey
   * - `success` — green
   * - `warning` — orange
   * - `danger` — red
   */
  variant?: "bronze" | "neutral" | "success" | "warning" | "danger";
  className?: string;
}

const variantClasses: Record<string, string> = {
  bronze:  "bg-bronze-400 text-white dark:bg-bronze-600 dark:text-bronze-100",
  neutral: "bg-surface-3 text-ink-secondary",
  success: "bg-green-500 text-white dark:bg-green-600 dark:text-green-100",
  warning: "bg-orange-500 text-white dark:bg-orange-600 dark:text-orange-100",
  danger:  "bg-red-500 text-white dark:bg-red-600 dark:text-red-100",
};

export function Badge({ children, icon, variant = "bronze", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 text-[11px] font-[450] leading-none tracking-[-0.02em] whitespace-nowrap shrink-0",
        variantClasses[variant],
        className
      )}
    >
      {icon && <span className="shrink-0 flex items-center opacity-80">{icon}</span>}
      {children}
    </span>
  );
}

/** Keyboard shortcut display — renders each character as an individual key chip */
export function Kbd({ shortcut }: { shortcut: string }) {
  return (
    <span className="shrink-0 flex items-center gap-0.5">
      {shortcut.split("").map((key, i) => (
        <kbd
          key={i}
          className="inline-flex items-center justify-center min-w-[16px] h-4 px-1 rounded text-[10px] font-[450] leading-none text-ink-muted bg-surface-2 border border-stroke"
        >
          {key}
        </kbd>
      ))}
    </span>
  );
}

/** Small count pill used in nav items and menus */
export function CountBadge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "highlight";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-[450] leading-none tracking-[-0.02em] shrink-0",
        variant === "highlight" ? "bg-bronze-400 text-sand-200" : "bg-surface-3 text-ink-secondary",
        className
      )}
    >
      {children}
    </span>
  );
}
