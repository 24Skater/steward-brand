/**
 * Password Reset Email Template
 */

import {
  emailTheme,
  emailWrapperStyles,
  emailContainerStyles,
  emailButtonStyles,
  emailHeaderStyles,
  emailFooterStyles,
  inlineStyles,
} from "./shared/email-theme.js";

export interface PasswordResetEmailProps {
  /** Organization name */
  organizationName: string;
  /** Organization logo URL (optional) */
  logoUrl?: string;
  /** Recipient name */
  recipientName: string;
  /** Password reset URL */
  resetUrl: string;
  /** Minutes until the link expires. Default 60. */
  expiresInMinutes?: number;
  /** Organization address for footer */
  organizationAddress?: string;
  /** Support email */
  supportEmail?: string;
}

export function passwordResetEmail(props: PasswordResetEmailProps): string {
  const {
    organizationName,
    logoUrl,
    recipientName,
    resetUrl,
    expiresInMinutes = 60,
    organizationAddress,
    supportEmail,
  } = props;

  const expiryText =
    expiresInMinutes >= 60
      ? `${expiresInMinutes / 60} hour${expiresInMinutes / 60 !== 1 ? "s" : ""}`
      : `${expiresInMinutes} minute${expiresInMinutes !== 1 ? "s" : ""}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset your password — ${organizationName}</title>
</head>
<body style="${emailWrapperStyles}">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${emailWrapperStyles}">
    <tr>
      <td align="center" style="padding: ${emailTheme.spacing["2xl"]} ${emailTheme.spacing.md};">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${emailContainerStyles}; border-radius: ${emailTheme.borderRadius.lg};">

          <!-- Header -->
          <tr>
            <td style="${emailHeaderStyles}">
              ${logoUrl ? `<img src="${logoUrl}" alt="${organizationName}" height="40" style="display: block; margin-bottom: 16px;">` : ""}
              <h1 style="${inlineStyles({ margin: "0", fontSize: emailTheme.fontSizes.h1, fontWeight: "600", color: emailTheme.colors.navy })}">
                Reset your password
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: ${emailTheme.spacing.lg} 0;">
              <p style="${inlineStyles({ margin: "0 0 16px", fontSize: emailTheme.fontSizes.body })}">
                Hi ${recipientName},
              </p>
              <p style="${inlineStyles({ margin: "0 0 24px", fontSize: emailTheme.fontSizes.body })}">
                We received a request to reset the password for your ${organizationName} account.
                Click the button below to choose a new password. This link will expire in <strong>${expiryText}</strong>.
              </p>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: ${emailTheme.spacing.lg} 0;">
                    <a href="${resetUrl}" style="${emailButtonStyles("primary")}">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Security notice -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                style="${inlineStyles({ marginTop: emailTheme.spacing.lg, borderTop: `1px solid ${emailTheme.colors.border}`, paddingTop: emailTheme.spacing.lg })}">
                <tr>
                  <td style="${inlineStyles({ backgroundColor: emailTheme.colors.subtle, borderRadius: emailTheme.borderRadius.md, padding: emailTheme.spacing.md })}">
                    <p style="${inlineStyles({ margin: "0", fontSize: emailTheme.fontSizes.small, color: emailTheme.colors.slate })}">
                      If you didn't request a password reset, you can safely ignore this email.
                      Your password will remain unchanged.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Fallback URL -->
              <p style="${inlineStyles({ margin: `${emailTheme.spacing.lg} 0 0`, fontSize: emailTheme.fontSizes.small, color: emailTheme.colors.slate })}">
                If the button above doesn't work, copy and paste this URL into your browser:
              </p>
              <p style="${inlineStyles({ margin: "4px 0 0", fontSize: emailTheme.fontSizes.small, wordBreak: "break-all" })}">
                <a href="${resetUrl}" style="${inlineStyles({ color: emailTheme.colors.blue })}">
                  ${resetUrl}
                </a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="${emailFooterStyles}">
              <p style="margin: 0 0 8px;">${organizationName}</p>
              ${organizationAddress ? `<p style="margin: 0 0 8px;">${organizationAddress}</p>` : ""}
              ${supportEmail ? `<p style="margin: 0;">Need help? <a href="mailto:${supportEmail}" style="color: ${emailTheme.colors.blue};">${supportEmail}</a></p>` : ""}
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
