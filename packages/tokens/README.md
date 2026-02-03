# @steward/tokens

Design tokens for the Steward design system. Single source of truth for colors, typography, spacing, and more.

## Installation

```bash
pnpm add @steward/tokens
```

## Usage

### CSS Variables

Import the CSS file in your app's root stylesheet:

```css
/* app.css or globals.css */
@import '@steward/tokens/dist/tokens.css';
```

Then use the CSS variables:

```css
.my-component {
  color: var(--st-fg);
  background: var(--st-surface);
  border: 1px solid var(--st-border);
  border-radius: var(--st-radius-md);
}

.primary-button {
  background: var(--st-primary);
  color: var(--st-primaryFg);
}
```

### TypeScript

```typescript
import { tokens, semanticTokens } from '@steward/tokens';

// Access raw tokens
console.log(tokens.color.brand.blue); // "#2563EB"
console.log(tokens.typography.fontSize.body); // "16px"

// Access semantic tokens by theme
console.log(semanticTokens.light.primary); // "#2563EB"
console.log(semanticTokens.dark.primary); // "#3B82F6"
```

### JSON

```javascript
import tokens from '@steward/tokens/json';
```

## Token Categories

### Colors

**Brand Colors:**
- `navy` - Primary brand color (#1B2A41)
- `blue` - Action/CTA color (#2563EB)
- `emerald` - Success color (#16A34A)
- `amber` - Warning color (#F59E0B)
- `red` - Danger/error color (#DC2626)

**Semantic Tokens:**
- `--st-bg` / `--st-fg` - Background and foreground
- `--st-surface` / `--st-surfaceMuted` - Surface colors
- `--st-border` - Border color
- `--st-primary` / `--st-primaryFg` - Primary action
- `--st-success` / `--st-warning` / `--st-danger` - Status colors
- `--st-link` / `--st-focusRing` - Interactive states

### Typography

```css
/* Font families */
--st-font-sans: Inter, system-ui, ...;
--st-font-mono: ui-monospace, ...;

/* Font sizes */
--st-font-size-display: 36px;
--st-font-size-h1: 30px;
--st-font-size-h2: 24px;
--st-font-size-h3: 20px;
--st-font-size-body: 16px;
--st-font-size-small: 14px;
--st-font-size-caption: 12px;
```

### Spacing

Based on 4px increments:

```css
--st-spacing-1: 4px;
--st-spacing-2: 8px;
--st-spacing-3: 12px;
--st-spacing-4: 16px;
/* ... up to 24 (96px) */
```

### Border Radius

```css
--st-radius-none: 0px;
--st-radius-sm: 6px;
--st-radius-md: 10px;
--st-radius-lg: 16px;
--st-radius-full: 9999px;
```

## Dark Mode

The tokens automatically support dark mode via the `.dark` class or `[data-theme="dark"]` attribute:

```html
<!-- Light mode (default) -->
<html>
  <body>...</body>
</html>

<!-- Dark mode -->
<html class="dark">
  <body>...</body>
</html>

<!-- Or with data attribute -->
<html data-theme="dark">
  <body>...</body>
</html>
```

## shadcn/ui Compatibility

For shadcn/ui compatibility, the tokens also export standard CSS variable names:

```css
--background, --foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
/* etc. */
```

## Building

```bash
pnpm build
```

This generates:
- `dist/tokens.css` - CSS variables
- `dist/tokens.js` - ES module with typed tokens
- `dist/tokens.d.ts` - TypeScript declarations
- `dist/tokens.json` - JSON format for tooling

