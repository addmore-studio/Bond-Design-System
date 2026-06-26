import { cn } from "@/lib/utils";

export interface TooltipProps {
  /** Text shown in the tooltip */
  label: string;
  children: React.ReactNode;
  /** Which side the tooltip appears on relative to the trigger */
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

const sideClasses: Record<string, string> = {
  top:    "bottom-full mb-1.5 left-1/2 -translate-x-1/2",
  bottom: "top-full mt-1.5 left-1/2 -translate-x-1/2",
  right:  "left-full ml-2 top-1/2 -translate-y-1/2",
  left:   "right-full mr-2 top-1/2 -translate-y-1/2",
};

export function Tooltip({ label, children, side = "top", className }: TooltipProps) {
  return (
    <span className={cn("group relative inline-flex", className)}>
      {children}
      <span
        className={cn(
          "pointer-events-none absolute z-50 whitespace-nowrap rounded-full bg-ink px-2 py-1.5 text-[11px] font-[450] leading-none tracking-[-0.02em] text-ink-inverse opacity-0 transition-opacity duration-150 group-hover:opacity-100",
          sideClasses[side]
        )}
      >
        {label}
      </span>
    </span>
  );
}
