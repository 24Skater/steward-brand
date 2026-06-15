# Governance

## Package Owner

**steward-brand** is maintained by the Steward application team under the `24Skater` GitHub organization.

Current maintainer: **Emerson Ramos** (`@24Skater`)
Succession plan: If the current maintainer is unavailable for more than 60 days, ownership transfers to the Steward application team lead. Contact is documented privately with the core team.

## Breaking Change Policy

**90-day minimum notice** before any of the following:

- Renaming a CSS custom property (`--st-*`)
- Changing the resolved value of a semantic token in a way that shifts visual output
- Removing a component from `@steward/ui`
- Changing a component's required props
- Removing an icon from `@steward/icons`

Breaking changes must be:
1. Announced in a GitHub issue tagged `breaking-change`
2. Listed in `CHANGELOG.md` under the affected version
3. Accompanied by a migration guide before the change ships

## Deprecation Process

1. **Deprecation notice**: A `@deprecated` JSDoc comment is added; a console warning is emitted (components only); a GitHub issue is filed
2. **Parallel-support window**: Minimum 3 releases where both the old and new pattern work
3. **Removal**: Happens only after the notice window has passed and is clearly documented in the CHANGELOG

## Release Cadence

- Patch releases: as needed for bug fixes and non-breaking additions
- Minor releases: monthly, or when a meaningful feature set is complete
- Major releases: tied to significant architectural changes; require team consensus

## CHANGELOG Ownership

The releasing maintainer is responsible for writing the CHANGELOG entry before merging the version PR. Entries must:
- State what changed, not just how
- Include migration instructions for any deprecation or removal
- Credit contributors

## Contribution Path

- **Design tokens**: Maintainer-controlled. Changes to `tokens.dtcg.json` require maintainer approval.
- **UI components**: Welcome via PR. Must include Storybook story + accessibility note.
- **Icons**: Submit as a PR with source SVG. All icons are reviewed for visual consistency and security before merge.
- **Bug fixes**: Always welcome. Follow the PR template.

## Community Standard

This design system is maintained on behalf of churches and faith communities that use Steward software. Decisions prioritize stability, accessibility, and trust over novelty. Changes that could break a volunteer's Sunday morning workflow require extra scrutiny.
