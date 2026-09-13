import * as React from "react";
import { Check, ChevronDown, LayoutGrid, Lock } from "lucide-react";
import { cn } from "../utils";

// ── Types ─────────────────────────────────────────────────────────────────────

/**
 * What a person may do with an application right now.
 *
 * These are deliberately the *observable* states rather than a subscription's
 * internal ones. A church does not care whether its trial lapsed or its card
 * failed; it cares whether it can still write.
 */
export type AppAccess = "full" | "read-only" | "ended" | "not-subscribed";

export interface AppSwitcherApp {
  /** Stable identifier, used to mark the current entry. Never rendered. */
  key: string;
  name: string;
  /** Where the application lives. Absolute, because it is a different host. */
  href: string;
  /** One short line. Omit rather than pad it out. */
  description?: string;
  icon?: React.ReactNode;
  /** Defaults to `"full"`, which is what an application passes for itself. */
  access?: AppAccess;
}

export interface AppSwitcherProps {
  apps: AppSwitcherApp[];
  /** The `key` of the application this switcher is rendered inside. */
  currentAppKey?: string;
  /** The console, where subscriptions are actually changed. */
  manageHref?: string;
  manageLabel?: string;
  /** Accessible name for the trigger. */
  label?: string;
  align?: "start" | "end";
  className?: string;
}

// ── Copy ──────────────────────────────────────────────────────────────────────

const ACCESS_NOTE: Record<AppAccess, string | undefined> = {
  full: undefined,
  "read-only": "Read only",
  ended: "Subscription ended",
  "not-subscribed": "Not subscribed",
};

/** The two states that are shown but cannot be walked into. */
function isReachable(access: AppAccess): boolean {
  return access === "full" || access === "read-only";
}

// ── AppSwitcher ───────────────────────────────────────────────────────────────

/**
 * Move between the Steward applications a church has.
 *
 * Three decisions are worth knowing before changing this.
 *
 * **It knows no product catalogue.** The caller passes the applications, their
 * hosts and their access. A component in the shared design system that listed
 * Steward's products would be wrong twice over: it would put the hosted
 * business's SKUs inside a package anybody can install, and it would be a lie
 * on a self-hosted install that runs one application and has never heard of
 * the others.
 *
 * **Applications a church cannot reach are shown, not hidden.** An application
 * that silently disappears reads as data loss. One that is visibly greyed out
 * with "Subscription ended" reads as what it is — an account state, fixable
 * from the link at the bottom.
 *
 * **It renders nothing when there is nothing to switch to.** One application
 * and no console is exactly the self-hosted case, and a switcher there is a
 * control that does nothing.
 */
const AppSwitcher = ({
  apps,
  currentAppKey,
  manageHref,
  manageLabel = "Manage applications",
  label = "Switch application",
  align = "start",
  className,
}: AppSwitcherProps) => {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const current = apps.find((app) => app.key === currentAppKey);
  const hasSomewhereToGo = apps.some((app) => app.key !== currentAppKey);

  React.useEffect(() => {
    if (!open) return;

    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      // Back to the trigger, or the focus ring lands on the document and the
      // keyboard user has to tab from the top of the page again.
      triggerRef.current?.focus();
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  if (!hasSomewhereToGo && !manageHref) return null;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        className={cn(
          "inline-flex h-9 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-medium",
          "ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        )}
      >
        <LayoutGrid className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <span className="truncate">{current?.name ?? label}</span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label={label}
          className={cn(
            "absolute z-50 mt-1 min-w-64 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
            align === "end" ? "right-0" : "left-0"
          )}
        >
          {apps.map((app) => {
            const access = app.access ?? "full";
            const note = ACCESS_NOTE[access];
            const isCurrent = app.key === currentAppKey;
            const reachable = isReachable(access) && !isCurrent;

            const body = (
              <>
                <span className="flex size-5 shrink-0 items-center justify-center text-muted-foreground">
                  {isCurrent ? (
                    <Check className="size-4" aria-hidden="true" />
                  ) : isReachable(access) ? (
                    (app.icon ?? null)
                  ) : (
                    <Lock className="size-3.5" aria-hidden="true" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{app.name}</span>
                  {app.description && (
                    <span className="block truncate text-xs text-muted-foreground">
                      {app.description}
                    </span>
                  )}
                </span>
                {note && (
                  <span className="shrink-0 text-xs font-medium text-muted-foreground">{note}</span>
                )}
              </>
            );

            const shared =
              "flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left text-sm outline-none";

            return reachable ? (
              <a
                key={app.key}
                role="menuitem"
                href={app.href}
                onClick={() => setOpen(false)}
                className={cn(
                  shared,
                  "transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground"
                )}
              >
                {body}
              </a>
            ) : (
              <span
                key={app.key}
                role="menuitem"
                aria-current={isCurrent ? "true" : undefined}
                aria-disabled={isCurrent ? undefined : "true"}
                className={cn(shared, isCurrent ? "bg-accent/50" : "cursor-not-allowed opacity-60")}
              >
                {body}
              </span>
            );
          })}

          {manageHref && (
            <>
              <span role="none" className="my-1 block h-px bg-border" />
              <a
                role="menuitem"
                href={manageHref}
                onClick={() => setOpen(false)}
                className="flex w-full items-center rounded-sm px-2 py-2 text-sm text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground"
              >
                {manageLabel}
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
};
AppSwitcher.displayName = "AppSwitcher";

export { AppSwitcher };
