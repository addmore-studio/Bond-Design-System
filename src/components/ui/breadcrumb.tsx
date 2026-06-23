import { RiArrowRightSLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center flex-wrap gap-0.5", className)}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-0.5">
            {i > 0 && <RiArrowRightSLine size={14} className="text-ink-muted shrink-0" />}
            {isLast ? (
              <span className="text-[13px] font-[450] leading-[1.5] tracking-[-0.02em] text-ink px-1">
                {item.label}
              </span>
            ) : (
              <button
                onClick={item.onClick}
                className="text-[13px] font-[450] leading-[1.5] tracking-[-0.02em] text-ink-muted hover:text-ink transition-colors cursor-pointer px-1 rounded"
              >
                {item.label}
              </button>
            )}
          </span>
        );
      })}
    </nav>
  );
}
