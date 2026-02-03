# Steward Design System

**Open-source church operations, made simple.**

Steward helps churches run their operations with clarity, care, and confidence—without needing an IT department.

This monorepo contains the shared brand assets, design tokens, UI components, and configurations for the Steward ecosystem.

## Packages

| Package | Description | Version |
|---------|-------------|---------|
| [@steward/tokens](./packages/tokens) | Design tokens (colors, typography, spacing) | ![npm](https://img.shields.io/npm/v/@steward/tokens) |
| [@steward/ui](./packages/ui) | React component library | ![npm](https://img.shields.io/npm/v/@steward/ui) |
| [@steward/email-templates](./packages/email-templates) | HTML email templates | ![npm](https://img.shields.io/npm/v/@steward/email-templates) |
| [@steward/eslint-config](./packages/eslint-config) | Shared ESLint configuration | ![npm](https://img.shields.io/npm/v/@steward/eslint-config) |
| [@steward/tsconfig](./packages/tsconfig) | Shared TypeScript configuration | ![npm](https://img.shields.io/npm/v/@steward/tsconfig) |

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/steward-org/steward-brand.git
cd steward-brand

# Install dependencies
pnpm install

# Build all packages
pnpm build
```

### Development

```bash
# Run all packages in dev mode
pnpm dev

# Run Storybook for UI components
pnpm dev:storybook

# Run documentation site
pnpm dev:docs
```

## Using Steward Packages

### Install in your project

```bash
pnpm add @steward/tokens @steward/ui
```

### Import tokens

```css
/* Import CSS variables in your app's root CSS */
@import '@steward/tokens/dist/tokens.css';
```

### Use the Tailwind preset

```js
// tailwind.config.js
import stewardPreset from '@steward/ui/tailwind.preset';

export default {
  presets: [stewardPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@steward/ui/dist/**/*.{js,ts,jsx,tsx}',
  ],
};
```

### Use components

```tsx
import { Button, Card, Input } from '@steward/ui';

function MyComponent() {
  return (
    <Card>
      <Input label="Email" type="email" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

## Brand Guidelines

### Colors

- **Steward Navy (Primary):** `#1B2A41`
- **Steward Blue (Action):** `#2563EB`
- **Steward Emerald (Success):** `#16A34A`
- **Steward Amber (Attention):** `#F59E0B`
- **Steward Red (Danger):** `#DC2626`

### Typography

- **Primary Font:** Inter
- **Monospace:** System monospace stack

### Brand Values

- **Trustworthy**: Clean UI, consistent patterns, no surprises
- **Service-minded**: Helpful teammate, not enterprise software
- **Simple**: Every screen answers "what do I do next?"
- **Respectful**: Warm, not cheesy

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute to this project.

## License

MIT License - see [LICENSE](./LICENSE) for details.

