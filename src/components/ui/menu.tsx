"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CountBadge, Kbd } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";

export interface MenuItemDef {
  type?: "item";
  label: string;
  value: string;
  icon?: React.ReactNode;
  /** Badge count shown at the trailing edge */
  count?: number | string;
  /** Renders the count badge in brand bronze */
  highlight?: boolean;
  /** Keyboard shortcut shown at the trailing edge (e.g. "⌘K") */
  shortcut?: string;
  destructive?: boolean;
  /** Tooltip shown on hover — use for descriptions or extra context */
  tooltip?: string;
}

export interface MenuSeparatorDef {
  type: "separator";
}

export interface MenuHeadingDef {
  type: "heading";
  label: string;
}

export type MenuDef = MenuItemDef | MenuSeparatorDef | MenuHeadingDef;

export interface MenuProps {
  /** The element that toggles the menu */
  trigger: React.ReactNode;
  items: MenuDef[];
  onSelect?: (value: string) => void;
  /**
   * Which side of the trigger the menu opens on.
   * @default "bottom"
   */
  side?: "top" | "bottom" | "right" | "left";
  /**
   * Alignment along the cross axis.
   * @default "start"
   */
  align?: "start" | "end" | "center";
  className?: string;
}

const sideClasses: Record<string, string> = {
  bottom: "top-full mt-1.5",
  top: "bottom-full mb-1.5",
  right: "left-full ml-1.5 top-0",
  left: "right-full mr-1.5 top-0",
};

const alignClasses: Record<string, Record<string, string>> = {
  bottom: { start: "left-0", end: "right-0", center: "left-1/2 -translate-x-1/2" },
  top:    { start: "left-0", end: "right-0", center: "left-1/2 -translate-x-1/2" },
  right:  { start: "top-0", end: "bottom-0", center: "top-1/2 -translate-y-1/2" },
  left:   { start: "top-0", end: "bottom-0", center: "top-1/2 -translate-y-1/2" },
};

export function Menu({
  trigger,
  items,
  onSelect,
  side = "bottom",
  align = "start",
  className,
}: MenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div onClick={() => setOpen((o) => !o)} className="cursor-pointer">
        {trigger}
      </div>

      {open && (
        <div
          className={cn(
            "absolute z-50 min-w-[180px] rounded-card border border-stroke bg-surface shadow-lg overflow-hidden",
            sideClasses[side],
            alignClasses[side][align]
          )}
        >
          <div className="p-1">
            {items.map((item, i) => {
              if (item.type === "separator") {
                return <div key={`sep-${i}`} className="my-1 h-px bg-stroke" />;
              }
              if (item.type === "heading") {
                return (
                  <p key={`h-${i}`} className="px-2.5 pt-2 pb-1 text-[11px] font-[500] text-ink-muted">
                    {item.label}
                  </p>
                );
              }
              const btn = (
                <button
                  key={item.value}
                  onClick={() => {
                    onSelect?.(item.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-input px-2.5 py-[7px] text-[13px] font-[450] leading-[1.5] tracking-[-0.02em] transition-colors cursor-pointer text-left",
                    item.destructive
                      ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                      : "text-ink hover:bg-surface-2"
                  )}
                >
                  {item.icon && (
                    <span className="shrink-0 flex items-center text-ink-muted">{item.icon}</span>
                  )}
                  <span className="flex-1">{item.label}</span>
                  {item.count !== undefined && (
                    <CountBadge variant={item.highlight ? "highlight" : "default"}>{item.count}</CountBadge>
                  )}
                  {item.shortcut && item.count === undefined && (
                    <Kbd shortcut={item.shortcut} />
                  )}
                </button>
              );
              return item.tooltip ? (
                <Tooltip key={item.value} label={item.tooltip} side="right" className="w-full">
                  {btn}
                </Tooltip>
              ) : btn;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
