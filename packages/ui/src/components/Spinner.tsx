import * as React from "react";
import { cn } from "../utils";

// ── Spinner ───────────────────────────────────────────────────────────────────

export interface SpinnerProps {
  /** Visual size. Maps to Tailwind size classes. Default "md". */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  /** Screen-reader label. Default "Loading…" */
  label?: string;
}

const sizeClasses: Record<NonNullable<SpinnerProps["size"]>, string> = {
  xs: "size-3 border-[1.5px]",
  sm: "size-4 border-2",
  md: "size-5 border-2",
  lg: "size-6 border-[2.5px]",
  xl: "size-8 border-[3px]",
};

const Spinner = ({ size = "md", className, label = "Loading…" }: SpinnerProps) => (
  <span
    role="status"
    aria-label={label}
    className={cn(
      "inline-block animate-spin rounded-full",
      "border-current border-r-transparent",
      sizeClasses[size],
      className
    )}
  />
);
Spinner.displayName = "Spinner";

export { Spinner };
