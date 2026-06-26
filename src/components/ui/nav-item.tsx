import { cn } from "@/lib/utils";
import { CountBadge, Kbd } from "@/components/ui/badge";

export interface NavItemProps {
  /** Icon element, typically 16–18px (20px recommended in collapsed mode) */
  icon: React.ReactNode;
  label: string;
  /** Whether this item is the currently active/selected route */
  active?: boolean;
  /**
   * Optional badge count shown at the trailing edge.
   * Use `highlight` to render it in brand bronze instead of neutral.
   */
  count?: number | string;
  /** Renders the count badge in brand bronze (e.g. for "What's new") */
  highlight?: boolean;
  /**
   * Keyboard shortcut shown at the trailing edge (e.g. "⌘K").
   * Each character is rendered as an individual key chip.
   */
  shortcut?: string;
  /** Collapsed mode — icon only, 56×56px square centered. highlight shows a dot instead of a badge. */
  collapsed?: boolean;
  onClick?: () => void;
  className?: string;
}

export function NavItem({
  icon,
  label,
  active,
  count,
  highlight,
  shortcut,
  collapsed,
  onClick,
  className,
}: NavItemProps) {
  if (collapsed) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "group relative flex w-14 h-14 items-center justify-center rounded-input transition-colors cursor-pointer",
          active ? "bg-surface" : "hover:bg-surface",
          className
        )}
      >
        <span className={cn("flex items-center", highlight && !active ? "text-bronze-500" : "text-ink-muted")}>
          {icon}
        </span>
        {highlight && count !== undefined && (
          <span className="absolute top-[18px] right-[10px] w-1.5 h-1.5 rounded-full bg-bronze-500" />
        )}
        {/* Tooltip */}
        <span className="pointer-events-none absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 whitespace-nowrap rounded-full bg-ink px-2 py-1.5 text-[11px] font-[450] leading-none tracking-[-0.02em] text-ink-inverse opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          {label}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-1 px-2 py-[6px] rounded-input text-[13px] font-[450] leading-[1.5] tracking-[-0.02em] transition-colors cursor-pointer text-left",
        active
          ? "bg-surface text-ink"
          : "text-ink hover:bg-surface",
        highlight && !active && "text-bronze-500",
        className
      )}
    >
      <span className={cn("shrink-0 flex items-center", highlight && !active ? "text-bronze-500" : "text-ink-muted")}>{icon}</span>
      <span className="flex-1 min-w-0 truncate">{label}</span>
      {count !== undefined && (
        <CountBadge variant={active || highlight ? "highlight" : "default"}>{count}</CountBadge>
      )}
      {shortcut && count === undefined && <Kbd shortcut={shortcut} />}
    </button>
  );
}
