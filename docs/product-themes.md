# Product Themes

Each Steward product gets a theme — a set of semantic token overrides that give it a distinct feel while staying inside the shared brand language.

## How Themes Work

Every theme file in `packages/tokens/src/themes/products/` overrides only the semantic tokens that differ from the base. Tokens not listed inherit the base value. The build script merges base + override and emits a `[data-product="<name>"]` CSS block to `dist/themes/<name>.css`.

```
Base tokens (tokens.dtcg.json)
        +
Product overrides (themes/products/chms.json)
        =
[data-product="chms"], .steward-chms { --st-primary: ...; --st-sidebar-bg: ...; }
```

To activate a theme, import its stylesheet and set `data-product`:

```html
<link rel="stylesheet" href="@steward-apps/tokens/themes/chms" />
<html data-product="chms">
```

`data-product` selects *which product* you are; `data-theme` selects *light or
dark*. They are two independent axes and must not be conflated — see
[Theme Composition with Dark Mode](#theme-composition-with-dark-mode).

---

## Current Product Themes

| Product | File | `data-product` value | Primary accent | Sidebar |
|---|---|---|---|---|
| ChMS (Congregation) | `chms.json` | `chms` | Kingdom Gold `#E8B847` | Navy `#0D1B2E` |
| Accounting | `accounting.json` | `accounting` | Kingdom Gold `#E8B847` | Navy `#0D1B2E` |
| CRM | `crm.json` | `crm` | Kingdom Gold `#E8B847` | Navy `#0D1B2E` |
| Point of Sale | `register.json` | `register` | Kingdom Gold `#E8B847` | Navy `#0D1B2E` |
| Table (Data grid) | `table.json` | `table` | Kingdom Gold `#E8B847` | — |
| VBS (Vacation Bible School) | `vbs.json` | `vbs` | Kingdom Gold `#E8B847` | Navy `#0D1B2E` |
| Website (Marketing) | `website.json` | `website` | Kingdom Gold `#E8B847` | — |

All products share Kingdom Gold as their primary color and Steward Navy as the sidebar background. Products differentiate through surface warmth, border color, hover states, and typographic emphasis — not primary brand colors.

---

## Semantic Tokens Available to Override

These are the tokens each theme can customize. All others inherit from the base.

### Color roles

| Token | Purpose |
|---|---|
| `--st-bg` | Page background |
| `--st-surface` | Card / panel background |
| `--st-surfaceMuted` | Subtle fills, alternating rows |
| `--st-fg` | Body text |
| `--st-border` | Dividers, input borders |
| `--st-muted` | Secondary text |
| `--st-mutedFg` | Tertiary text |
| `--st-primary` | Primary action (button, CTA) |
| `--st-primaryFg` | Text on primary |
| `--st-secondary` | Secondary action |
| `--st-secondaryFg` | Text on secondary |
| `--st-accent` | Highlight, selected state |
| `--st-accentFg` | Text on accent |
| `--st-link` | Link color |
| `--st-focusRing` | Keyboard focus ring |

### Interactive states

| Token | Purpose |
|---|---|
| `--st-fg-on-primary` | Text color on primary background |
| `--st-primary-hover` | Primary button hover |
| `--st-surface-hover` | Row / item hover |

### Sidebar

| Token | Purpose |
|---|---|
| `--st-sidebar-bg` | Sidebar background |
| `--st-sidebar-fg` | Sidebar text |
| `--st-sidebar-muted` | Sidebar secondary text |
| `--st-sidebar-border` | Sidebar internal border |
| `--st-sidebar-active-bg` | Active nav item background |
| `--st-sidebar-active-fg` | Active nav item text |
| `--st-sidebar-hover-bg` | Nav item hover |
| `--st-sidebar-section-label` | Section heading text |

---

## Adding a New Product Theme

### 1. Create the token file

```bash
# packages/tokens/src/themes/products/my-product.json
```

```json
{
  "$description": "My Product — Product Theme Overrides",

  "semantic": {
    "bg": "{color.neutral.warmSubtle}",
    "surface": "{color.neutral.surface}",
    "surfaceMuted": "{color.neutral.warmSurface}",
    "fg": "#0D1B2E",
    "border": "#DDD0A8",
    "primary": "{color.brand.gold}",
    "primaryFg": "#0D1B2E",
    "link": "{color.brand.goldDark}",
    "focusRing": "{color.brand.gold}",
    "sidebar-bg": "#0D1B2E",
    "sidebar-fg": "{color.neutral.warmSurface}",
    "sidebar-active-bg": "rgba(232, 184, 71, 0.15)",
    "sidebar-active-fg": "{color.brand.gold}"
  }
}
```

Only include tokens that differ from the base. Inheriting is explicit — if you don't list it, the base value applies.

### 2. Register it in the build script

Open `packages/tokens/build-tokens.ts` and add your product to the themes array:

```typescript
const PRODUCT_THEMES = [
  "chms",
  "accounting",
  "crm",
  "register",
  "table",
  "vbs",
  "website",
  "my-product",   // ← add here
];
```

### 3. Build and verify

```bash
pnpm --filter @steward-apps/tokens build
```

Check `dist/themes/my-product.css` for the `[data-product="my-product"]` block. Then add an example page:

```bash
cp examples/chms.html examples/my-product.html
# Update the data-product value and page content
```

Then add the theme to the `exports` map in `packages/tokens/package.json` — a
theme that builds but is not exported cannot be imported by any app.

### 4. Add a screenshot test

In `tests/e2e/screenshots.spec.ts`, add light and dark entries:

```typescript
{ name: "my-product-light", path: "my-product.html" },
{ name: "my-product-dark",  path: "my-product.html", dark: true },
```

Run `pnpm screenshots` to generate the baseline snapshots.

---

## Theme Composition with Dark Mode

Dark mode and product themes stack. Dark overrides apply on top of the product theme:

```html
<!-- my-product in dark mode -->
<html data-product="my-product" data-theme="dark">
```

The two attributes are orthogonal: `data-product` picks the palette,
`data-theme` (or the `.dark` class) picks light or dark within it. The CSS
cascade handles the combination automatically — `.dark` and `[data-theme="dark"]`
selectors have higher specificity than `[data-product]` for the color roles that
should flip.

---

## Live Examples

All product themes are demonstrated at the [brand guide](https://24skater.github.io/steward-brand/examples/):

- [ChMS](https://24skater.github.io/steward-brand/examples/chms.html)
- [Accounting](https://24skater.github.io/steward-brand/examples/accounting.html)
- [CRM](https://24skater.github.io/steward-brand/examples/crm.html)
- [Point of Sale](https://24skater.github.io/steward-brand/examples/pos.html)
- [Website (Marketing)](https://24skater.github.io/steward-brand/examples/website.html)
- [Auth Layout](https://24skater.github.io/steward-brand/examples/auth.html)

---

## Related

- [Token Architecture](./token-architecture.md) — How the token pipeline works
- [Brand Identity](./brand-identity.md) — Brand color and type standards
- [`@steward-apps/tokens` README](../packages/tokens/README.md)
