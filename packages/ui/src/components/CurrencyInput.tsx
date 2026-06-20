import * as React from "react";
import { cn } from "../utils";

// ── CurrencyInput ─────────────────────────────────────────────────────────────

export interface CurrencyInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value" | "type"
> {
  /** Numeric value in cents (integer) or dollars (float). Default unit is "dollars". */
  value?: number;
  onChange?: (value: number) => void;
  /** Currency symbol displayed as a prefix. Default "$". */
  symbol?: string;
  /** Number of decimal places to display. Default 2. */
  decimals?: number;
  /** Locale for number formatting. Default "en-US". */
  locale?: string;
}

function formatDisplay(value: number, decimals: number, locale: string): string {
  return value.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function parseRaw(raw: string): number {
  const cleaned = raw.replace(/[^0-9.]/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      value = 0,
      onChange,
      symbol = "$",
      decimals = 2,
      locale = "en-US",
      className,
      onBlur,
      onFocus,
      disabled,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = React.useState(false);
    const [raw, setRaw] = React.useState(String(value));

    React.useEffect(() => {
      if (!focused) {
        setRaw(formatDisplay(value, decimals, locale));
      }
    }, [value, focused, decimals, locale]);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      setRaw(value === 0 ? "" : String(value));
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      const parsed = parseRaw(raw);
      setRaw(formatDisplay(parsed, decimals, locale));
      onChange?.(parsed);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value.replace(/[^0-9.]/g, "");
      setRaw(next);
    };

    return (
      <div className={cn("relative flex items-center", className)}>
        <span
          className={cn(
            "pointer-events-none absolute left-3 select-none text-sm",
            disabled ? "text-muted-foreground/50" : "text-muted-foreground"
          )}
          aria-hidden
        >
          {symbol}
        </span>
        <input
          {...props}
          ref={ref}
          type="text"
          inputMode="decimal"
          value={focused ? raw : formatDisplay(value, decimals, locale)}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background",
            "pl-7 pr-3 py-2 text-sm text-foreground shadow-sm",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "placeholder:text-muted-foreground"
          )}
        />
      </div>
    );
  }
);
CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };
