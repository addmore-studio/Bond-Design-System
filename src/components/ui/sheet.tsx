"use client";

import { useEffect } from "react";
import { RiCloseLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  side?: "right" | "left";
  width?: string;
  className?: string;
}

export function Sheet({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  side = "right",
  width = "400px",
  className,
}: SheetProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div
        className={cn(
          "relative flex flex-col bg-surface border border-stroke h-full",
          side === "right" ? "ml-auto rounded-l-card" : "mr-auto rounded-r-card",
          className
        )}
        style={{ width }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-stroke px-5 py-4 shrink-0">
          <div>
            {title && <p className="text-[15px] font-[500] leading-[1.3] tracking-[-0.02em] text-ink">{title}</p>}
            {description && <p className="mt-1 text-[13px] font-[450] leading-[1.5] tracking-[-0.02em] text-ink-muted">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 flex items-center justify-center w-7 h-7 rounded-input text-ink-muted hover:text-ink hover:bg-surface-2 transition-colors cursor-pointer"
          >
            <RiCloseLine size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>

        {footer && (
          <div className={cn("shrink-0 flex items-center justify-end gap-2 border-t border-stroke bg-surface-2 px-5 py-3", side === "right" ? "rounded-bl-card" : "rounded-br-card")}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
