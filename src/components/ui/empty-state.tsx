import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-12 px-6", className)}>
      {icon && (
        <div className="flex items-center justify-center w-10 h-10 rounded-card bg-surface-2 text-ink-muted mb-4 shrink-0">
          {icon}
        </div>
      )}
      <p className="text-[15px] font-[500] leading-[1.3] tracking-[-0.02em] text-ink">{title}</p>
      {description && (
        <p className="mt-1.5 text-[13px] font-[450] leading-[1.5] tracking-[-0.02em] text-ink-muted max-w-[280px]">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
