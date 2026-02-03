/**
 * Steward Email Theme
 * Shared styles and colors for HTML emails
 *
 * Note: Email clients have limited CSS support, so we use inline styles
 * and a limited color palette for maximum compatibility.
 */

export const emailTheme = {
  colors: {
    // Brand
    navy: "#1B2A41",
    blue: "#2563EB",
    emerald: "#16A34A",
    amber: "#F59E0B",
    red: "#DC2626",

    // Neutrals
    ink: "#0B1220",
    slate: "#334155",
    muted: "#64748B",
    border: "#E2E8F0",
    surface: "#FFFFFF",
    subtle: "#F8FAFC",
  },

  fonts: {
    sans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },

  fontSizes: {
    display: "36px",
    h1: "30px",
    h2: "24px",
    h3: "20px",
    body: "16px",
    small: "14px",
    caption: "12px",
  },

  lineHeights: {
    display: "44px",
    h1: "38px",
    h2: "32px",
    h3: "28px",
    body: "24px",
    small: "20px",
    caption: "16px",
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
  },

  borderRadius: {
    sm: "6px",
    md: "10px",
    lg: "16px",
  },
} as const;

export type EmailTheme = typeof emailTheme;

/**
 * Generate inline styles from a style object
 */
export function inlineStyles(styles: Record<string, string | number>): string {
  return Object.entries(styles)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      return `${cssKey}: ${value}`;
    })
    .join("; ");
}

/**
 * Common email wrapper styles
 */
export const emailWrapperStyles = inlineStyles({
  margin: "0",
  padding: "0",
  width: "100%",
  backgroundColor: emailTheme.colors.subtle,
});

/**
 * Common email container styles
 */
export const emailContainerStyles = inlineStyles({
  maxWidth: "600px",
  margin: "0 auto",
  padding: emailTheme.spacing.lg,
  backgroundColor: emailTheme.colors.surface,
  fontFamily: emailTheme.fonts.sans,
  fontSize: emailTheme.fontSizes.body,
  lineHeight: emailTheme.lineHeights.body,
  color: emailTheme.colors.ink,
});

/**
 * Common button styles
 */
export const emailButtonStyles = (variant: "primary" | "secondary" = "primary") => {
  const bg = variant === "primary" ? emailTheme.colors.blue : emailTheme.colors.slate;
  const color = "#FFFFFF";

  return inlineStyles({
    display: "inline-block",
    padding: "12px 24px",
    backgroundColor: bg,
    color: color,
    textDecoration: "none",
    borderRadius: emailTheme.borderRadius.md,
    fontWeight: "600",
    fontSize: emailTheme.fontSizes.body,
    lineHeight: "1",
  });
};

/**
 * Common link styles
 */
export const emailLinkStyles = inlineStyles({
  color: emailTheme.colors.blue,
  textDecoration: "underline",
});

/**
 * Header styles
 */
export const emailHeaderStyles = inlineStyles({
  padding: `${emailTheme.spacing.lg} 0`,
  borderBottom: `1px solid ${emailTheme.colors.border}`,
  marginBottom: emailTheme.spacing.lg,
});

/**
 * Footer styles
 */
export const emailFooterStyles = inlineStyles({
  padding: `${emailTheme.spacing.lg} 0`,
  borderTop: `1px solid ${emailTheme.colors.border}`,
  marginTop: emailTheme.spacing.lg,
  fontSize: emailTheme.fontSizes.small,
  color: emailTheme.colors.muted,
  textAlign: "center",
});

