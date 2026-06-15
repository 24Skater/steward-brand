/**
 * @steward-app/email-templates
 * HTML email templates for the Steward ecosystem
 */

// Shared theme
export {
  emailTheme,
  type EmailTheme,
  inlineStyles,
  emailWrapperStyles,
  emailContainerStyles,
  emailButtonStyles,
  emailLinkStyles,
  emailHeaderStyles,
  emailFooterStyles,
} from "./shared/email-theme.js";

// Templates
export { receiptEmail, type ReceiptEmailProps } from "./receipt.js";
export { welcomeEmail, type WelcomeEmailProps } from "./welcome.js";

