# README Standard

Every Steward repository's README follows this document. It exists because the
six READMEs drifted into six different products: one had a purple hero, one had
no hero at all, one used Tailwind blue for a product whose theme accent is
orange, and two used colours that appear nowhere in the token system.

This is the owning document for how a Steward README looks. If something here
disagrees with a README, the README is wrong.

Scope: `StewardChMS`, `stewardpos`, `steward-table`, `StewardVBS`, `steward-brand`,
`steward-platform`. `StewardVBS` is cloned locally as `vbs-app`; the GitHub name
is canonical and the old one only works by redirect.

---

## The hero

Generated, never hand-drawn. `scripts/readme-hero.mjs` in this repository emits
all six banners from one template, so the frame is provably identical and only
the accent and the copy change.

```bash
node scripts/readme-hero.mjs
```

The frame is fixed: 1600x420, navy ground (`#0D1B2E` against `#081320`), the
Steward mark in Kingdom Gold, a `STEWARD` eyebrow, the product name at 74px/600,
a one-line tagline, a hairline rule, and a metadata row. The only ornament is
the mark again at 612px bleeding off the right edge at 7% opacity.

Changing a hero means changing the generator and re-running it. Editing one
banner by hand is how the drift started.

### Accents

Every accent is a token. None is invented for the banner.

| Repository         | Product      | Accent    | Where it comes from                 |
| ------------------ | ------------ | --------- | ----------------------------------- |
| `StewardChMS`      | Congregation | `#2563EB` | `color.brand.blue`                  |
| `stewardpos`       | StewardPOS   | `#16A34A` | `color.brand.emerald`               |
| `steward-table`    | Table        | `#0E7490` | `themes/products/table.json` accent |
| `StewardVBS`       | VBS          | `#F97316` | `themes/products/vbs.json` accent   |
| `steward-brand`    | Brand        | `#E8B847` | `color.brand.gold`                  |
| `steward-platform` | Platform     | `#6B7A8D` | `--st-muted`                        |

Two of these need their reasoning recorded, because the obvious choice was wrong
in both cases.

**Congregation and StewardPOS cannot use their own theme accents.** The ChMS
theme's accent is navy `#0D1B2E` and the register theme has no accent at all —
its identity is a `#111827` sidebar. Both are invisible on a navy ground. They
fall back to the nearest brand primitive that stays legible: blue for
Congregation, emerald for StewardPOS.

**Platform is deliberately not a product colour.** It is the private control
plane, not an application a church buys, so it takes the neutral steel and the
absence of an accent is the point.

### Banner paths

These differ per repository because each already had its own convention, and
renaming assets breaks every external link that points at them.

| Repository         | Path                         |
| ------------------ | ---------------------------- |
| `StewardChMS`      | `docs/assets/hero.svg`       |
| `stewardpos`       | `docs/brand/hero-banner.svg` |
| `steward-table`    | `docs/assets/hero.svg`       |
| `StewardVBS`       | `Docs/banner.svg`            |
| `steward-brand`    | `assets/readme-hero.svg`     |
| `steward-platform` | `docs/assets/img/hero.svg`   |

---

## Badges

One row. Never two. `style=flat-square` and `labelColor=0D1B2E` on every badge,
with the repository's accent as the colour — so the badge row picks up the hero
without being told to.

```markdown
<a href="https://github.com/24Skater/REPO/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/24Skater/REPO/ci.yml?style=flat-square&label=CI&labelColor=0D1B2E&color=ACCENT" alt="CI"></a>
<a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-ACCENT?style=flat-square&labelColor=0D1B2E" alt="MIT licence"></a>
<img src="https://img.shields.io/badge/self--hosted-yes-6B7A8D?style=flat-square&labelColor=0D1B2E" alt="Self-hosted">
```

Four badges is the ceiling. A stack badge earns its place only when the stack is
the reason someone is reading — `steward-brand` lists its four published
packages, and nothing else lists its framework versions, because a version
badge is a thing that goes stale and makes a live repository look abandoned.

