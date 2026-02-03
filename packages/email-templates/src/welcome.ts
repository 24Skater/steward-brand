/**
 * Welcome Email Template
 * Used for new member/user onboarding
 */

import {
  emailTheme,
  emailWrapperStyles,
  emailContainerStyles,
  emailButtonStyles,
  emailHeaderStyles,
  emailFooterStyles,
  inlineStyles,
} from "./shared/email-theme";

export interface WelcomeEmailProps {
  /** Organization name */
  organizationName: string;
  /** Organization logo URL (optional) */
  logoUrl?: string;
  /** Recipient name */
  recipientName: string;
  /** Welcome message (optional, has default) */
  welcomeMessage?: string;
  /** Call-to-action button text */
  ctaText?: string;
  /** Call-to-action URL */
  ctaUrl: string;
  /** Optional features/highlights to show */
  features?: Array<{
    title: string;
    description: string;
  }>;
  /** Organization address for footer */
  organizationAddress?: string;
  /** Support email */
  supportEmail?: string;
}

/**
 * Generate a welcome email HTML string
 */
export function welcomeEmail(props: WelcomeEmailProps): string {
  const {
    organizationName,
    logoUrl,
    recipientName,
    welcomeMessage = `We're excited to have you join ${organizationName}! Your account is all set up and ready to go.`,
    ctaText = "Get Started",
    ctaUrl,
    features,
    organizationAddress,
    supportEmail,
  } = props;

  const featuresHtml = features
    ? features
        .map(
          (feature) => `
        <tr>
          <td style="${inlineStyles({ padding: `${emailTheme.spacing.md} 0` })}">
            <h3 style="${inlineStyles({ margin: "0 0 4px", fontSize: emailTheme.fontSizes.body, fontWeight: "600", color: emailTheme.colors.navy })}">
              ${feature.title}
            </h3>
            <p style="${inlineStyles({ margin: "0", fontSize: emailTheme.fontSizes.small, color: emailTheme.colors.slate })}">
              ${feature.description}
            </p>
          </td>
        </tr>
      `
        )
        .join("")
    : "";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ${organizationName}</title>
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
                Welcome! 👋
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: ${emailTheme.spacing.md} 0;">
              <p style="${inlineStyles({ margin: "0 0 16px", fontSize: emailTheme.fontSizes.body })}">
                Hi ${recipientName},
              </p>
              <p style="${inlineStyles({ margin: "0 0 24px", fontSize: emailTheme.fontSizes.body })}">
                ${welcomeMessage}
              </p>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: ${emailTheme.spacing.lg} 0;">
                    <a href="${ctaUrl}" style="${emailButtonStyles("primary")}">
                      ${ctaText}
                    </a>
                  </td>
                </tr>
              </table>

              ${
                features && features.length > 0
                  ? `
              <!-- Features -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${inlineStyles({ marginTop: emailTheme.spacing.lg, borderTop: `1px solid ${emailTheme.colors.border}`, paddingTop: emailTheme.spacing.lg })}">
                <tr>
                  <td>
                    <h2 style="${inlineStyles({ margin: `0 0 ${emailTheme.spacing.md}`, fontSize: emailTheme.fontSizes.h3, fontWeight: "600", color: emailTheme.colors.ink })}">
                      Here's what you can do:
                    </h2>
                  </td>
                </tr>
                ${featuresHtml}
              </table>
              `
                  : ""
              }
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="${emailFooterStyles}">
              <p style="margin: 0 0 8px;">
                ${organizationName}
              </p>
              ${organizationAddress ? `<p style="margin: 0 0 8px;">${organizationAddress}</p>` : ""}
              ${supportEmail ? `<p style="margin: 0;">Need help? Contact us at <a href="mailto:${supportEmail}" style="color: ${emailTheme.colors.blue};">${supportEmail}</a></p>` : ""}
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

