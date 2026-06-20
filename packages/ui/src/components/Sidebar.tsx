import * as React from "react";
import { cn } from "../utils";

// ── Sidebar ──────────────────────────────────────────────────────────────────

export interface SidebarProps {
  children: React.ReactNode;
  className?: string;
}

const Sidebar = ({ children, className }: SidebarProps) => (
  <aside
    className={cn(
      "flex h-full w-60 shrink-0 flex-col gap-1 overflow-y-auto",
      "bg-[var(--st-sidebar-bg,#0D1B2E)] text-[var(--st-sidebar-fg,#F5EED8)]",
      "border-r border-[var(--st-sidebar-border,#1A2F4A)]",
      className
    )}
  >
    {children}
  </aside>
);
Sidebar.displayName = "Sidebar";

// ── SidebarHeader ─────────────────────────────────────────────────────────────

export interface SidebarHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const SidebarHeader = ({ children, className }: SidebarHeaderProps) => (
  <div className={cn("flex items-center px-4 py-4 shrink-0", className)}>{children}</div>
);
SidebarHeader.displayName = "SidebarHeader";

// ── SidebarContent ────────────────────────────────────────────────────────────

export interface SidebarContentProps {
  children: React.ReactNode;
  className?: string;
}

const SidebarContent = ({ children, className }: SidebarContentProps) => (
  <div className={cn("flex-1 overflow-y-auto px-2 py-2", className)}>{children}</div>
);
SidebarContent.displayName = "SidebarContent";

// ── SidebarFooter ─────────────────────────────────────────────────────────────

export interface SidebarFooterProps {
  children: React.ReactNode;
  className?: string;
}

const SidebarFooter = ({ children, className }: SidebarFooterProps) => (
  <div
    className={cn(
      "mt-auto shrink-0 px-4 py-4 border-t border-[var(--st-sidebar-border,#1A2F4A)]",
      className
    )}
  >
    {children}
  </div>
);
SidebarFooter.displayName = "SidebarFooter";

// ── SidebarSection ────────────────────────────────────────────────────────────

export interface SidebarSectionProps {
  children: React.ReactNode;
  className?: string;
}

const SidebarSection = ({ children, className }: SidebarSectionProps) => (
  <div className={cn("mb-4", className)}>{children}</div>
);
SidebarSection.displayName = "SidebarSection";

// ── SidebarSectionTitle ───────────────────────────────────────────────────────

export interface SidebarSectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SidebarSectionTitle = ({ children, className }: SidebarSectionTitleProps) => (
  <p
    className={cn(
      "mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest",
      "text-[var(--st-sidebar-muted,rgba(245,238,216,0.45))]",
      className
    )}
  >
    {children}
  </p>
);
SidebarSectionTitle.displayName = "SidebarSectionTitle";

// ── SidebarLink ───────────────────────────────────────────────────────────────

export interface SidebarLinkProps {
  href?: string;
  active?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const SidebarLink = ({
  href = "#",
  active = false,
  icon,
  children,
  className,
  onClick,
}: SidebarLinkProps) => (
  <a
    href={href}
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
      active
        ? "bg-[var(--st-sidebar-active,#E8B847)] text-[var(--st-sidebar-active-fg,#0D1B2E)]"
        : [
            "text-[var(--st-sidebar-fg,#F5EED8)]",
            "hover:bg-[var(--st-sidebar-hover,rgba(232,184,71,0.1))]",
          ],
      className
    )}
    aria-current={active ? "page" : undefined}
  >
    {icon && <span className="shrink-0 [&_svg]:size-4 [&_svg]:shrink-0">{icon}</span>}
    {children}
  </a>
);
SidebarLink.displayName = "SidebarLink";

// ── SidebarSeparator ──────────────────────────────────────────────────────────

export interface SidebarSeparatorProps {
  className?: string;
}

const SidebarSeparator = ({ className }: SidebarSeparatorProps) => (
  <div
    className={cn("mx-3 my-2 h-px bg-[var(--st-sidebar-border,#1A2F4A)]", className)}
    role="separator"
  />
);
SidebarSeparator.displayName = "SidebarSeparator";

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSection,
  SidebarSectionTitle,
  SidebarLink,
  SidebarSeparator,
};
