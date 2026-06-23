import { RiUser3Line } from "@remixicon/react";
import { cn } from "@/lib/utils";

const sizeMap = {
  xs: { avatar: "w-5 h-5",   badge: "w-[9px] h-[9px]",   icon: 10, text: "text-[7px]",  badgeIcon: 5  },
  sm: { avatar: "w-6 h-6",   badge: "w-[11px] h-[11px]", icon: 12, text: "text-[8px]",  badgeIcon: 6  },
  md: { avatar: "w-8 h-8",   badge: "w-[14px] h-[14px]", icon: 16, text: "text-[11px]", badgeIcon: 8  },
  lg: { avatar: "w-10 h-10", badge: "w-[17px] h-[17px]", icon: 20, text: "text-[13px]", badgeIcon: 10 },
  xl: { avatar: "w-12 h-12", badge: "w-[21px] h-[21px]", icon: 24, text: "text-[15px]", badgeIcon: 12 },
};

export interface AvatarProps {
  /** Image URL for the user avatar */
  src?: string;
  /** Alt text for the avatar image */
  alt?: string;
  /**
   * Initials shown when no image is provided (e.g. "JD").
   * Falls back to a user icon when omitted.
   */
  fallback?: string;
  /** Company / workspace logo URL — shown as a small badge at the bottom-right */
  companySrc?: string;
  /** Alt text for the company badge image */
  companyAlt?: string;
  /** Initials shown in the company badge when no image is provided */
  companyFallback?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Avatar({
  src,
  alt,
  fallback,
  companySrc,
  companyAlt,
  companyFallback,
  size = "md",
  className,
}: AvatarProps) {
  const s = sizeMap[size];
  const hasCompany = companySrc || companyFallback;

  return (
    <span className={cn("relative inline-flex shrink-0", s.avatar, className)}>
      {/* Main avatar */}
      <span className={cn("flex items-center justify-center rounded-full overflow-hidden bg-surface-3 text-ink w-full h-full")}>
        {src ? (
          <img src={src} alt={alt ?? ""} className="w-full h-full object-cover" />
        ) : fallback ? (
          <span className={cn("font-[500] leading-none tracking-tight select-none", s.text)}>
            {fallback.slice(0, 2)}
          </span>
        ) : (
          <RiUser3Line size={s.icon} className="text-ink-muted" />
        )}
      </span>

      {/* Company badge */}
      {hasCompany && (
        <span
          className={cn(
            "absolute bottom-0 right-0 flex items-center justify-center rounded-full overflow-hidden bg-surface-3 ring-[1.5px] ring-surface",
            s.badge
          )}
        >
          {companySrc ? (
            <img src={companySrc} alt={companyAlt ?? ""} className="w-full h-full object-cover" />
          ) : companyFallback ? (
            <span className={cn("font-[500] leading-none tracking-tight select-none text-ink", s.text === "text-[7px]" ? "text-[5px]" : "text-[6px]")}>
              {companyFallback.slice(0, 1)}
            </span>
          ) : null}
        </span>
      )}
    </span>
  );
}
