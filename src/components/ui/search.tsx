"use client";

import { useEffect, useRef, useState } from "react";
import { RiCloseLine, RiSearchLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

export interface SearchProps {
  placeholder?: string;
  /** Controlled input value */
  value?: string;
  /** Uncontrolled initial value */
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Start in expanded state */
  defaultExpanded?: boolean;
  className?: string;
}

export function Search({
  placeholder = "Search...",
  value: controlledValue,
  defaultValue,
  onChange,
  defaultExpanded = false,
  className,
}: SearchProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [expanded, setExpanded] = useState(defaultExpanded);
  const inputRef = useRef<HTMLInputElement>(null);

  const value = isControlled ? controlledValue : internalValue;

  function handleExpand() {
    setExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 10);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e.target.value);
  }

  function handleClear() {
    if (!isControlled) setInternalValue("");
    onChange?.("");
    setExpanded(false);
  }

  function handleBlur() {
    if (!value) setExpanded(false);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && expanded) {
        if (!isControlled) setInternalValue("");
        onChange?.("");
        setExpanded(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [expanded, isControlled, onChange]);

  return (
    <div
      className={cn(
        "flex h-8 items-center bg-btn-ghost-bg rounded-lg transition-[width] duration-200 ease-out overflow-hidden",
        expanded ? "w-52 px-2 gap-1.5" : "w-8 justify-center cursor-pointer hover:bg-surface-2",
        className
      )}
      onClick={!expanded ? handleExpand : undefined}
    >
      <RiSearchLine
        size={16}
        className="shrink-0 text-ink-muted"
      />

      {expanded && (
        <>
          <input
            ref={inputRef}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            className="flex-1 min-w-0 bg-transparent text-[13px] font-[450] leading-[1.5] tracking-[-0.02em] text-ink placeholder:text-ink-muted outline-none"
          />
          {value && (
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleClear}
              className="shrink-0 text-ink-muted hover:text-ink transition-colors cursor-pointer"
            >
              <RiCloseLine size={14} />
            </button>
          )}
        </>
      )}
    </div>
  );
}
