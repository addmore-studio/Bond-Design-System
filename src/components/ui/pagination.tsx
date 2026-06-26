"use client";

import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  page: number;
  total: number;
  onChange: (page: number) => void;
  /** Number of sibling pages shown on each side of the current page */
  siblings?: number;
  className?: string;
}

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function Pagination({ page, total, onChange, siblings = 1, className }: PaginationProps) {
  const left = Math.max(2, page - siblings);
  const right = Math.min(total - 1, page + siblings);

  const pages: (number | "...")[] = [1];
  if (left > 2) pages.push("...");
  pages.push(...range(left, right));
  if (right < total - 1) pages.push("...");
  if (total > 1) pages.push(total);

  const btnBase =
    "flex items-center justify-center h-8 min-w-[32px] px-1.5 rounded-input text-[13px] font-[450] leading-none tracking-[-0.02em] transition-colors cursor-pointer";

  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-0.5", className)}>
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className={cn(btnBase, "text-ink-muted hover:text-ink hover:bg-surface-2 disabled:opacity-40 disabled:pointer-events-none")}
      >
        <RiArrowLeftSLine size={16} />
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`e-${i}`} className={cn(btnBase, "text-ink-muted pointer-events-none select-none")}>
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              btnBase,
              p === page ? "bg-ink text-ink-inverse" : "text-ink hover:bg-surface-2"
            )}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= total}
        aria-label="Next page"
        className={cn(btnBase, "text-ink-muted hover:text-ink hover:bg-surface-2 disabled:opacity-40 disabled:pointer-events-none")}
      >
        <RiArrowRightSLine size={16} />
      </button>
    </nav>
  );
}
