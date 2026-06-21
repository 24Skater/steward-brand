# Brand Identity

Visual identity standards for the Steward design system — the mark, colors, and type that unify every product surface.

## The Mark

The Steward mark is a cross-and-anchor symbol that communicates foundation, faithfulness, and direction. It is the only approved primary symbol for Steward products.

| Asset | File | Usage |
|---|---|---|
| Primary mark (dark) | `assets/logo/steward-mark.svg` | Light backgrounds, default |
| Primary mark (light) | `assets/logo/steward-mark-light.svg` | Dark backgrounds |
| Horizontal lockup | `assets/logo/steward-lockup-horizontal.svg` | Wide headers, marketing |
| Stacked lockup | `assets/logo/steward-lockup-stacked.svg` | Square contexts, app icons |
| Wordmark only | `assets/logo/steward-wordmark.svg` | Co-branding, footnotes |

### Theme-Aware Logo in HTML

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/logo/steward-mark-light.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/logo/steward-mark.svg">
  <img alt="Steward" src="assets/logo/steward-mark.svg" width="72">
</picture>
```

### Clear Space

Maintain a minimum clear space equal to the width of the crossbar on all four sides of the mark. Never place the mark closer than this distance to text, edge, or other graphic elements.

### What Not To Do

- Do not recolor the mark outside of the approved palette
- Do not stretch, rotate, or distort the mark
- Do not place the dark mark on a dark background without switching to the light variant
- Do not use the wordmark alone without brand context in product UIs (use the mark or lockup instead)

---

## Color Palette

### Brand Colors

| Name | Hex | Token | Role |
|---|---|---|---|
| Kingdom Gold | `#E8B847` | `--st-primary` | Primary actions, CTAs, focus rings |
| Steward Navy | `#0D1B2E` | `--st-sidebar-bg` | Sidebar, dark surfaces |
| Deep Navy | `#1A2F4A` | `--st-secondary` | Secondary actions |
| Gold Dark | `#C49B35` | `--st-link` | Links, hover states |

### Semantic Colors

| Name | Hex | Token | Role |
|---|---|---|---|
| Emerald | `#16A34A` | `--st-success` | Success states |
| Amber | `#F59E0B` | `--st-warning` | Warnings |
| Red | `#DC2626` | `--st-danger` | Errors, destructive actions |

### Neutrals

| Name | Token | Role |
|---|---|---|
| Background | `--st-bg` | Page background |
| Surface | `--st-surface` | Card, panel backgrounds |
| Surface Muted | `--st-surfaceMuted` | Subtle fills, table stripes |
| Foreground | `--st-fg` | Body text |
| Muted | `--st-muted` | Secondary text, placeholders |
| Border | `--st-border` | Dividers, input borders |

### Accessibility

Kingdom Gold (`#E8B847`) on Steward Navy (`#0D1B2E`) meets **WCAG AA** at all text sizes. This is the primary brand contrast pair used on sidebar navigation and CTAs across all products.

Do not use Kingdom Gold text on white or light backgrounds — the contrast ratio falls below AA. Use Gold Dark (`#C49B35`) instead, or place gold on navy.

---

## Typography

### Typeface

**Inter** is the sole typeface for all Steward product surfaces. It is loaded via the system font stack with web-safe fallbacks:

```css
--st-font-sans: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--st-font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
```

### Type Scale

| Name | Token | Size | Usage |
|---|---|---|---|
| Display | `--st-font-size-display` | 36px | Hero headings, landing pages |
| H1 | `--st-font-size-h1` | 30px | Page titles |
| H2 | `--st-font-size-h2` | 24px | Section headings |
| H3 | `--st-font-size-h3` | 20px | Card headings, subheadings |
| Body | `--st-font-size-body` | 16px | Default body text |
| Small | `--st-font-size-small` | 14px | UI labels, secondary info |
| Caption | `--st-font-size-caption` | 12px | Table captions, fine print |

### Weight Conventions

- **600 (SemiBold)** — Page titles, sidebar section labels, button text
- **500 (Medium)** — Card headings, form labels
- **400 (Regular)** — Body copy, descriptions, table cells

---

## Favicon & App Icons

| File | Size | Context |
|---|---|---|
| `assets/favicon/favicon.svg` | Scalable | Modern browsers, default |
| `assets/favicon/favicon-16.svg` | 16×16 | Legacy browser tabs |
| `assets/favicon/favicon-32.svg` | 32×32 | Browser tabs, taskbar |
| `assets/favicon/apple-touch-icon.svg` | 180×180 | iOS home screen |

### HTML Favicon Snippet

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/svg+xml" sizes="32x32" href="/favicon-32.svg">
<link rel="icon" type="image/svg+xml" sizes="16x16" href="/favicon-16.svg">
<link rel="apple-touch-icon" href="/apple-touch-icon.svg">
<link rel="manifest" href="/site.webmanifest">
```

All favicon assets use the cross/anchor mark on Kingdom Gold, consistent with the primary brand mark.

---

## Voice & Tone

| Situation | Tone | Example |
|---|---|---|
| Empty states | Encouraging, actionable | "No members yet — invite your first one." |
| Errors | Direct, never blame | "We couldn't save that. Try again." |
| Success | Warm, brief | "Donation recorded." |
| Confirmations | Clear, reversible | "Delete this member? This can't be undone." |
| Onboarding | Friendly, step-by-step | "Let's set up your first campus." |

Write for ministry staff, not developers. Prefer plain English over technical labels. Use sentence case everywhere except proper nouns and product names.

---

## Related

- [Token Architecture](./token-architecture.md) — How brand colors become CSS variables
- [Product Themes](./product-themes.md) — Per-product color overrides
- [Contributing](../CONTRIBUTING.md)
- [Code of Conduct](../CODE_OF_CONDUCT.md)
