"use client";

import { useEffect, useRef, useState } from "react";
import { RiArrowDownSLine, RiCheckLine, RiCloseLine, RiSearchLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

export interface DropdownOption {
  type?: "option";
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface DropdownHeading {
  type: "heading";
  label: string;
}

export interface DropdownSeparator {
  type: "separator";
}

export type DropdownItem = DropdownOption | DropdownHeading | DropdownSeparator;

export interface DropdownGroup {
  key: string;
  title?: string;
  options: DropdownOption[];
  defaultValue?: string;
}

export interface DropdownProps {
  /** Placeholder label shown when nothing is selected */
  label: string;
  /** Flat list of options (supports DropdownHeading and DropdownSeparator too) */
  options?: DropdownItem[];
  /**
   * Grouped mode - each group independently tracks one selection.
   * The trigger shows each group's selected label joined by " - ".
   */
  groups?: DropdownGroup[];
  /** Controlled selected value - string for single, string[] for multiple */
  value?: string | string[];
  /** Uncontrolled initial selected value */
  defaultValue?: string | string[];
  onChange?: (value: string | string[] | undefined) => void;
  /** Called when a grouped selection changes. Receives the full group values map. */
  onGroupChange?: (values: Record<string, string | undefined>) => void;
  /** Icon shown inside the trigger */
  icon?: React.ReactNode;
  /** Adds a search input inside the menu to filter options by label */
  searchable?: boolean;
  /** Enables checkbox-style multi-select */
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
}

function isOption(item: DropdownItem): item is DropdownOption {
  return item.type === "option" || item.type === undefined;
}

export function Dropdown({
  label,
  options,
  groups,
  value: controlledValue,
  defaultValue,
  onChange,
  onGroupChange,
  icon,
  searchable,
  multiple,
  disabled,
  className,
}: DropdownProps) {
  const isGrouped = !!groups;
  const isControlled = !isGrouped && controlledValue !== undefined;

  const [internalValue, setInternalValue] = useState<string | string[] | undefined>(
    defaultValue ?? (multiple ? [] : undefined)
  );
  const [groupValues, setGroupValues] = useState<Record<string, string | undefined>>(() =>
    groups ? Object.fromEntries(groups.map((g) => [g.key, g.defaultValue])) : {}
  );
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const value = isControlled ? controlledValue : internalValue;
  const flatOptions = (options ?? []).filter(isOption) as DropdownOption[];

  const selectedValues: string[] = multiple
    ? Array.isArray(value) ? value : value ? [value as string] : []
    : [];
  const singleSelected = !multiple && !isGrouped
    ? flatOptions.find((o) => o.value === (value as string | undefined))
    : undefined;

  const hasGroupSelection = isGrouped && Object.values(groupValues).some((v) => v !== undefined);
  const hasSelection = isGrouped
    ? hasGroupSelection
    : multiple ? selectedValues.length > 0 : !!singleSelected;

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    if (open && searchable) setTimeout(() => searchRef.current?.focus(), 0);
    if (!open) setQuery("");
  }, [open, searchable]);

  function handleSelect(optValue: string) {
    if (multiple) {
      const next = selectedValues.includes(optValue)
        ? selectedValues.filter((v) => v !== optValue)
        : [...selectedValues, optValue];
      if (!isControlled) setInternalValue(next);
      onChange?.(next.length === 0 ? undefined : next);
    } else {
      const next = optValue === (value as string | undefined) ? undefined : optValue;
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
      setOpen(false);
    }
  }

  function handleGroupSelect(groupKey: string, optValue: string) {
    const current = groupValues[groupKey];
    const next = optValue === current ? undefined : optValue;
    const updated = { ...groupValues, [groupKey]: next };
    setGroupValues(updated);
    onGroupChange?.(updated);
    if (groups && groups.every((g) => updated[g.key] !== undefined)) setOpen(false);
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation();
    if (isGrouped) {
      const cleared = Object.fromEntries(Object.keys(groupValues).map((k) => [k, undefined]));
      setGroupValues(cleared);
      onGroupChange?.(cleared);
    } else {
      if (!isControlled) setInternalValue(multiple ? [] : undefined);
      onChange?.(undefined);
    }
  }

  function getTriggerLabel() {
    if (isGrouped) {
      // Only show the FIRST group's selection in the trigger label
      const firstGroup = groups![0];
      const selected = firstGroup?.options.find((o) => o.value === groupValues[firstGroup.key]);
      return selected?.label ?? label;
    }
    if (multiple) {
      if (selectedValues.length === 0) return label;
      if (selectedValues.length === 1)
        return flatOptions.find((o) => o.value === selectedValues[0])?.label ?? label;
      return `${selectedValues.length} selected`;
    }
    return singleSelected ? singleSelected.label : label;
  }

  function getFilteredItems(): DropdownItem[] {
    const items = options ?? [];
    if (!searchable || !query) return items;
    const result: DropdownItem[] = [];
    let pendingHeading: DropdownHeading | null = null;
    let pendingSeparator: DropdownSeparator | null = null;
    for (const item of items) {
      if (item.type === "separator") { pendingSeparator = item; continue; }
      if (item.type === "heading") { pendingHeading = item; continue; }
      const opt = item as DropdownOption;
      if (opt.label.toLowerCase().includes(query.toLowerCase())) {
        if (pendingSeparator && result.length > 0) result.push(pendingSeparator);
        if (pendingHeading) result.push(pendingHeading);
        pendingSeparator = null;
        pendingHeading = null;
        result.push(opt);
      }
    }
    return result;
  }

  const filtered = getFilteredItems();
  const hasResults = filtered.some(isOption);

  function renderOption(opt: DropdownOption, isSelected: boolean, onSelect: () => void) {
    return (
      <button
        key={opt.value}
        onClick={onSelect}
        className={cn(
          "flex w-full items-center gap-2 rounded-input px-2.5 py-[7px] text-[13px] font-[450] leading-[1.5] tracking-[-0.02em] transition-colors cursor-pointer text-left",
          isSelected ? "bg-bronze-100 text-bronze-800 dark:bg-bronze-900 dark:text-bronze-200" : "text-ink hover:bg-surface-2"
        )}
      >
        {multiple && (
          <span className={cn(
            "shrink-0 flex items-center justify-center w-[14px] h-[14px] rounded-sm border transition-colors",
            isSelected ? "bg-bronze-500 border-bronze-500" : "border-stroke-strong"
          )}>
            {isSelected && <RiCheckLine size={10} className="text-white" />}
          </span>
        )}
        {opt.icon && <span className="shrink-0 flex items-center">{opt.icon}</span>}
        <span className="flex-1">{opt.label}</span>
        {!multiple && isSelected && <RiCheckLine size={14} className="shrink-0 text-bronze-600" />}
      </button>
    );
  }

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={disabled}
        className={cn(
          "inline-flex h-8 items-center gap-[6px] rounded-lg px-2 py-[6px] text-[13px] font-[450] leading-[1.5] tracking-[-0.02em] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          hasSelection
            ? "bg-bronze-100 text-bronze-800 hover:bg-bronze-200 dark:bg-bronze-900 dark:text-bronze-200 dark:hover:bg-bronze-800"
            : "bg-btn-ghost-bg text-ink hover:bg-surface-2"
        )}
      >
        {icon && <span className="shrink-0 flex items-center">{icon}</span>}
        <span>{getTriggerLabel()}</span>
        {hasSelection ? (
          <RiCloseLine size={14} className="shrink-0 hover:opacity-60" onClick={handleClear} />
        ) : (
          <RiArrowDownSLine
            size={14}
            className={cn("shrink-0 transition-transform duration-150", open && "rotate-180")}
          />
        )}
      </button>

      {open && (
        <div className="absolute top-full left-0 z-50 mt-1.5 min-w-[180px] rounded-card border border-stroke bg-surface shadow-lg overflow-hidden">
          {searchable && (
            <div className="flex items-center gap-2 border-b border-stroke px-3 py-2">
              <RiSearchLine size={13} className="shrink-0 text-ink-muted" />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 bg-transparent text-[13px] text-ink placeholder:text-ink-muted outline-none"
              />
            </div>
          )}

          {isGrouped ? (
            <div className="p-1">
              {groups!.map((group, gi) => (
                <div key={group.key}>
                  {gi > 0 && <div className="my-1 h-px bg-stroke" />}
                  {group.title && (
                    <p className="px-2.5 pt-2 pb-1 text-[11px] font-[500] text-ink-muted">
                      {group.title}
                    </p>
                  )}
                  {group.options.map((opt) =>
                    renderOption(
                      opt,
                      groupValues[group.key] === opt.value,
                      () => handleGroupSelect(group.key, opt.value)
                    )
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-1">
              {!hasResults ? (
                <p className="px-2.5 py-[7px] text-[13px] text-ink-muted">No results</p>
              ) : (
                filtered.map((item, i) => {
                  if (item.type === "separator")
                    return <div key={`sep-${i}`} className="my-1 h-px bg-stroke" />;
                  if (item.type === "heading")
                    return (
                      <p key={`h-${i}`} className="px-2.5 pt-2 pb-1 text-[11px] font-[500] text-ink-muted">
                        {item.label}
                      </p>
                    );
                  const opt = item as DropdownOption;
                  const isSelected = multiple
                    ? selectedValues.includes(opt.value)
                    : opt.value === (value as string | undefined);
                  return renderOption(opt, isSelected, () => handleSelect(opt.value));
                })
              )}
            </div>
          )}

          {!isGrouped && multiple && selectedValues.length > 0 && (
            <div className="border-t border-stroke p-1">
              <button
                onClick={handleClear}
                className="flex w-full items-center justify-center rounded-input px-2.5 py-[7px] text-[13px] font-[450] text-ink-muted hover:text-ink hover:bg-surface-2 transition-colors cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
