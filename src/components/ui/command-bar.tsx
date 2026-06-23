"use client";

import { useEffect, useRef, useState } from "react";
import { RiSearchLine, RiCornerDownLeftLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  onSelect: () => void;
}

export interface CommandGroup {
  label: string;
  items: CommandItem[];
}

export interface CommandBarProps {
  open: boolean;
  onClose: () => void;
  groups: CommandGroup[];
  placeholder?: string;
}

export function CommandBar({ open, onClose, groups, placeholder = "Search commands…" }: CommandBarProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = groups
    .map((g) => ({
      ...g,
      items: g.items.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((g) => g.items.length > 0);

  const flatItems = filtered.flatMap((g) => g.items);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, flatItems.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        flatItems[activeIndex]?.onSelect();
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, flatItems, activeIndex, onClose]);

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-[560px] rounded-card border border-stroke bg-surface shadow-2xl overflow-hidden mx-4">
        {/* Search input */}
        <div className="flex items-center gap-2.5 border-b border-stroke px-4 py-3">
          <RiSearchLine size={15} className="shrink-0 text-ink-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-[14px] font-[450] text-ink placeholder:text-ink-muted outline-none"
          />
          <kbd className="shrink-0 hidden sm:inline-flex items-center gap-0.5 rounded bg-surface-2 border border-stroke px-1.5 py-0.5 text-[10px] font-[500] text-ink-muted">
            esc
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[360px] overflow-y-auto py-1.5">
          {flatItems.length === 0 ? (
            <p className="px-4 py-8 text-center text-[13px] text-ink-muted">No results found</p>
          ) : (
            (() => {
              let globalIndex = 0;
              return filtered.map((group) => (
                <div key={group.label}>
                  <p className="px-3 py-1.5 text-[10px] font-[600] uppercase tracking-widest text-ink-muted">
                    {group.label}
                  </p>
                  {group.items.map((item) => {
                    const idx = globalIndex++;
                    return (
                      <button
                        key={item.id}
                        data-index={idx}
                        onMouseEnter={() => setActiveIndex(idx)}
                        onClick={() => { item.onSelect(); onClose(); }}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 text-left transition-colors",
                          activeIndex === idx ? "bg-surface-2" : "hover:bg-surface-2"
                        )}
                      >
                        {item.icon && (
                          <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded bg-surface-2 text-ink-muted">
                            {item.icon}
                          </span>
                        )}
                        <span className="flex-1 min-w-0">
                          <span className="block text-[13px] font-[500] text-ink truncate">{item.label}</span>
                          {item.description && (
                            <span className="block text-[11px] text-ink-muted truncate">{item.description}</span>
                          )}
                        </span>
                        {item.shortcut && (
                          <kbd className="shrink-0 hidden sm:inline-flex items-center gap-0.5 rounded bg-surface-2 border border-stroke px-1.5 py-0.5 text-[10px] font-[500] text-ink-muted">
                            {item.shortcut}
                          </kbd>
                        )}
                        {activeIndex === idx && (
                          <RiCornerDownLeftLine size={13} className="shrink-0 text-ink-muted" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ));
            })()
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center gap-3 border-t border-stroke px-4 py-2">
          <span className="flex items-center gap-1 text-[11px] text-ink-muted">
            <kbd className="inline-flex items-center rounded bg-surface-2 border border-stroke px-1 py-0.5 text-[10px] font-[500]">↑↓</kbd>
            navigate
          </span>
          <span className="flex items-center gap-1 text-[11px] text-ink-muted">
            <kbd className="inline-flex items-center rounded bg-surface-2 border border-stroke px-1 py-0.5 text-[10px] font-[500]">↵</kbd>
            select
          </span>
        </div>
      </div>
    </div>
  );
}
