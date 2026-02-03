import * as React from "react";
import { cn } from "../utils";

export interface TooltipProps {
  /**
   * The content to display in the tooltip
   */
  content: React.ReactNode;
  /**
   * The trigger element
   */
  children: React.ReactElement;
  /**
   * Side of the trigger to show tooltip
   */
  side?: "top" | "right" | "bottom" | "left";
  /**
   * Delay before showing tooltip (ms)
   */
  delayDuration?: number;
  /**
   * Additional class names for the tooltip content
   */
  className?: string;
}

/**
 * Simple CSS-only Tooltip component
 *
 * For more advanced tooltips with portals and collision detection,
 * consider using @radix-ui/react-tooltip directly.
 *
 * @example
 * ```tsx
 * <Tooltip content="Edit this item">
 *   <button>
 *     <EditIcon />
 *   </button>
 * </Tooltip>
 * ```
 */
const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, children, side = "top", delayDuration = 200, className }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const timeoutRef = React.useRef<NodeJS.Timeout>();

    const handleMouseEnter = () => {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delayDuration);
    };

    const handleMouseLeave = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(false);
    };

    const positionClasses = {
      top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
      bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
      left: "right-full top-1/2 -translate-y-1/2 mr-2",
      right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    return (
      <div
        ref={ref}
        className="relative inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
      >
        {children}
        {isVisible && (
          <div
            role="tooltip"
            className={cn(
              "absolute z-50 px-3 py-1.5 text-xs font-medium text-primary-foreground bg-foreground rounded-md shadow-md whitespace-nowrap animate-in fade-in-0 zoom-in-95",
              positionClasses[side],
              className
            )}
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);
Tooltip.displayName = "Tooltip";

export { Tooltip };

