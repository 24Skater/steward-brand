import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../utils";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

// ── Breadcrumb ────────────────────────────────────────────────────────────────

const Breadcrumb = ({
  items,
  separator = <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />,
  className,
}: BreadcrumbProps) => (
  <nav aria-label="Breadcrumb" className={className}>
    <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <li key={index} className="flex items-center gap-1.5">
            {isLast || !item.href ? (
              <span
                className={cn(isLast && "font-medium text-foreground")}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            )}
            {!isLast && separator}
          </li>
        );
      })}
    </ol>
  </nav>
);
Breadcrumb.displayName = "Breadcrumb";

export { Breadcrumb };
