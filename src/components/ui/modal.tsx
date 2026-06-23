"use client";

import { useEffect } from "react";
import { RiCloseLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg", xl: "max-w-xl" };

export function Modal({ open, onClose, title, description, children, footer, size = "md", className }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className={cn("relative w-full rounded-card border border-stroke bg-surface shadow-xl", sizeMap[size], className)}>
        {(title || description) && (
          <div className="flex items-start justify-between gap-4 border-b border-stroke px-5 py-4">
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
        )}
        {children && <div className="px-5 py-4">{children}</div>}
        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-stroke bg-surface-2 px-5 py-3 rounded-b-card">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
