# @steward/email-templates

HTML email templates for the Steward ecosystem. Uses the same brand colors and typography as the UI components.

## Installation

```bash
pnpm add @steward/email-templates
```

## Usage

### Receipt Email

```typescript
import { receiptEmail } from "@steward/email-templates";

const html = receiptEmail({
  organizationName: "Grace Community Church",
  recipientName: "John Doe",
  receiptNumber: "RCP-2024-001",
  date: "January 15, 2024",
  items: [
    { description: "General Fund Donation", amount: "$100.00" },
    { description: "Building Fund", amount: "$50.00" },
  ],
  total: "$150.00",
  paymentMethod: "Visa ****4242",
  viewDetailsUrl: "https://example.com/receipts/RCP-2024-001",
  organizationAddress: "123 Church St, City, ST 12345",
  supportEmail: "support@example.com",
});

// Send with your email provider
await sendEmail({
  to: "john@example.com",
  subject: "Your donation receipt",
  html,
});
```

### Welcome Email

```typescript
import { welcomeEmail } from "@steward/email-templates";

const html = welcomeEmail({
  organizationName: "Grace Community Church",
  recipientName: "Jane Smith",
  ctaUrl: "https://example.com/dashboard",
  ctaText: "Go to Dashboard",
  features: [
    {
      title: "View your giving history",
      description: "Access all your donation records and tax receipts in one place.",
    },
    {
      title: "Set up recurring donations",
      description: "Automate your giving with weekly or monthly contributions.",
    },
    {
      title: "Update your profile",
      description: "Keep your contact information up to date.",
    },
  ],
  supportEmail: "support@example.com",
});
```

## Customization

### Using the Email Theme

Access the theme directly for custom templates:

```typescript
import { emailTheme, inlineStyles, emailButtonStyles } from "@steward/email-templates";

// Access colors
const primaryColor = emailTheme.colors.blue; // "#2563EB"

// Generate inline styles
const customStyle = inlineStyles({
  backgroundColor: emailTheme.colors.subtle,
  padding: emailTheme.spacing.md,
  borderRadius: emailTheme.borderRadius.md,
});

// Use pre-built button styles
const buttonStyle = emailButtonStyles("primary");
```

### Theme Values

**Colors:**
- `navy`: #1B2A41 (primary brand)
- `blue`: #2563EB (action/links)
- `emerald`: #16A34A (success)
- `amber`: #F59E0B (warning)
- `red`: #DC2626 (danger)
- `ink`, `slate`, `muted`, `border`, `surface`, `subtle` (neutrals)

**Typography:**
- Font: Inter system stack
- Sizes: display, h1, h2, h3, body, small, caption

**Spacing:**
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px

## Email Client Compatibility

These templates are designed for maximum email client compatibility:

- ✅ Gmail (web & mobile)
- ✅ Apple Mail
- ✅ Outlook (desktop & web)
- ✅ Yahoo Mail
- ✅ Most mobile email apps

Templates use:
- Table-based layouts
- Inline styles
- Web-safe fonts with fallbacks
- No external CSS files

