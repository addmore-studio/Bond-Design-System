"use client";

import { createContext, useCallback, useContext, useState, useEffect } from "react";
import { RiCheckLine, RiErrorWarningLine, RiInformationLine, RiAlertLine, RiCloseLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

export type ToastVariant = "default" | "success" | "error" | "warning" | "info";

export interface ToastData {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  toast: (data: Omit<ToastData, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const variantConfig: Record<ToastVariant, { icon: React.ReactNode; iconClass: string }> = {
  default: { icon: null,                           iconClass: "" },
  success: { icon: <RiCheckLine size={14} />,       iconClass: "text-green-500 dark:text-green-400" },
  error:   { icon: <RiErrorWarningLine size={14} />, iconClass: "text-red-500 dark:text-red-400" },
  warning: { icon: <RiAlertLine size={14} />,        iconClass: "text-orange-500 dark:text-orange-400" },
  info:    { icon: <RiInformationLine size={14} />,  iconClass: "text-ink-muted" },
};

/** Standalone visual Toast item — use directly for static demos or build on top */
export function Toast({ toast, onDismiss }: { toast: ToastData; onDismiss?: (id: string) => void }) {
  const cfg = variantConfig[toast.variant ?? "default"];
  return (
    <div className="flex items-start gap-2.5 rounded-card border border-stroke bg-surface shadow-lg px-3.5 py-3 w-full sm:w-[320px] pointer-events-auto">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          {cfg.icon && (
            <span className={cn("shrink-0 flex items-center", cfg.iconClass)}>{cfg.icon}</span>
          )}
          <p className="text-[13px] font-[500] leading-[1.5] tracking-[-0.02em] text-ink">{toast.title}</p>
        </div>
        {toast.description && (
          <p className="text-[12px] font-[450] leading-[1.5] tracking-[-0.02em] text-ink-muted mt-0.5">{toast.description}</p>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={() => onDismiss(toast.id)}
          className="shrink-0 flex items-center text-ink-muted hover:text-ink transition-colors cursor-pointer mt-px"
        >
          <RiCloseLine size={14} />
        </button>
      )}
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: ToastData; onRemove: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), toast.duration ?? 4000);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  return <Toast toast={toast} onDismiss={onRemove} />;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((data: Omit<ToastData, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...data, id }]);
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onRemove={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
