import * as React from "react";
import { cn } from "../utils";
import { Input, type InputProps } from "./Input";

// ── AuthLayout ──────────────────────────────────────────────────────────────

export interface AuthLayoutProps {
  /** Right-column decorative content. Omit for single-column layout. */
  panel?: React.ReactNode;
  /** Left-column content (the form). */
  children: React.ReactNode;
  className?: string;
}

const AuthLayout = ({ panel, children, className }: AuthLayoutProps) => (
  <div className={cn("min-h-screen flex bg-background", className)}>
    {/* Left: form column */}
    <div
      className={cn(
        "flex flex-col justify-center px-8 py-16",
        panel
          ? "w-full lg:w-[480px] xl:w-[520px] shrink-0"
          : "w-full max-w-md mx-auto"
      )}
    >
      {children}
    </div>

    {/* Right: decorative panel — hidden below lg */}
    {panel && (
      <div className="hidden lg:flex flex-1 items-stretch p-6">
        <div className="flex-1 rounded-2xl bg-muted overflow-hidden">
          {panel}
        </div>
      </div>
    )}
  </div>
);
AuthLayout.displayName = "AuthLayout";

// ── AuthForm ────────────────────────────────────────────────────────────────

export interface AuthFormProps {
  /** Page heading — e.g. "Welcome Back" */
  heading: React.ReactNode;
  /** Subtitle text shown beneath the heading */
  description?: React.ReactNode;
  /** Bottom link line — e.g. "Don't have an account? Sign up" */
  footer?: React.ReactNode;
  /** Form fields, buttons, dividers, etc. */
  children: React.ReactNode;
  className?: string;
}

const AuthForm = ({ heading, description, footer, children, className }: AuthFormProps) => (
  <div className={cn("w-full max-w-sm", className)}>
    {/* Heading block */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground leading-tight">
        {heading}
      </h1>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>

    {/* Form content */}
    <div className="space-y-5">{children}</div>

    {/* Footer link */}
    {footer && (
      <p className="mt-8 text-sm text-muted-foreground">{footer}</p>
    )}
  </div>
);
AuthForm.displayName = "AuthForm";

// ── AuthDivider ─────────────────────────────────────────────────────────────

export interface AuthDividerProps {
  /** Divider label. Defaults to "or". */
  label?: string;
  className?: string;
}

const AuthDivider = ({ label = "or", className }: AuthDividerProps) => (
  <div className={cn("relative my-2", className)} role="separator" aria-label={label}>
    <div className="absolute inset-0 flex items-center">
      <span className="w-full border-t border-border" />
    </div>
    <div className="relative flex justify-center">
      <span className="bg-background px-4 text-xs text-muted-foreground">{label}</span>
    </div>
  </div>
);
AuthDivider.displayName = "AuthDivider";

// ── AuthPanel ───────────────────────────────────────────────────────────────

export interface AuthPanelProps {
  /** The decorative visual — screenshots, illustrations, floating cards. */
  visual: React.ReactNode;
  /** Optional heading below the visual — e.g. "Build Beautiful Admin Panel" */
  heading?: React.ReactNode;
  /** Optional description below the heading */
  description?: React.ReactNode;
  /** Number of pagination indicator dots (0 = hidden) */
  dots?: number;
  /** Index of the active dot (0-based) */
  activeDot?: number;
  className?: string;
}

const AuthPanel = ({
  visual,
  heading,
  description,
  dots = 0,
  activeDot = 0,
  className,
}: AuthPanelProps) => (
  <div
    className={cn(
      "flex flex-col items-center justify-between h-full py-10 px-6",
      className
    )}
  >
    {/* Visual area */}
    <div className="flex-1 flex items-center justify-center w-full">
      {visual}
    </div>

    {/* Text + dots */}
    {(heading || description || dots > 1) && (
      <div className="mt-8 flex flex-col items-center gap-4 text-center max-w-xs">
        {heading && (
          <h2 className="text-xl font-bold text-foreground">{heading}</h2>
        )}
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
        {dots > 1 && (
          <div className="flex gap-2" role="tablist" aria-label="Slide indicators">
            {Array.from({ length: dots }).map((_, i) => (
              <span
                key={i}
                role="tab"
                aria-selected={i === activeDot}
                className={cn(
                  "block w-2 h-2 rounded-full transition-colors",
                  i === activeDot
                    ? "bg-foreground"
                    : "bg-border"
                )}
              />
            ))}
          </div>
        )}
      </div>
    )}
  </div>
);
AuthPanel.displayName = "AuthPanel";

// ── InputIcon ───────────────────────────────────────────────────────────────

export interface InputIconProps extends InputProps {
  /** Icon to render on the leading (left) side of the input */
  icon: React.ReactNode;
}

const InputIcon = React.forwardRef<HTMLInputElement, InputIconProps>(
  ({ icon, className, ...props }, ref) => (
    <div className="relative">
      <span
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0"
        aria-hidden
      >
        {icon}
      </span>
      <Input ref={ref} className={cn("pl-10", className)} {...props} />
    </div>
  )
);
InputIcon.displayName = "InputIcon";

// ── FormFieldRow ─────────────────────────────────────────────────────────────
// Convenience wrapper for label + inline right-side element (e.g. Forgot Password?)

export interface FormFieldRowProps {
  label: React.ReactNode;
  aside?: React.ReactNode;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}

const FormFieldRow = ({ label, aside, htmlFor, children, className }: FormFieldRowProps) => (
  <div className={cn("space-y-2", className)}>
    <div className="flex items-center justify-between">
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
      {aside && <div className="text-sm">{aside}</div>}
    </div>
    {children}
  </div>
);
FormFieldRow.displayName = "FormFieldRow";

export { AuthLayout, AuthForm, AuthDivider, AuthPanel, InputIcon, FormFieldRow };
