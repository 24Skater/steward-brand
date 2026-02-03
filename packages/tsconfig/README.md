# @steward/tsconfig

Shared TypeScript configurations for Steward projects.

## Installation

```bash
pnpm add -D @steward/tsconfig
```

## Available Configs

| Config | Use Case |
|--------|----------|
| `base.json` | Base configuration for all projects |
| `react.json` | React applications (Next.js, Vite) |
| `node.json` | Node.js backend services |
| `library.json` | Publishable packages/libraries |

## Usage

Extend the appropriate config in your `tsconfig.json`:

### React Application

```json
{
  "extends": "@steward/tsconfig/react.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src", "*.config.ts"],
  "exclude": ["node_modules"]
}
```

### Node.js Backend

```json
{
  "extends": "@steward/tsconfig/node.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### Library Package

```json
{
  "extends": "@steward/tsconfig/library.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

## Key Settings

- **Target:** ES2022 (modern JavaScript features)
- **Module:** ESNext with bundler resolution
- **Strict mode:** Enabled with `noUncheckedIndexedAccess`
- **Declarations:** Generated with source maps

