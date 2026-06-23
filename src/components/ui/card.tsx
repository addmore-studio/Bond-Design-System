import { cn } from "@/lib/utils";

export interface CardProps {
  children?: React.ReactNode;
  /** Adds a title in the card header */
  title?: string;
  /** Adds a description below the title */
  description?: string;
  /** Content rendered in the card footer */
  footer?: React.ReactNode;
  /** Controls inner padding size */
  padding?: "sm" | "md" | "lg";
  className?: string;
}

const paddingMap = {
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export function Card({
  children,
  title,
  description,
  footer,
  padding = "md",
  className,
}: CardProps) {
  const hasHeader = title || description;

  return (
    <div
      className={cn(
        "bg-surface border border-stroke rounded-card overflow-hidden",
        className
      )}
    >
      {hasHeader && (
        <div className={cn("border-b border-stroke", paddingMap[padding])}>
          {title && (
            <p className="text-[13px] font-[500] leading-[1.5] tracking-[-0.02em] text-ink">
              {title}
            </p>
          )}
          {description && (
            <p className="mt-0.5 text-[13px] font-[450] leading-[1.5] tracking-[-0.02em] text-ink-muted">
              {description}
            </p>
          )}
        </div>
      )}

      {children && (
        <div className={paddingMap[padding]}>{children}</div>
      )}

      {footer && (
        <div
          className={cn(
            "border-t border-stroke bg-surface-2",
            paddingMap[padding]
          )}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
