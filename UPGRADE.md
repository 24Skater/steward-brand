# Self-Hosted Upgrade Guide

This guide is for church IT administrators and volunteers who manage a self-hosted installation of Steward software. You do not need to be a developer to follow these steps.

---

## Before You Upgrade

**Read this first — every time.**

1. **Back up your database.** This is the most important step. Run your backup script or take a snapshot before doing anything else.
2. **Note your current version.** You can find it in the app's About page or by running `docker compose ps` and checking the image tag.
3. **Read the release notes for your target version.** They are listed at the bottom of this guide and at [github.com/24Skater](https://github.com/24Skater).
4. **Plan for a maintenance window.** Upgrades typically take 5–15 minutes. Let your team know before you start.

---

## Version Compatibility

| App | Minimum version | Requires |
|-----|----------------|---------|
| Steward · Congregation | 1.0.0 | Node 20+, PostgreSQL 15+ |
| Steward · Register | 1.0.0 | Node 20+, PostgreSQL 15+ |
| Steward · Table | 1.0.0 | Node 20+, PostgreSQL 15+ |
| Steward · VBS | 1.0.0 | Node 20+, PostgreSQL 15+ |

All Steward apps run on the same infrastructure requirements. You do not need separate database servers for each app.

---

## Upgrade Steps (Docker Compose)

This is the recommended way to run Steward apps. If you use a different setup, see the Bare Metal section below.

### Step 1 — Back up your database

```bash
docker exec steward-db pg_dump -U postgres steward > backup-$(date +%Y%m%d).sql
```

Keep this file somewhere safe. If anything goes wrong, this is your recovery path.

### Step 2 — Pull the new image

```bash
docker compose pull
```

This downloads the new version without stopping the running app. It may take a minute or two depending on your internet connection.

### Step 3 — Stop the app

```bash
docker compose down
```

Your database is separate and will stay running. Only the app container stops.

### Step 4 — Start the new version

```bash
docker compose up -d
```

### Step 5 — Run database migrations (if required)

Most upgrades apply migrations automatically on startup. If the release notes say migrations must be run manually, do this after starting:

```bash
docker compose exec app pnpm prisma migrate deploy
```

Wait for it to finish before telling your team the system is back up.

### Step 6 — Verify

1. Open the app in your browser.
2. Log in and confirm the version number in About or Settings.
3. Check that your data is intact (a few records from different areas).
4. Notify your team that the upgrade is complete.

---

## Rollback

If something went wrong and you need to go back:

### Step 1 — Stop the new version

```bash
docker compose down
```

### Step 2 — Restore your database backup

```bash
cat backup-YYYYMMDD.sql | docker exec -i steward-db psql -U postgres steward
```

Replace `YYYYMMDD` with your backup date.

### Step 3 — Pin the old image version

Edit `docker-compose.yml` and change the `image:` tag back to the previous version number. Example:

```yaml
services:
  app:
    image: ghcr.io/24Skater/steward-table:1.2.0  # ← pin the old version here
```

### Step 4 — Start the old version

```bash
docker compose up -d
```

Then open a GitHub issue to report the problem. We want to know what went wrong.

---

## Bare Metal (Node.js)

If you're running the app directly with Node.js (not Docker):

```bash
# 1. Back up your database first (see above)

# 2. Pull the latest code
git pull

# 3. Install dependencies
pnpm install --frozen-lockfile

# 4. Build
pnpm build

# 5. Run migrations
pnpm prisma migrate deploy

# 6. Restart the app (using PM2, systemd, or your process manager)
pm2 restart steward
# or: systemctl restart steward
```

---

## Operator-Level Release Notes

### v1.0.0 — Steward Brand Unification

**Date:** June 2026

**What changed:**
- All Steward apps now share a unified design system (Kingdom Gold primary color, consistent typography)
- Product display names updated across all apps:
  - StewardChMS → Steward · Congregation
  - StewardPOS → Steward · Register
  - Steward Table → Steward · Table
  - VBS App → Steward · VBS
- Email templates updated to reflect new names

**Database changes:** None. This is a visual-only update.

**Action required:** None beyond the standard upgrade steps.

---

## Getting Help

If you run into a problem during an upgrade:

1. **Check the release notes** for your target version — known issues are listed there.
2. **Open a GitHub issue** at [github.com/24Skater/steward-brand/issues](https://github.com/24Skater/steward-brand/issues). Include your current version, target version, and the error message you see.
3. **Do not delete your database backup** until you have confirmed the upgrade succeeded.

We aim to respond to upgrade issues within 48 hours.

---

## Frequently Asked Questions

**Do I need to upgrade all apps at the same time?**
No. Each Steward app is independent and can be upgraded separately. The design system version does not need to match across apps.

**Will my church's data survive the upgrade?**
Yes, as long as you complete the database backup before starting. Upgrades never delete data — they only add or modify database columns.

**What if I'm several versions behind?**
Upgrade one major version at a time. For example: 1.0 → 1.x → 2.0. Do not skip major versions. Check the release notes for each version you pass through.

**I use a managed hosting provider for Steward. Do I need to do anything?**
No. Managed hosting providers handle upgrades for you. Contact your provider if you have questions about their upgrade schedule.

**How do I know which version I'm running?**
- In-app: check the About or Settings page
- Command line: `docker compose ps` shows the image tag
- Code: the version is in `package.json` at the root of the repository
