"use client";

import { useState, useRef, useEffect } from "react";
import { RiArrowDownSLine, RiSearchLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

interface Country {
  code: string;
  name: string;
  dial: string;
  flag: string;
}

const COUNTRIES: Country[] = [
  { code: "AF", name: "Afghanistan", dial: "+93", flag: "🇦🇫" },
  { code: "AL", name: "Albania", dial: "+355", flag: "🇦🇱" },
  { code: "DZ", name: "Algeria", dial: "+213", flag: "🇩🇿" },
  { code: "AR", name: "Argentina", dial: "+54", flag: "🇦🇷" },
  { code: "AU", name: "Australia", dial: "+61", flag: "🇦🇺" },
  { code: "AT", name: "Austria", dial: "+43", flag: "🇦🇹" },
  { code: "BE", name: "Belgium", dial: "+32", flag: "🇧🇪" },
  { code: "BR", name: "Brazil", dial: "+55", flag: "🇧🇷" },
  { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
  { code: "CL", name: "Chile", dial: "+56", flag: "🇨🇱" },
  { code: "CN", name: "China", dial: "+86", flag: "🇨🇳" },
  { code: "CO", name: "Colombia", dial: "+57", flag: "🇨🇴" },
  { code: "HR", name: "Croatia", dial: "+385", flag: "🇭🇷" },
  { code: "CZ", name: "Czech Republic", dial: "+420", flag: "🇨🇿" },
  { code: "DK", name: "Denmark", dial: "+45", flag: "🇩🇰" },
  { code: "EG", name: "Egypt", dial: "+20", flag: "🇪🇬" },
  { code: "FI", name: "Finland", dial: "+358", flag: "🇫🇮" },
  { code: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
  { code: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
  { code: "GH", name: "Ghana", dial: "+233", flag: "🇬🇭" },
  { code: "GR", name: "Greece", dial: "+30", flag: "🇬🇷" },
  { code: "HK", name: "Hong Kong", dial: "+852", flag: "🇭🇰" },
  { code: "HU", name: "Hungary", dial: "+36", flag: "🇭🇺" },
  { code: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
  { code: "ID", name: "Indonesia", dial: "+62", flag: "🇮🇩" },
  { code: "IE", name: "Ireland", dial: "+353", flag: "🇮🇪" },
  { code: "IL", name: "Israel", dial: "+972", flag: "🇮🇱" },
  { code: "IT", name: "Italy", dial: "+39", flag: "🇮🇹" },
  { code: "JP", name: "Japan", dial: "+81", flag: "🇯🇵" },
  { code: "JO", name: "Jordan", dial: "+962", flag: "🇯🇴" },
  { code: "KE", name: "Kenya", dial: "+254", flag: "🇰🇪" },
  { code: "KR", name: "South Korea", dial: "+82", flag: "🇰🇷" },
  { code: "KW", name: "Kuwait", dial: "+965", flag: "🇰🇼" },
  { code: "LB", name: "Lebanon", dial: "+961", flag: "🇱🇧" },
  { code: "MY", name: "Malaysia", dial: "+60", flag: "🇲🇾" },
  { code: "MX", name: "Mexico", dial: "+52", flag: "🇲🇽" },
  { code: "MA", name: "Morocco", dial: "+212", flag: "🇲🇦" },
  { code: "NL", name: "Netherlands", dial: "+31", flag: "🇳🇱" },
  { code: "NZ", name: "New Zealand", dial: "+64", flag: "🇳🇿" },
  { code: "NG", name: "Nigeria", dial: "+234", flag: "🇳🇬" },
  { code: "NO", name: "Norway", dial: "+47", flag: "🇳🇴" },
  { code: "PK", name: "Pakistan", dial: "+92", flag: "🇵🇰" },
  { code: "PE", name: "Peru", dial: "+51", flag: "🇵🇪" },
  { code: "PH", name: "Philippines", dial: "+63", flag: "🇵🇭" },
  { code: "PL", name: "Poland", dial: "+48", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", dial: "+351", flag: "🇵🇹" },
  { code: "QA", name: "Qatar", dial: "+974", flag: "🇶🇦" },
  { code: "RO", name: "Romania", dial: "+40", flag: "🇷🇴" },
  { code: "RU", name: "Russia", dial: "+7", flag: "🇷🇺" },
  { code: "SA", name: "Saudi Arabia", dial: "+966", flag: "🇸🇦" },
  { code: "SG", name: "Singapore", dial: "+65", flag: "🇸🇬" },
  { code: "ZA", name: "South Africa", dial: "+27", flag: "🇿🇦" },
  { code: "ES", name: "Spain", dial: "+34", flag: "🇪🇸" },
  { code: "SE", name: "Sweden", dial: "+46", flag: "🇸🇪" },
  { code: "CH", name: "Switzerland", dial: "+41", flag: "🇨🇭" },
  { code: "TW", name: "Taiwan", dial: "+886", flag: "🇹🇼" },
  { code: "TH", name: "Thailand", dial: "+66", flag: "🇹🇭" },
  { code: "TR", name: "Turkey", dial: "+90", flag: "🇹🇷" },
  { code: "UA", name: "Ukraine", dial: "+380", flag: "🇺🇦" },
  { code: "AE", name: "United Arab Emirates", dial: "+971", flag: "🇦🇪" },
  { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
  { code: "VN", name: "Vietnam", dial: "+84", flag: "🇻🇳" },
];

export interface PhoneInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** ISO 3166-1 alpha-2 code for the default country (default: "US") */
  defaultCountry?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
}

export function PhoneInput({
  label,
  placeholder = "000 000 0000",
  value,
  defaultValue,
  onChange,
  defaultCountry = "US",
  helperText,
  error,
  disabled,
  readOnly,
  className,
}: PhoneInputProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [country, setCountry] = useState<Country>(
    () => COUNTRIES.find((c) => c.code === defaultCountry) ?? COUNTRIES.find((c) => c.code === "US")!
  );
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const currentValue = isControlled ? value : internalValue;

  function set(next: string) {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  }

  const filtered = search
    ? COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.dial.includes(search)
      )
    : COUNTRIES;

  function selectCountry(c: Country) {
    setCountry(c);
    setOpen(false);
    setSearch("");
  }

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    if (open) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  // Focus search when opened
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 0);
  }, [open]);

  const wrapperClass = cn(
    "flex items-center rounded-input border bg-surface px-2.5 h-8 transition-colors",
    error
      ? "border-red-400 focus-within:border-red-500 dark:border-red-800 dark:focus-within:border-red-600"
      : "border-stroke focus-within:border-stroke-strong",
    (disabled || readOnly) && "pointer-events-none opacity-50"
  );

  return (
    <div ref={containerRef} className={cn("relative flex flex-col gap-1", className)}>
      {label && (
        <label className="text-[13px] font-[500] leading-[1.5] tracking-[-0.02em] text-ink">
          {label}
        </label>
      )}

      <div className={wrapperClass}>
        {/* Country selector trigger */}
        <button
          type="button"
          onClick={() => !disabled && !readOnly && setOpen((v) => !v)}
          className="shrink-0 flex items-center gap-1 pr-2 border-r border-stroke mr-2 cursor-pointer"
        >
          <span className="text-[14px] leading-none">{country.flag}</span>
          <span className="text-[13px] font-[450] text-ink-muted tabular-nums">{country.dial}</span>
          <RiArrowDownSLine size={12} className="text-ink-muted" />
        </button>

        {/* Number input */}
        <input
          type="tel"
          inputMode="tel"
          value={currentValue}
          onChange={(e) => set(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          className="flex-1 min-w-0 bg-transparent text-[13px] font-[450] leading-[1.5] tracking-[-0.02em] text-ink placeholder:text-ink-muted outline-none"
        />
      </div>

      {(error || helperText) && (
        <p
          className={cn(
            "text-[12px] font-[450] leading-[1.5] tracking-[-0.02em]",
            error ? "text-red-500 dark:text-red-400" : "text-ink-muted"
          )}
        >
          {error ?? helperText}
        </p>
      )}

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 w-[260px] rounded-input border border-stroke bg-surface shadow-md overflow-hidden">
          {/* Search */}
          <div className="flex items-center gap-1.5 px-2.5 border-b border-stroke h-8">
            <RiSearchLine size={13} className="shrink-0 text-ink-muted" />
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country..."
              className="flex-1 min-w-0 bg-transparent text-[13px] font-[450] leading-[1.5] tracking-[-0.02em] text-ink placeholder:text-ink-muted outline-none"
            />
          </div>

          {/* Options */}
          <div className="max-h-[200px] overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <p className="px-3 py-2 text-[13px] text-ink-muted">No results</p>
            ) : (
              filtered.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => selectCountry(c)}
                  className={cn(
                    "flex w-full items-center gap-2 px-2.5 py-[5px] text-[13px] font-[450] text-ink hover:bg-surface-2 transition-colors cursor-pointer",
                    c.code === country.code && "bg-surface-2"
                  )}
                >
                  <span className="text-[14px] leading-none shrink-0">{c.flag}</span>
                  <span className="flex-1 min-w-0 truncate text-left">{c.name}</span>
                  <span className="shrink-0 text-ink-muted tabular-nums">{c.dial}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
