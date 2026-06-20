# @steward-apps/tokens

## 1.1.0

### Minor Changes

- 1a30196: Add new UI components, product themes, and email template

  **@steward-apps/ui**: Add Sidebar (with SidebarHeader, SidebarContent, SidebarFooter, SidebarSection, SidebarSectionTitle, SidebarLink, SidebarSeparator), Pagination, Breadcrumb, Spinner, Combobox, CurrencyInput, and AuthLayout components

  **@steward-apps/tokens**: Add product themes for Accounting, CRM, Website, and Register

  **@steward-apps/email-templates**: Add passwordResetEmail template with expiry notice and security callout

## 1.0.0

### Major Changes

- Initial stable release of the Steward design system.

  - Kingdom Gold `#E8B847` as brand primary with WCAG AA-compliant dark ink on gold
  - Warm navy dark mode palette replacing pure black
  - Per-product semantic theme layer: `chms`, `table`, `vbs`
  - Georgia display font (`--st-font-display`) at heading-xl scale
  - `ConfirmDialog` component for irreversible actions (Radix AlertDialog)
  - 10 church ministry icons in `@steward-apps/icons`
  - Tailwind v4 compatible
  - XSS-safe email templates
