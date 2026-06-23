"use client";

import { useState } from "react";
import { RiArrowDownSLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  key: string;
  label: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Allow multiple items open simultaneously */
  multiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

export function Accordion({ items, multiple = false, defaultOpen = [], className }: AccordionProps) {
  const [open, setOpen] = useState<Set<string>>(new Set(defaultOpen));

  function toggle(key: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        if (!multiple) next.clear();
        next.add(key);
      }
      return next;
    });
  }

  return (
    <div className={cn("rounded-card border border-stroke divide-y divide-stroke overflow-hidden", className)}>
      {items.map((item) => {
        const isOpen = open.has(item.key);
        return (
          <div key={item.key}>
            <button
              onClick={() => toggle(item.key)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-[13px] font-[500] leading-[1.5] tracking-[-0.02em] text-ink hover:bg-surface-2 transition-colors cursor-pointer text-left"
            >
              <span>{item.label}</span>
              <RiArrowDownSLine
                size={16}
                className={cn("shrink-0 text-ink-muted transition-transform duration-200", isOpen && "rotate-180")}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pt-2 text-[13px] font-[450] leading-[1.6] tracking-[-0.02em] text-ink-muted bg-surface">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
