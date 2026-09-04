# Platform Architecture

How the Steward products fit together: what is shared, what is per-product, and the tenancy, identity, and routing model they converge on.

> **Status:** this is a design document. The architecture below is the agreed target that the
> products are being built toward — not a description of what every product implements today.
> Where a product diverges, the architecture is what it is moving to.

## Overview

Steward is a family of applications for churches, developed independently but delivered as one
hosted platform. This repository is the shared layer they all consume.

```
┌─────────────────────── shared ───────────────────────┐
│  steward-brand   @steward-apps/tokens                │
│                  @steward-apps/ui                    │
│                  @steward-apps/icons                 │
│                  @steward-apps/email-templates       │
│                  @steward-apps/eslint-config         │
│                  @steward-apps/tsconfig              │
└──────────────────────────┬───────────────────────────┘
                           │ consumed by
       ┌───────────────────┼───────────────────┐
       │                   │                   │
┌──────▼──────┐   ┌────────▼────────┐   ┌──────▼──────┐
│ Congregation│   │   StewardPOS    │   │     VBS     │
│   (ChMS)    │   │  + Table add-on │   │             │
│             │   │                 │   │             │
│ members     │   │ point of sale   │   │ registration│
│ households  │   │ online ordering │   │ classes     │
│ giving      │   │ fulfillment     │   │ check-in    │
│ events      │   │                 │   │             │
└─────────────┘   └─────────────────┘   └─────────────┘
```

