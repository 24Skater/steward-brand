import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "../utils";

// ── Pagination ────────────────────────────────────────────────────────────────

export interface PaginationProps {
  /** Total number of pages */
  totalPages: number;
  /** Currently active page (1-based) */
  currentPage: number;
  /** Called when the user selects a page */
  onPageChange: (page: number) => void;
  /** Max page buttons to show before collapsing to ellipsis. Default 7. */
  siblingCount?: number;
  className?: string;
}

function getPageRange(current: number, total: number, siblings: number): (number | "...")[] {
  const delta = siblings;
  const left = current - delta;
  const right = current + delta;

  const pages: number[] = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= left && i <= right)) {
      pages.push(i);
    }
  }

  const result: (number | "...")[] = [];
  let prev: number | null = null;
  for (const page of pages) {
    if (prev !== null && page - prev > 1) {
      result.push("...");
    }
    result.push(page);
    prev = page;
  }
  return result;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) => {
  const pages = getPageRange(currentPage, totalPages, siblingCount);

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn("flex items-center gap-1", className)}
    >
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="size-4" />
      </PaginationButton>

      {pages.map((page, i) =>
        page === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="flex size-9 items-center justify-center text-sm text-muted-foreground"
          >
            <MoreHorizontal className="size-4" />
          </span>
        ) : (
          <PaginationButton
            key={page}
            onClick={() => onPageChange(page)}
            active={page === currentPage}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </PaginationButton>
        )
      )}

      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Go to next page"
      >
        <ChevronRight className="size-4" />
      </PaginationButton>
    </nav>
  );
};
Pagination.displayName = "Pagination";

// ── PaginationButton (internal) ───────────────────────────────────────────────

interface PaginationButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  "aria-label"?: string;
  "aria-current"?: "page" | undefined;
}

const PaginationButton = ({
  children,
  onClick,
  active = false,
  disabled = false,
  ...props
}: PaginationButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "flex size-9 items-center justify-center rounded-md text-sm font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      active
        ? "bg-primary text-primary-foreground"
        : "border border-border bg-background text-foreground hover:bg-muted",
      disabled && "pointer-events-none opacity-40"
    )}
    {...props}
  >
    {children}
  </button>
);

export { Pagination };
