# Changesets

This folder contains "changesets" — Markdown files describing package changes.

## Creating a Changeset

When you make changes that should be published:

```bash
pnpm changeset
```

Follow the prompts to:
1. Select which packages have changed
2. Choose the semver bump type (patch/minor/major)
3. Write a summary of your changes

## Releasing

To release new versions:

```bash
# Update versions based on changesets
pnpm version-packages

# Build and publish
pnpm release
```

## More Info

- [Changesets Documentation](https://github.com/changesets/changesets)
- [Using Changesets with pnpm](https://pnpm.io/using-changesets)
