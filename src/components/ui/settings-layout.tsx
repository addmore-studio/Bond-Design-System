"use client";

import { cn } from "@/lib/utils";

export interface SettingsSection {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface SettingsLayoutProps {
  sections: SettingsSection[];
  activeSection: string;
  onSectionChange: (id: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function SettingsLayout({
  sections,
  activeSection,
  onSectionChange,
  children,
  className,
}: SettingsLayoutProps) {
  return (
    <div className={cn("flex gap-6 w-full", className)}>
      {/* Sidebar nav */}
      <nav className="shrink-0 w-44 flex flex-col gap-0.5">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={cn(
              "flex items-center gap-2.5 w-full rounded-input px-2.5 py-1.5 text-left text-[13px] font-[450] transition-colors",
              activeSection === section.id
                ? "bg-surface-2 text-ink font-[500]"
                : "text-ink-muted hover:bg-surface-2 hover:text-ink"
            )}
          >
            {section.icon && (
              <span className="shrink-0 flex items-center">{section.icon}</span>
            )}
            {section.label}
          </button>
        ))}
      </nav>

      {/* Content area */}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

export interface SettingsSectionCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function SettingsSectionCard({
  title,
  description,
  children,
  footer,
  className,
}: SettingsSectionCardProps) {
  return (
    <div className={cn("rounded-card border border-stroke bg-surface overflow-hidden", className)}>
      <div className="px-5 py-4 border-b border-stroke">
        <p className="text-[14px] font-[500] tracking-[-0.02em] text-ink">{title}</p>
        {description && (
          <p className="mt-0.5 text-[13px] font-[450] text-ink-muted">{description}</p>
        )}
      </div>
      <div className="px-5 py-4">{children}</div>
      {footer && (
        <div className="flex items-center justify-end gap-2 border-t border-stroke bg-surface-2 px-5 py-3">
          {footer}
        </div>
      )}
    </div>
  );
}

export interface SettingsRowProps {
  label: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function SettingsRow({ label, description, children, className }: SettingsRowProps) {
  return (
    <div className={cn("flex items-start gap-4 py-3 first:pt-0 last:pb-0 border-b border-stroke last:border-0", className)}>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-[500] text-ink">{label}</p>
        {description && (
          <p className="mt-0.5 text-[12px] text-ink-muted">{description}</p>
        )}
      </div>
      <div className="shrink-0 flex items-center gap-2">{children}</div>
    </div>
  );
}
