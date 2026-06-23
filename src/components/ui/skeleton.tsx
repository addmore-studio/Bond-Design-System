import { cn } from "@/lib/utils";

export interface SkeletonProps {
  /** Shape variant */
  variant?: "rect" | "text" | "circle";
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function Skeleton({ variant = "rect", width, height, className }: SkeletonProps) {
  const style: React.CSSProperties = {};
  if (width !== undefined) style.width = typeof width === "number" ? `${width}px` : width;
  if (height !== undefined) style.height = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      style={style}
      className={cn(
        "animate-pulse bg-surface-3 shrink-0",
        variant === "circle" && "rounded-full",
        variant === "text"   && "rounded h-[14px] w-full",
        variant === "rect"   && "rounded-card",
        className
      )}
    />
  );
}
