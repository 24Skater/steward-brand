# @steward/eslint-config

Shared ESLint configuration for Steward projects. Uses ESLint flat config (v9+).

## Installation

```bash
pnpm add -D @steward/eslint-config eslint typescript
```

## Available Configs

| Config | Use Case |
|--------|----------|
| `@steward/eslint-config` | Base config for all projects |
| `@steward/eslint-config/react` | React applications |
| `@steward/eslint-config/node` | Node.js backends |

## Usage

Create an `eslint.config.js` file in your project root:

### React Application

```js
import stewardConfig from "@steward/eslint-config/react";

export default [
  ...stewardConfig,
  {
    // Project-specific overrides
    rules: {
      // Add custom rules here
    },
  },
];
```

### Node.js Backend

```js
import stewardConfig from "@steward/eslint-config/node";

export default [
  ...stewardConfig,
  {
    // Project-specific overrides
  },
];
```

## Key Rules

### TypeScript
- Unused variables must be prefixed with `_`
- Consistent type imports enforced
- No explicit `any` (warning)

### React (when using /react config)
- Rules of Hooks enforced
- Exhaustive deps warning
- Self-closing components required
- Array keys required

### General
- `console.log` warnings (except warn/error)
- Strict equality required
- `const` preferred over `let`
- `var` forbidden

## Scripts

Add to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