Each product is a separate application with its own database. They share a design system, a
sign-on provider, and a control plane — and nothing else. That boundary is deliberate: see
[Where code lives](#where-code-lives).

---

## Principles

**Shared where it is genuinely the same, duplicated where it is not.** A design token means the
same thing in every product, so it is shared. A permission vocabulary does not — "can refund a
transaction" has no meaning in a VBS registration — so authorization stays per-product.

**Prefer a service over a package.** A shared HTTP API is deployed once. A shared npm package must
be published, then adopted, re-tested, and redeployed in every consuming product. For a small team
that difference dominates. Packages are reserved for code that must genuinely run in-process.

**Enforcement that fails loudly.** Safety properties are enforced where they cannot be forgotten,
and violations raise errors rather than silently returning wrong results. A tenancy check that
returns everything when it is omitted is worse than no check, because nothing surfaces the mistake.

**Configuration over hardcoding for anything environmental.** Root domains, endpoints, and
identifiers are configuration. This is why the platform's domain can change without a code change.

---

## Multi-tenancy

Every product serves many organizations from a shared deployment, with tenants isolated by row
scoping rather than by separate infrastructure per customer.

The model has three parts:

| Concept          | Meaning                                                                                            |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| **Organization** | One church. Identified by a UUID issued by the control plane, and used unchanged by every product. |
| **User**         | A person. Global — one account across the whole platform.                                          |
| **Membership**   | The link between a user and an organization, carrying that person's roles there.                   |

Users are global and organization-scoped uniqueness lives on membership, not on the user record.
This is what allows one person to belong to more than one organization without duplicate accounts.

**Enforcement lives in the data-access layer, not in individual queries.** A wrapper around the ORM
inspects every operation on a tenant-scoped model and raises if the organization scope is absent.
Correctness therefore does not depend on the author of each query remembering — a query that
forgets its scope fails immediately and visibly rather than quietly returning another
organization's rows.

Two supporting rules keep that guarantee honest:

- Every tenant-scoped model must be explicitly classified as tenanted or global. A test reads the
  schema and fails the build when a model appears in neither list, so a newly added model cannot
  silently escape the check.
- Object storage keys are prefixed by organization, and access is checked on read.

---

## Cells

Organizations are assigned to a **cell** — a complete, independent set of the platform's databases
and application instances.

```
control plane
   orgs.cell_id ──► cells (endpoints, database, status: open | full | draining)
                      │
        ┌─────────────┴─────────────┐
        │                           │
    ┌───▼────┐                  ┌───▼────┐
    │ cell 1 │                  │ cell 2 │
    │ apps + │                  │ apps + │
    │  DBs   │                  │  DBs   │
    └────────┘                  └────────┘
```

At small scale there is exactly one cell and the lookup is trivial. The routing indirection exists
from the beginning anyway, because retrofitting it means teaching every application that its
database address is dynamic.

Cells buy three things:

- **Bounded blast radius.** A bad migration or a runaway query affects one cell, not the fleet.
  Schema changes roll cell by cell.
- **Horizontal headroom.** When a cell is full it is marked `full` and new organizations are placed
  in the next one, with no application change.
- **Dedicated deployments for free.** An organization that requires its own database is a cell of
  size one — the same code path, not a second architecture.

Row volume is rarely the limit. Connection count and blast radius are, which is what this
addresses.

---

## Routing

Applications are addressed by hostname, with the root domain supplied as configuration:

```
app.<root>                          the control plane
{tenant}-{app}.app.<root>           an organization's instance of one application
id.<root>                           the sign-on provider
```

The flat, single-level tenant namespace is deliberate. One wildcard DNS record and one wildcard
certificate cover every organization and every application, so **provisioning a new tenant requires
no DNS change and no certificate issuance.** Adding a customer touches the database and nothing
else.

The edge resolves the hostname to an organization and a cell, then proxies to that cell's
application instance. Each application also reads its own tenant from the host header.

### Cookies

Because every tenant shares a parent domain, session cookies are **host-only** — never scoped to
the parent — so one organization's origin cannot receive another's cookie, and no tenant page can
set a cookie the control plane would honour. The control-plane session additionally carries the
`__Host-` prefix, which browsers refuse unless the cookie is host-only, secure, and path `/`.

---

## Identity

A single OIDC provider handles interactive sign-on for every application. Applications add it as
one authentication provider among their existing ones rather than replacing local authentication,
which keeps a working sign-in path throughout any migration.

The provider answers _who is this person_. The control plane answers _what may they do_ —
organization membership and roles are platform data, not identity-provider data. Authorization
itself stays inside each product, because permission vocabularies are product-specific.

**Machine and device credentials are explicitly out of scope for single sign-on.** A cashier's PIN
authenticates a till and a shift, not a person; an API key authenticates a caller; a kiosk token
authenticates a shared physical device. Federating those would turn a short device credential into
a credential against the whole platform. They remain application-local — and each one carries an
organization scope.

---

## Entitlements

Which organization may use which application is platform state, held by the control plane.

```
control plane  ──►  signed entitlement token (short-lived)
                         │
                         ▼
applications verify offline against a published JWKS
```

Applications never query the billing system. They fetch a short-lived signed token, verify it
offline against a published key set, and cache the result. Three properties matter:

- **Offline verification.** Authorization does not add a network hop to every request.
- **Fail open, deliberately.** If the control plane is unreachable, applications honour the last
  valid entitlement for a bounded window before degrading to read-only. An outage in a supporting
  service must not stop a church running a Sunday service.
- **Enforced cheapest-first.** The edge refuses to route to an application an organization is not
  entitled to, before any application code runs.

---

## Where code lives

| Layer                                                     | Home                        | Shipped as          |
| --------------------------------------------------------- | --------------------------- | ------------------- |
| Design tokens, UI, icons, email templates, shared configs | `steward-brand` (this repo) | Public npm packages |
| Control plane, provisioning, entitlements, platform data  | Platform repository         | A deployed service  |
| Tenancy guard, entitlement client                         | Platform repository         | Two npm packages    |
| Product features, domain models, authorization            | Each product repository     | The application     |

Only two things are published as packages from the platform layer, and both for the same reason:
they must run inside the application process. The tenancy guard wraps the ORM, and the entitlement
client verifies a token on each request. Everything else the platform offers is an HTTP API.

Design tokens and components are the counter-example that proves the rule — they are compile-time
concerns by nature, cannot be an API, and are shared precisely because they mean the same thing
everywhere. See [token-architecture.md](token-architecture.md) and
[product-themes.md](product-themes.md).

---

## Related

- [token-architecture.md](token-architecture.md) — how tokens are authored, built, and consumed
- [product-themes.md](product-themes.md) — per-product theming
- [brand-identity.md](brand-identity.md) — the brand this system expresses
