"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  label: string;
  value: string;
  /** Optional badge shown next to the label (e.g. count or "+50") */
  count?: number | string;
}

export interface TabsProps {
  tabs: TabItem[];
  /** Controlled active value */
  value?: string;
  /** Uncontrolled initial active value - defaults to first tab */
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function Tabs({
  tabs,
  value: controlledValue,
  defaultValue,
  onChange,
  className,
}: TabsProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? tabs[0]?.value
  );

  const value = isControlled ? controlledValue : internalValue;

  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number } | null>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const btn = buttonRefs.current.get(value ?? "");
    const container = containerRef.current;
    if (!btn || !container) return;
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setIndicatorStyle({
      left: btnRect.left - containerRect.left,
      width: btnRect.width,
    });
  }, [value, tabs]);

  function handleSelect(tabValue: string) {
    if (!isControlled) setInternalValue(tabValue);
    onChange?.(tabValue);
  }

  return (
    <div ref={containerRef} className={cn("relative inline-flex items-center", className)}>
      {/* Sliding indicator */}
      {indicatorStyle && (
        <span
          className="absolute inset-y-0 rounded-input bg-surface-2 transition-all duration-200 ease-out pointer-events-none"
          style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
        />
      )}
      {tabs.map((tab) => {
        const isActive = tab.value === value;
        return (
          <button
            key={tab.value}
            ref={(el) => {
              if (el) buttonRefs.current.set(tab.value, el);
              else buttonRefs.current.delete(tab.value);
            }}
            onClick={() => handleSelect(tab.value)}
            className={cn(
              "relative flex items-center gap-1 px-3 py-[6px] rounded-input text-[13px] font-[450] leading-[1.5] tracking-[-0.02em] text-ink transition-opacity cursor-pointer whitespace-nowrap z-10",
              isActive ? "opacity-100" : "opacity-50 hover:opacity-75"
            )}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={cn(isActive ? "opacity-50" : "text-ink-muted")}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
