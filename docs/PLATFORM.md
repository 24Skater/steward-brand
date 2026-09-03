# Steward Platform

steward-brand publishes the shared `@steward-apps/*` packages every Steward app
consumes. This file records the platform-level constraints that apply to _this
repository_ and points at the decision record that explains why they exist.

**Decision record:** https://claude.ai/code/artifact/fffcde73-8186-4c63-83f9-979d80f82f42

It covers seven decisions - hosting model, identity, tenancy, where platform
code lives, billing and entitlements, routing, and cross-app integration - plus
the phased roadmap.

## Where this repo sits

This repo is the **design layer**, not the platform layer. The distinction
matters and is easy to blur:

- **Here:** tokens, UI components, icons, email templates, shared configs.
  Things that are genuinely identical across apps and change rarely.
- **`steward-platform` (Phase 1):** the control plane. Signup, orgs, billing,
  entitlements, provisioning. Exposed to apps as an **HTTP API**, not as a
  package.

The reason for the split is deployment cost. An API deploys once. A package has
to be published here, then adopted four times, in four repos, on four
schedules. Anything that changes with the business belongs behind the API.

Only two things are planned to arrive here as packages:
`@steward-apps/platform-client` (a thin entitlement verifier) and
`@steward-apps/tenancy` (extracted from `steward-table/lib/db.ts` in Phase 2).

## Two attributes, two axes

A recurring source of confusion, now settled:

| Attribute      | Selects               | Emitted by                       |
| -------------- | --------------------- | -------------------------------- |
| `data-product` | which product you are | `dist/themes/<product>.css`      |
| `data-theme`   | light or dark         | `dist/tokens.css` (with `.dark`) |

They compose - `<html data-product="chms" data-theme="dark">` is valid and
resolves base → product override → dark override. Do not use `data-theme` for a
product name.

## Adding a theme

A theme that builds but is not in the `exports` map of
`packages/tokens/package.json` cannot be imported by any app. Every theme under
`src/themes/products/` must have a matching export entry. Both lists currently
cover: accounting, chms, crm, register, table, vbs, website.

## Invariants

Enforced by `scripts/ci/check-platform-boundaries.sh`, the `Platform
Boundaries` CI job:

- No hardcoded platform domain. The root domain is configuration.
- No `STRIPE_PLATFORM_*` reference. Platform billing credentials exist only in
  the console's environment.

## Roadmap position

- **Phase 0 (done here):** `test` job added to CI - the repo published packages
  without ever gating on its own test suite; all built themes exported;
  `data-product` documented correctly; boundary guard added.
- **Phase 1:** publish `@steward-apps/platform-client`.
- **Phase 2:** publish `@steward-apps/tenancy`.
- **Phase 4:** contribute `<AppSwitcher/>` to `@steward-apps/ui`.

See the decision record for the full sequence.
