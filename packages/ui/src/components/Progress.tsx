import * as React from "react";
import { cn } from "../utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The progress value (0-100)
   */
  value?: number;
  /**
   * Maximum value (default: 100)
   */
  max?: number;
  /**
   * Show the value label
   */
  showValue?: boolean;
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg";
}

/**
 * Progress bar component
 *
 * @example
 * ```tsx
 * <Progress value={60} />
 * <Progress value={75} showValue />
 * <Progress value={45} size="lg" />
 * ```
 */
const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, showValue = false, size = "md", ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    const sizeClasses = {
      sm: "h-1",
      md: "h-2",
      lg: "h-3",
    };

    return (
      <div className={cn("w-full", className)} ref={ref} {...props}>
        <div
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          className={cn(
            "w-full overflow-hidden rounded-full bg-surface-muted",
            sizeClasses[size]
          )}
        >
          <div
            className="h-full bg-primary transition-all duration-300 ease-in-out rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showValue && (
          <div className="mt-1 text-xs text-muted text-right">{Math.round(percentage)}%</div>
        )}
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };

