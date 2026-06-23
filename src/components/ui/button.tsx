import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[6px] rounded-lg font-[450] text-[13px] leading-[1.5] tracking-[-0.02em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:     "bg-btn-primary-bg text-btn-primary-fg hover:bg-btn-primary-bg/85",
        outline:     "border border-stroke bg-transparent text-ink hover:bg-surface-2",
        ghost:       "bg-btn-ghost-bg text-btn-ghost-fg hover:bg-surface-2",
        glass:       "bg-btn-glass-bg text-ink backdrop-blur-sm border border-stroke-glass hover:bg-btn-glass-bg/80",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        success:     "bg-btn-success-bg text-btn-success-fg hover:bg-btn-success-bg/85",
        warning:     "bg-btn-warning-bg text-btn-warning-fg hover:bg-btn-warning-bg/85",
        magic:       "btn-magic text-sand-200",
      },
      size: {
        sm: "h-[26px] px-2 py-1 text-[12px]",
        md: "h-8 px-3 py-[6px]",
        lg: "h-10 px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
