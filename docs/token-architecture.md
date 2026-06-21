# Token Architecture

How design tokens are defined, built, and consumed across the Steward ecosystem.

## Overview

```
src/tokens.dtcg.json          ← Single source of truth (DTCG format)
src/themes/products/*.json    ← Per-product semantic overrides
        │
        ▼
build-tokens.ts               ← Build script (tsx)
        │
        ├── dist/tokens.css   ← CSS custom properties (--st-*)
        ├── dist/tokens.js    ← ES module (typed)
        ├── dist/tokens.d.ts  ← TypeScript declarations
        └── dist/tokens.json  ← JSON for tooling
```

Tokens are authored once in `tokens.dtcg.json` using the [Design Token Community Group](https://design-tokens.github.io/community-group/format/) (W3C draft) format. The build script resolves references, applies theme overrides, and emits all four output formats.

---

## Token Format (DTCG)

Every token follows this structure:

```json
{
  "color": {
    "brand": {
      "gold": {
        "$value": "#E8B847",
        "$type": "color",
        "$description": "Kingdom Gold — primary brand color"
      }
    }
  }
}
```

| Field | Required | Purpose |
|---|---|---|
| `$value` | Yes | The token value |
| `$type` | Yes | `color`, `dimension`, `fontFamily`, `fontWeight`, `duration` |
| `$description` | No | Human-readable intent |

References use curly-brace syntax: `"{color.brand.gold}"` resolves to the value of `color.brand.gold`.

---

## Token Layers

There are two layers. Both live in `@steward-apps/tokens`.

### Layer 1 — Primitive tokens

Raw values with no semantic meaning. Named for what they are, not how they're used.

```json
{
  "color": {
    "brand": {
      "gold": { "$value": "#E8B847", "$type": "color" },
      "navy": { "$value": "#0D1B2E", "$type": "color" }
    },
    "neutral": {
      "warmSurface": { "$value": "#FDFAF3", "$type": "color" },
      "warmSubtle":  { "$value": "#F5EED8", "$type": "color" }
    }
  }
}
```

Primitive tokens are internal. Components and product styles should reference semantic tokens, not primitives.

### Layer 2 — Semantic tokens

Named for how they're used. Reference primitives by value. The base theme (`tokens.dtcg.json`) defines defaults; product themes (`src/themes/products/*.json`) override only what differs.

```json
{
  "semantic": {
    "primary":    { "$value": "{color.brand.gold}", "$type": "color" },
    "bg":         { "$value": "{color.neutral.warmSubtle}", "$type": "color" },
    "surface":    { "$value": "{color.neutral.surface}", "$type": "color" },
    "sidebar-bg": { "$value": "{color.brand.navy}", "$type": "color" }
  }
}
```

---

## CSS Output (`--st-*` prefix)

Every semantic token becomes a CSS custom property prefixed with `--st-`:

```css
:root {
  --st-primary: #E8B847;
  --st-primaryFg: #0D1B2E;
  --st-bg: #FDFAF3;
  --st-surface: #FFFFFF;
  --st-surfaceMuted: #F5EED8;
  --st-fg: #0D1B2E;
  --st-border: #DDD0A8;
  --st-sidebar-bg: #0D1B2E;
  --st-sidebar-fg: #FDFAF3;
  /* ... */
}

.dark {
  --st-bg: #0D1B2E;
  --st-surface: #1A2F4A;
  /* ... */
}
```

Product themes inject their overrides under a `[data-theme="<product>"]` selector:

```css
[data-theme="chms"] {
  --st-primary: #E8B847;
  --st-sidebar-bg: #0D1B2E;
  /* ... */
}
```

---

## Consuming Tokens

### In CSS

```css
@import "@steward-apps/tokens/dist/tokens.css";

.my-button {
  background: var(--st-primary);
  color: var(--st-primaryFg);
  border-radius: var(--st-radius-md);
}
```

### In TypeScript

```typescript
import { tokens, semanticTokens } from "@steward-apps/tokens";

// Primitive
const gold = tokens.color.brand.gold;       // "#E8B847"

// Semantic (per theme)
const primary = semanticTokens.light.primary; // "#E8B847"
const darkBg  = semanticTokens.dark.bg;       // "#0D1B2E"
```

### In React (via @steward-apps/ui)

Components consume tokens automatically via Tailwind v4 and the `tailwind.preset.js`:

```tsx
import { Button } from "@steward-apps/ui";

// No manual token access needed — the component already uses --st-primary
<Button variant="default">Save</Button>
```

### Applying a Product Theme

```html
<!-- ChMS theme -->
<html data-theme="chms">

<!-- Or dynamically -->
<script>
  document.documentElement.dataset.theme = "chms";
</script>
```

---

## Dark Mode

Dark mode is toggled by adding the `.dark` class to `<html>`. It composes with product themes:

```html
<!-- ChMS, dark mode -->
<html data-theme="chms" class="dark">
```

The token system resolves in this order: base → product override → dark override.

---

## Spacing Scale

Built on 4px increments, matching Tailwind's default scale:

| Token | Value | Tailwind equiv |
|---|---|---|
| `--st-spacing-1` | 4px | `p-1` |
| `--st-spacing-2` | 8px | `p-2` |
| `--st-spacing-4` | 16px | `p-4` |
| `--st-spacing-6` | 24px | `p-6` |
| `--st-spacing-8` | 32px | `p-8` |
| `--st-spacing-12` | 48px | `p-12` |

---

## Border Radius

| Token | Value | Intent |
|---|---|---|
| `--st-radius-none` | 0px | Sharp corners (tables, dividers) |
| `--st-radius-sm` | 6px | Badges, tags, small inputs |
| `--st-radius-md` | 10px | Cards, buttons, default inputs |
| `--st-radius-lg` | 16px | Modals, large panels |
| `--st-radius-full` | 9999px | Pills, avatars |

---

## Building Tokens

```bash
# From repo root
pnpm build

# Tokens package only
pnpm --filter @steward-apps/tokens build
```

Output lands in `packages/tokens/dist/`. Do not commit `dist/` — it is regenerated on every publish.

---

## Adding a New Token

1. Add the value to `packages/tokens/src/tokens.dtcg.json` under the appropriate category
2. If it's semantic, reference a primitive: `"$value": "{color.brand.gold}"`
3. Run `pnpm build` and verify the CSS output in `dist/tokens.css`
4. If the token needs a product-specific override, see [Product Themes](./product-themes.md)

---

## shadcn/ui Compatibility

The token build also emits the standard shadcn/ui variable names (`--background`, `--foreground`, `--primary`, etc.) so Steward components stay compatible with the broader shadcn/ui ecosystem without requiring mapping.

---

## Related

- [Brand Identity](./brand-identity.md) — Where the values come from
- [Product Themes](./product-themes.md) — Per-product semantic overrides
- [`@steward-apps/tokens` README](../packages/tokens/README.md)
