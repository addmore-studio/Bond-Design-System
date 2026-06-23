import { RiArrowUpLine, RiArrowDownLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  label: string;
  value: string | number;
  /** Percentage change. Positive = up (green), negative = down (red) */
  trend?: number;
  /** Label next to the trend (e.g. "vs last month") */
  trendLabel?: string;
  /** Icon shown in the top-right corner */
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ label, value, trend, trendLabel, icon, className }: StatCardProps) {
  const hasTrend = trend !== undefined;
  const isUp = (trend ?? 0) >= 0;

  return (
    <div className={cn("rounded-card border border-stroke bg-surface overflow-hidden flex flex-col", className)}>
      {/* Main body */}
      <div className="flex flex-col gap-2 px-4 pt-4 pb-4 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[13px] font-[450] leading-[1.5] tracking-[-0.02em] text-ink-muted">{label}</p>
          {icon && (
            <span className="shrink-0 flex items-center text-ink-muted">{icon}</span>
          )}
        </div>
        <p className="text-[28px] font-[500] leading-none tracking-[-0.04em] text-ink">
          {value}
        </p>
      </div>

      {/* Trend footer — no divider, bg contrast separates naturally */}
      {hasTrend && (
        <div className="flex items-center gap-1.5 bg-surface-2 px-4 py-3 rounded-b-[12px]">
          <span className={cn(
            "inline-flex items-center gap-0.5 text-[12px] font-[500] leading-none",
            isUp ? "text-green-500" : "text-red-500"
          )}>
            {isUp ? <RiArrowUpLine size={13} /> : <RiArrowDownLine size={13} />}
            {Math.abs(trend!)}%
          </span>
          {trendLabel && (
            <span className="text-[12px] font-[450] text-ink-muted">{trendLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
