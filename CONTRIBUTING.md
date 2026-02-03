# Contributing to Steward Design System

Thank you for your interest in contributing to the Steward Design System! This document provides guidelines and instructions for contributing.

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0

### Setup

```bash
# Clone the repository
git clone https://github.com/steward-org/steward-brand.git
cd steward-brand

# Install dependencies
pnpm install

# Build all packages
pnpm build
```

## Development Workflow

### Running Development Mode

```bash
# Watch all packages
pnpm dev

# Watch specific package
pnpm --filter @steward/ui dev
pnpm --filter @steward/tokens dev
```

### Building

```bash
# Build all packages
pnpm build

# Build specific package
pnpm build:tokens
pnpm build:ui
```

### Type Checking

```bash
pnpm typecheck
```

### Formatting

```bash
# Check formatting
pnpm format:check

# Fix formatting
pnpm format
```

## Package Structure

| Package | Description |
|---------|-------------|
| `@steward/tokens` | Design tokens (colors, typography, spacing) |
| `@steward/ui` | React component library |
| `@steward/email-templates` | HTML email templates |
| `@steward/eslint-config` | Shared ESLint configuration |
| `@steward/tsconfig` | Shared TypeScript configuration |

## Making Changes

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-fix-name
```

### 2. Make Your Changes

- Follow the existing code style
- Add/update tests if applicable
- Update documentation as needed

### 3. Create a Changeset

For any changes that should be published, create a changeset:

```bash
pnpm changeset
```

Follow the prompts to:
1. Select the packages you've changed
2. Choose the semver bump type (patch/minor/major)
3. Write a description of your changes

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: description of your changes"
```

Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `chore:` Maintenance tasks
- `refactor:` Code refactoring

### 5. Submit a Pull Request

Push your branch and open a PR against `main`.

## Component Guidelines

When adding or modifying UI components:

### Accessibility

- All interactive elements must be keyboard accessible
- Include proper ARIA attributes
- Test with screen readers
- Ensure sufficient color contrast (WCAG 2.1 AA)

### Styling

- Use semantic tokens, never raw color values
- Use the `cn()` utility for class merging
- Support both light and dark modes
- Follow the spacing scale (multiples of 4px)

### API Design

- Props should be intuitive and well-documented
- Use TypeScript for type safety
- Export prop types for consumers
- Follow existing patterns in the codebase

### Example Component Structure

```tsx
import * as React from "react";
import { cn } from "../utils";

export interface MyComponentProps {
  /** Description of the prop */
  variant?: "default" | "alt";
  children: React.ReactNode;
}

/**
 * MyComponent description
 * 
 * @example
 * ```tsx
 * <MyComponent variant="default">Content</MyComponent>
 * ```
 */
const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ variant = "default", children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "base-styles",
          variant === "alt" && "alt-styles",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
MyComponent.displayName = "MyComponent";

export { MyComponent };
```

## Token Guidelines

When modifying design tokens:

1. Update the source file: `packages/tokens/src/tokens.dtcg.json`
2. Update theme files if needed: `packages/tokens/src/themes/*.json`
3. Run `pnpm build:tokens` to regenerate outputs
4. Update documentation in the README

## Questions?

If you have questions, please open an issue or reach out to the maintainers.

