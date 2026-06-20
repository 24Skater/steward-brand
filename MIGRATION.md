# Migrating to @steward-apps/tokens

This guide is for engineers integrating `@steward-apps/tokens` into a Steward ecosystem app (or upgrading from an older approach).

## Overview

`@steward-apps/tokens` is the single source of truth for all visual identity across the Steward product family. It ships:

- `dist/tokens.css` — base semantic tokens (colors, typography, spacing, shadows, radius)
- `dist/themes/*.css` — per-product overrides scoped to `[data-product="X"]`

Apps activate their theme by adding `data-product="<product>"` to `<html>`.

---

## Before / After

### Before (raw Tailwind / hardcoded values)

```css
/* globals.css — old pattern */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%; /* hardcoded blue */
}
```

```tsx
// component — hardcoded classes
<button className="bg-blue-600 text-white hover:bg-blue-700">
```

### After (steward tokens)

```css
/* globals.css — new pattern */
@import "tailwindcss";
@import "@steward-apps/tokens/css";
@import "@steward-apps/tokens/themes/register"; /* product-specific */

@theme inline {
  --color-background: var(--st-bg);
  --color-foreground: var(--st-fg);
  --color-primary: var(--st-primary);
  --color-primary-foreground: var(--st-primaryFg);
  /* ... map all semantic tokens to Tailwind utilities */
}
```

```tsx
// component — semantic Tailwind classes
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
```

---

## Token Reference

All tokens are prefixed `--st-`. The full list:

| Token | Description | Example value |
|-------|-------------|---------------|
| `--st-bg` | Page background | `#F9FAFB` |
| `--st-fg` | Body text | `#111827` |
| `--st-surface` | Card / panel background | `#FFFFFF` |
| `--st-surfaceMuted` | Subtle background | `#F3F4F6` |
| `--st-border` | Default border | `#D1D5DB` |
| `--st-primary` | Brand primary (Kingdom Gold) | `#E8B847` |
| `--st-primaryFg` | Text on primary | `#0D1B2E` |
| `--st-secondary` | Secondary action | `#F9FAFB` |
| `--st-secondaryFg` | Text on secondary | `#111827` |
| `--st-accent` | Product accent | varies per product |
| `--st-accentFg` | Text on accent | varies per product |
| `--st-muted` | Muted text | `#6B7280` |
| `--st-mutedFg` | Muted text foreground | `#374151` |
| `--st-danger` | Destructive state | `#DC2626` |
| `--st-dangerFg` | Text on danger | `#FFFFFF` |
| `--st-focusRing` | Focus outline | `#E8B847` |
| `--st-link` | Link color | `#C49A2E` |
| `--st-font-sans` | Sans-serif font stack | `Inter, system-ui, sans-serif` |
| `--st-font-display` | Display font (headings) | `Georgia, serif` |
| `--st-font-mono` | Monospace font | `JetBrains Mono, monospace` |
| `--st-radius-sm` | Small border radius | `0.25rem` |
| `--st-radius-md` | Medium border radius | `0.375rem` |
| `--st-radius-lg` | Large border radius | `0.5rem` |
| `--st-shadow-sm` | Small shadow | `0 1px 2px ...` |
| `--st-shadow-md` | Medium shadow | `0 4px 6px ...` |
| `--st-shadow-lg` | Large shadow | `0 10px 15px ...` |

---

## Product Themes

Each product activates a theme by:
1. Importing the theme CSS file
2. Setting `data-product` on `<html>`

| Product | Import | `data-product` |
|---------|--------|----------------|
| Congregation (ChMS) | `@import "@steward-apps/tokens/themes/chms"` | `"chms"` |
| Register (POS) | `@import "@steward-apps/tokens/themes/register"` | `"register"` |
| Table | `@import "@steward-apps/tokens/themes/table"` | `"table"` |
| VBS | `@import "@steward-apps/tokens/themes/vbs"` | `"vbs"` |

---

## Step-by-Step Checklist

### 1. Install the package

Since `@steward-apps/tokens` is not yet published to npm, copy the built dist into node_modules:

**Windows (PowerShell):**
```powershell
$src = "C:\path\to\steward-brand\packages\tokens"
$dst = ".\node_modules\@steward-apps\tokens"
New-Item -ItemType Directory -Force -Path $dst | Out-Null
Copy-Item -Recurse -Force "$src\dist" "$dst\dist"
Copy-Item -Force "$src\package.json" "$dst\package.json"
```

Once npm-published, this becomes:
```bash
pnpm add @steward-apps/tokens@1.0.0
```

Then add to `package.json`:
```json
"@steward-apps/tokens": "1.0.0"
```

### 2. Update globals.css

