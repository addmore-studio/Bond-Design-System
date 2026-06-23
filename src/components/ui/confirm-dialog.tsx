"use client";

import { useEffect } from "react";
import { RiErrorWarningLine } from "@remixicon/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** "destructive" shows a red confirm button, "warning" shows amber */
  variant?: "destructive" | "warning";
  loading?: boolean;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "destructive",
  loading = false,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-card border border-stroke bg-surface shadow-xl">
        <div className="flex flex-col items-center gap-3 px-6 pt-6 pb-4 text-center">
          <span className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full",
            variant === "destructive"
              ? "bg-red-50 text-red-500 dark:bg-red-950/40"
              : "bg-amber-50 text-amber-500 dark:bg-amber-950/40"
          )}>
            <RiErrorWarningLine size={20} />
          </span>
          <div>
            <p className="text-[15px] font-[500] tracking-[-0.02em] text-ink">{title}</p>
            {description && (
              <p className="mt-1 text-[13px] font-[450] leading-[1.5] text-ink-muted">{description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-stroke bg-surface-2 rounded-b-card px-5 py-3">
          <Button variant="outline" className="flex-1" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === "destructive" ? "destructive" : "warning"}
            className="flex-1"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Loading…" : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
