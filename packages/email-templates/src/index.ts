/**
 * @steward/email-templates
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
} from "./shared/email-theme";

// Templates
export { receiptEmail, type ReceiptEmailProps } from "./receipt";
export { welcomeEmail, type WelcomeEmailProps } from "./welcome";

