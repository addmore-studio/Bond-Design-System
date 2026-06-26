'use client';

import { RiCheckLine, RiErrorWarningLine, RiInformationLine, RiAlertLine, RiCloseLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  description?: string;
  onDismiss?: () => void;
  className?: string;
}

const variants: Record<AlertVariant, { wrapperClass: string; iconClass: string; icon: React.ReactNode }> = {
  info:    { wrapperClass: "bg-surface-2 border-stroke",                                          iconClass: "text-ink-muted",   icon: <RiInformationLine size={14} /> },
  success: { wrapperClass: "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900",  iconClass: "text-green-500 dark:text-green-400",   icon: <RiCheckLine size={14} /> },
  warning: { wrapperClass: "bg-orange-50 border-orange-200 dark:bg-orange-950/30 dark:border-orange-900", iconClass: "text-orange-500 dark:text-orange-400",  icon: <RiAlertLine size={14} /> },
  danger:  { wrapperClass: "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900",          iconClass: "text-red-500 dark:text-red-400",     icon: <RiErrorWarningLine size={14} /> },
};

const textVariants: Record<AlertVariant, string> = {
  info:    "text-ink",
  success: "text-green-800 dark:text-green-300",
  warning: "text-orange-800 dark:text-orange-300",
  danger:  "text-red-800 dark:text-red-300",
};

export function Alert({ variant = "info", title, description, onDismiss, className }: AlertProps) {
  const v = variants[variant];
  return (
    <div className={cn("flex items-start gap-2.5 rounded-card border px-3.5 py-3", v.wrapperClass, className)}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className={cn("shrink-0 flex items-center", v.iconClass)}>{v.icon}</span>
          {title && (
            <p className={cn("text-[13px] font-[500] leading-[1.5] tracking-[-0.02em]", textVariants[variant])}>
              {title}
            </p>
          )}
        </div>
        {description && (
          <p className={cn("text-[13px] font-[450] leading-[1.5] tracking-[-0.02em]", textVariants[variant], title && "mt-0.5")}>
            {description}
          </p>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className={cn("shrink-0 flex items-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer mt-px", v.iconClass)}
        >
          <RiCloseLine size={14} />
        </button>
      )}
    </div>
  );
}
