import * as React from "react";
import { cn } from "../utils";
import { Label } from "./Label";

export interface FormFieldProps {
  /**
   * Label text for the field
   */
  label: string;
  /**
   * Help text shown below the input
   */
  helpText?: string;
  /**
   * Error message - shows error styling when present
   */
  error?: string;
  /**
   * Input ID for label association
   */
  htmlFor?: string;
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * The input element(s)
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * FormField wrapper component for consistent form layouts
 *
 * @example
 * ```tsx
 * <FormField
 *   label="Email"
 *   htmlFor="email"
 *   helpText="We'll never share your email"
 *   error={errors.email}
 *   required
 * >
 *   <Input id="email" type="email" error={!!errors.email} />
 * </FormField>
 * ```
 */
const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, helpText, error, htmlFor, required, children, className }, ref) => {
    const describedById = `${htmlFor}-description`;
    const errorId = `${htmlFor}-error`;

    return (
      <div ref={ref} className={cn("space-y-2", className)}>
        <Label htmlFor={htmlFor}>
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </Label>
        <div
          aria-describedby={error ? errorId : helpText ? describedById : undefined}
        >
          {children}
        </div>
        {helpText && !error && (
          <p id={describedById} className="text-sm text-muted">
            {helpText}
          </p>
        )}
        {error && (
          <p id={errorId} className="text-sm text-danger" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
FormField.displayName = "FormField";

export { FormField };