**Tailwind v4 (Vite — `@tailwindcss/vite` plugin):**
```css
@import "tailwindcss";
@import "@steward-apps/tokens/css";
@import "@steward-apps/tokens/themes/<product>";
@plugin "tailwindcss-animate";

@theme inline {
  --color-background: var(--st-bg);
  --color-foreground: var(--st-fg);
  --color-card: var(--st-surface);
  --color-card-foreground: var(--st-fg);
  --color-primary: var(--st-primary);
  --color-primary-foreground: var(--st-primaryFg);
  --color-secondary: var(--st-secondary);
  --color-secondary-foreground: var(--st-secondaryFg);
  --color-muted: var(--st-surfaceMuted);
  --color-muted-foreground: var(--st-muted);
  --color-accent: var(--st-accent);
  --color-accent-foreground: var(--st-accentFg);
  --color-destructive: var(--st-danger);
  --color-destructive-foreground: var(--st-dangerFg);
  --color-border: var(--st-border);
  --color-input: var(--st-border);
  --color-ring: var(--st-focusRing);
  --radius: var(--st-radius-md);
}

@layer base {
  * { border-color: var(--st-border); }
  body { background-color: var(--st-bg); color: var(--st-fg); }
}
```

**Tailwind v4 (Next.js — `@tailwindcss/postcss` plugin):** same CSS, different plugin in `postcss.config.mjs`.

### 3. Set `data-product` on `<html>`

**Next.js (`app/layout.tsx`):**
```tsx
<html lang="en" data-product="register">
```

**Vite + React (`index.html`):**
```html
<html lang="en" data-product="register">
```

### 4. Replace hardcoded color classes

Replace raw palette classes with semantic Tailwind classes that map to tokens:

| Old class | New class |
|-----------|-----------|
| `bg-white` | `bg-background` or `bg-card` |
| `bg-gray-50` | `bg-muted` |
| `text-gray-900` | `text-foreground` |
| `text-gray-500` | `text-muted-foreground` |
| `bg-blue-600` | `bg-primary` |
| `text-blue-600` | `text-primary` |
| `text-white` (on primary) | `text-primary-foreground` |
| `border-gray-200` | `border-border` |
| `ring-blue-500` | `ring-ring` |

### 5. Replace `--sp-*` or other legacy custom properties

Any local `--sp-*`, `--pos-*`, `--chms-*` variables that duplicate tokens should be:
- Replaced with their `--st-*` equivalent, or
- Aliased temporarily: `--sp-gold: var(--st-primary);`

### 6. Update display name strings

Replace old product names in UI text:

| Old | New |
|-----|-----|
| `StewardChMS` | `Steward · Congregation` |
| `StewardPOS` / `Steward POS` | `Steward · Register` |
| `Steward Table` | `Steward · Table` |
| `VBS App` | `Steward · VBS` |

### 7. Verify token propagation

Add this Playwright assertion to the app's E2E suite:

```ts
test("steward tokens are active", async ({ page }) => {
  await page.goto("/");
  const primary = await page.evaluate(() =>
    getComputedStyle(document.documentElement)
      .getPropertyValue("--st-primary")
      .trim()
  );
  expect(primary).toBe("#E8B847");
});
```

### 8. Rebuild and verify

```bash
pnpm build     # or next build / vite build
pnpm typecheck
```

Check that no hardcoded hex values remain in component files:
```bash
grep -r "#2563EB\|#3B82F6\|#1D4ED8" src/  # should return nothing
```

---

## Tailwind v3 → v4 Upgrade (if needed)

If the app is still on Tailwind v3:

1. Replace `tailwindcss@^3` with `tailwindcss@^4` in `package.json`
2. **Vite apps**: remove `tailwindcss` from `postcss.config.js`, add `@tailwindcss/vite` plugin to `vite.config.ts`
3. **Next.js apps**: replace `tailwindcss` PostCSS plugin with `@tailwindcss/postcss`
4. In CSS: replace `@tailwind base; @tailwind components; @tailwind utilities;` with `@import "tailwindcss";`
5. Archive `tailwind.config.ts` (no longer used in v4)
6. Register Tailwind plugins in CSS: `@plugin "tailwindcss-animate";`
7. Move all custom theme values into `@theme {}` or `@theme inline {}` blocks in CSS

---

## Common Errors

**`Can't resolve @steward-apps/tokens/css`**
The package isn't in `node_modules`. Re-run the PowerShell install step above.

**`Missing "./dist/themes/register.css" specifier in "exports"`**
Use named export paths (`@import "@steward-apps/tokens/themes/register"`) not dist paths (`@import "@steward-apps/tokens/dist/themes/register.css"`).

**`@theme inline` values not applying**
Only `@theme inline` (not `@theme`) allows CSS variable references. Make sure `inline` is present.

**Black flash on page load (Windows Chrome)**
Add `color-scheme: only light` and `background-color: white` to the `html` rule in your base layer. See steward-table's `globals.css` for the full fix.