---

## Section order

Product applications — Congregation, StewardPOS, Table, VBS — use this order.
Deviating needs a reason better than preference.

1. **Hero** — banner, badge row, inline nav
2. **Identity** — two or three sentences: what it is, who runs it, why it exists
3. **Proof** — a screenshot or GIF, before any explanation
4. **What it does** — a three-column table with the repository's own SVG icons
5. **Quick start** — the shortest path to a running instance, copy-pasteable
6. **Configuration** — a table, always a table
7. **Architecture** — a diagram and the decisions worth naming
8. **Status** — what is shipped, what is not, what is known-broken
9. **The Steward family** — the shared block below, verbatim
10. **Documentation** — links out, never duplicated content
11. **Security** — reporting address and the guarantees made
12. **Contributing**
13. **Licence**

`steward-brand` and `steward-platform` are not applications and stop after
section 3 diverging, but they keep the hero, the badge row, the family block and
the licence line.

---

## The family block

Every README carries this, verbatim, immediately before Documentation. It is the
single strongest signal that the six repositories are one product, and it is the
reason a visitor who arrives at VBS learns that Congregation exists.

```markdown
## The Steward family

Steward is four applications on one design system. Each one runs standalone and
self-hosted — nothing here requires the others, or us.

| Application                                                 | What it does                                 |
| ----------------------------------------------------------- | -------------------------------------------- |
| **[Congregation](https://github.com/24Skater/StewardChMS)** | Members, giving, worship planning, reporting |
| **[StewardPOS](https://github.com/24Skater/stewardpos)**    | Point of sale, inventory, returns            |
| **[Table](https://github.com/24Skater/steward-table)**      | Food orders, kitchen display, delivery       |
| **[VBS](https://github.com/24Skater/StewardVBS)**           | Registration, check-in, reporting            |

They share one design system — [Steward Brand](https://github.com/24Skater/steward-brand),
the tokens, components and icons every screen is built from.
```

The repository doing the listing still appears in its own table. Removing it
makes the set look like three.

---

## Voice

The brand voice in [brand-identity.md](brand-identity.md) applies to READMEs
too: a helpful teammate, not enterprise software.

| Write this                                 | Not this                                     |
| ------------------------------------------ | -------------------------------------------- |
| "Totals are recomputed on the server."     | "Leverages robust server-side validation."   |
| "Runs on one machine with Docker."         | "Enterprise-grade containerised deployment." |
| "Not tested with more than 5,000 members." | _(silence)_                                  |

Specific rules, all of them things that went wrong at least once:

- **No emoji.** The applications' own UI copy bans them; the READMEs match. The
  repositories ship SVG icon sets — use those.
- **Sentence case headings.** `## What it does`, not `## What It Does`.
- **No adjective-first openings.** "A powerful, flexible platform for..." says
  nothing. Name what it does in the first line.
- **Say what is not built.** The Status section is the most-read section by
  anyone deciding whether to trust the project.
- **Every command must run.** `steward-table` shipped a clone URL pointing at a
  `steward-app` organisation that does not exist, for as long as it had a README.

---

## Naming

Settled, and the two stale spellings that keep coming back are listed so they
can be recognised.

| Product           | Written as               | Not                                                      |
| ----------------- | ------------------------ | -------------------------------------------------------- |
| Church management | **Steward Congregation** | ~~Steward Register~~ for POS; ChMS is fine as a subtitle |
| Point of sale     | **StewardPOS**           | ~~Steward Register~~, ~~Steward POS~~                    |
| Food orders       | **Steward Table**        | —                                                        |
| Youth programming | **Steward VBS**          | —                                                        |

"Register" was rejected for the point of sale because it collides with VBS
registration. The token file is still named `themes/products/register.json` and
that is a rename with real blast radius, not a naming decision — it stays until
someone does the migration properly.

In application chrome the dot-separator form still applies: `Steward · Congregation`.
