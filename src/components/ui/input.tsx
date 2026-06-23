"use client";

import { useState } from "react";
import { RiAddLine, RiCloseLine, RiEyeLine, RiEyeOffLine, RiSubtractLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

export interface InputProps {
  /** Label shown above the field */
  label?: string;
  /**
   * Input type.
   * - `password` gets a show/hide toggle
   * - `number` gets +/− stepper buttons
   * - `textarea` renders a multi-line field (use `rows` to control height)
   */
  type?: "text" | "email" | "password" | "number" | "search" | "url" | "tel" | "textarea";
  placeholder?: string;
  /** Number of rows for textarea (default 3) */
  rows?: number;
  /** Controlled value */
  value?: string;
  /** Uncontrolled initial value */
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Icon shown at the leading edge */
  leadingIcon?: React.ReactNode;
  /** Icon shown at the trailing edge (not shown for password/number) */
  trailingIcon?: React.ReactNode;
  /** Inline text prefix rendered inside the field (e.g. "$", "+1") */
  prefix?: string;
  /** Inline text suffix rendered inside the field (e.g. "%", ".com", "px") */
  suffix?: string;
  /** Helper text shown below the field */
  helperText?: string;
  /** Error message — shown in red, replaces helperText */
  error?: string;
  /** min for number inputs */
  min?: number;
  /** max for number inputs */
  max?: number;
  /** step for number inputs (default 1) */
  step?: number;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Input({
  label,
  type = "text",
  placeholder,
  rows = 3,
  value,
  defaultValue,
  onChange,
  leadingIcon,
  trailingIcon,
  prefix,
  suffix,
  helperText,
  error,
  min,
  max,
  step = 1,
  readOnly,
  disabled,
  className,
}: InputProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [showPassword, setShowPassword] = useState(false);

  const currentValue = isControlled ? value : internalValue;

  function set(next: string) {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    set(e.target.value);
  }

  function handleClear() {
    set("");
  }

  function handleStep(dir: 1 | -1) {
    const current = parseFloat(currentValue) || 0;
    const next = current + dir * step;
    if (min !== undefined && next < min) return;
    if (max !== undefined && next > max) return;
    set(String(next % 1 === 0 ? next : parseFloat(next.toFixed(10))));
  }

  const hasValue = !!currentValue;
  const isTextarea = type === "textarea";
  const isPassword = type === "password";
  const isNumber = type === "number";

  const sharedInputClass =
    "flex-1 min-w-0 bg-transparent text-[13px] font-[450] leading-[1.5] tracking-[-0.02em] text-ink placeholder:text-ink-muted outline-none";

  const wrapperClass = cn(
    "flex items-center gap-1.5 rounded-input border bg-surface px-2.5 transition-colors",
    isTextarea ? "h-auto py-2 items-start" : "h-8",
    error
      ? "border-red-400 focus-within:border-red-500"
      : "border-stroke focus-within:border-stroke-strong",
    (disabled || readOnly) && "pointer-events-none opacity-50"
  );

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && (
        <label className="text-[13px] font-[500] leading-[1.5] tracking-[-0.02em] text-ink">
          {label}
        </label>
      )}

      <div className={wrapperClass}>
        {leadingIcon && (
          <span className="shrink-0 flex items-center text-ink-muted mt-px">
            {leadingIcon}
          </span>
        )}

        {prefix && (
          <span className="shrink-0 text-[13px] font-[450] text-ink-muted select-none">
            {prefix}
          </span>
        )}

        {isTextarea ? (
          <textarea
            value={currentValue}
            onChange={handleChange}
            placeholder={placeholder}
            rows={rows}
            readOnly={readOnly}
            disabled={disabled}
            className={cn(sharedInputClass, "resize-none")}
          />
        ) : (
          <input
            type={isPassword ? (showPassword ? "text" : "password") : isNumber ? "text" : type}
            inputMode={isNumber ? "decimal" : undefined}
            value={currentValue}
            onChange={handleChange}
            placeholder={placeholder}
            readOnly={readOnly}
            disabled={disabled}
            className={sharedInputClass}
          />
        )}

        {suffix && (
          <span className="shrink-0 text-[13px] font-[450] text-ink-muted select-none">
            {suffix}
          </span>
        )}

        {/* Password toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="shrink-0 flex items-center text-ink-muted hover:text-ink transition-colors cursor-pointer"
          >
            {showPassword ? <RiEyeOffLine size={14} /> : <RiEyeLine size={14} />}
          </button>
        )}

        {/* Number stepper */}
        {isNumber && !isTextarea && (
          <div className="shrink-0 flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => handleStep(-1)}
              className="flex items-center justify-center w-4 h-4 rounded text-ink-muted hover:text-ink hover:bg-surface-2 transition-colors cursor-pointer"
            >
              <RiSubtractLine size={11} />
            </button>
            <button
              type="button"
              onClick={() => handleStep(1)}
              className="flex items-center justify-center w-4 h-4 rounded text-ink-muted hover:text-ink hover:bg-surface-2 transition-colors cursor-pointer"
            >
              <RiAddLine size={11} />
            </button>
          </div>
        )}

        {/* Clear + trailing icon (non-password, non-number) */}
        {!isPassword && !isNumber && !isTextarea && (
          <>
            {hasValue && !trailingIcon && !readOnly && (
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleClear}
                className="shrink-0 flex items-center text-ink-muted hover:text-ink transition-colors cursor-pointer"
              >
                <RiCloseLine size={14} />
              </button>
            )}
            {trailingIcon && !hasValue && (
              <span className="shrink-0 flex items-center text-ink-muted">
                {trailingIcon}
              </span>
            )}
          </>
        )}
      </div>

      {(error || helperText) && (
        <p
          className={cn(
            "text-[12px] font-[450] leading-[1.5] tracking-[-0.02em]",
            error ? "text-red-500" : "text-ink-muted"
          )}
        >
          {error ?? helperText}
        </p>
      )}
    </div>
  );
}
