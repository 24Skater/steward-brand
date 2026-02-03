# Custom Icons

This directory contains custom icons specific to the Steward ecosystem.

## Icon Style Guidelines

All custom icons must follow the Lucide icon style:
- **Stroke width:** 2px
- **Stroke cap:** Round
- **Stroke join:** Round
- **Viewbox:** 24x24
- **Color:** Use `currentColor` for flexibility

## Available Icons

Custom product icons and specialized UI icons will be added here as needed.

## Usage

```tsx
import { CustomIcon } from '@steward/ui/icons';

// Icons inherit color from text color
<CustomIcon className="w-6 h-6 text-primary" />
```

## Adding New Icons

1. Design in a 24x24 grid with 2px padding
2. Use 2px stroke width
3. Export as SVG with `currentColor` fill/stroke
4. Name using kebab-case: `icon-name.svg`
5. Add to the icon component index

