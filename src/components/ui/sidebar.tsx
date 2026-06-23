import { RiMoreLine } from "@remixicon/react";
import { cn } from "@/lib/utils";
import { NavItem } from "@/components/ui/nav-item";
import { Menu, type MenuDef } from "@/components/ui/menu";

export interface SidebarNavSection {
  items: SidebarNavItem[];
}

export interface SidebarNavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  count?: number | string;
  highlight?: boolean;
  onClick?: () => void;
}

export interface SidebarProps {
  /** Logo / wordmark element */
  logo?: React.ReactNode;
  /** Compact logo shown in collapsed mode (icon only) */
  logoCollapsed?: React.ReactNode;
  /** Primary navigation section at the top */
  topItems?: SidebarNavItem[];
  /** Utility navigation section at the bottom */
  bottomItems?: SidebarNavItem[];
  /** Optional CTA card rendered between top items and bottom items (hidden when collapsed) */
  cta?: React.ReactNode;
  /** Collapsed mode — icon-only, narrow width */
  collapsed?: boolean;
  /**
   * When provided, a "More" nav item is appended to bottomItems. Clicking it opens
   * a popup Menu containing these items. The menu opens upward when expanded and to
   * the right when collapsed.
   */
  more?: MenuDef[];
  className?: string;
}

export function Sidebar({
  logo,
  logoCollapsed,
  topItems = [],
  bottomItems = [],
  cta,
  collapsed,
  more,
  className,
}: SidebarProps) {
  return (
    <div
      className={cn(
        "flex flex-col w-full h-full bg-surface-2 py-4 gap-2",
        collapsed ? "px-1" : "px-2",
        className
      )}
    >
      {(logo || logoCollapsed) && (
        <div className={cn("shrink-0 flex items-center", collapsed ? "justify-center h-12" : "px-2 pb-2")}>
          {collapsed ? (logoCollapsed ?? logo) : logo}
        </div>
      )}

      {topItems.length > 0 && (
        <div className="flex flex-col gap-0.5 shrink-0">
          {topItems.map((item, i) => (
            <NavItem key={i} {...item} collapsed={collapsed} />
          ))}
        </div>
      )}

      <div className="flex-1" />

      {!collapsed && cta && (
        <div className="shrink-0">
          {cta}
        </div>
      )}

      {(bottomItems.length > 0 || more) && (
        <div className="flex flex-col gap-0.5 shrink-0">
          {bottomItems.map((item, i) => (
            <NavItem key={i} {...item} collapsed={collapsed} />
          ))}
          {more && more.length > 0 && (
            <Menu
              trigger={
                <NavItem
                  icon={<RiMoreLine size={collapsed ? 20 : 16} />}
                  label="More"
                  collapsed={collapsed}
                />
              }
              items={more}
              side={collapsed ? "right" : "top"}
              align="start"
            />
          )}
        </div>
      )}
    </div>
  );
}

/** Promo / CTA card shown inside the sidebar */
export function SidebarCta({
  title,
  description,
  action,
  className,
}: {
  title: React.ReactNode;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-stroke bg-surface p-3 h-[164px]",
        className
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-right-bottom bg-no-repeat opacity-100 pointer-events-none"
        style={{ backgroundImage: "url('/sidebar-cta-bg.png')" }}
      />
      <div className="relative z-10 flex flex-col justify-between h-full">
        {title && (
          <p
            className="text-[16px] leading-[1.2] tracking-[-0.03em] text-ink"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </p>
        )}
        <div>
          {description && (
            <p className="text-[13px] text-ink-muted leading-[1.5]">{description}</p>
          )}
          {action && <div className="mt-2">{action}</div>}
        </div>
      </div>
    </div>
  );
}
