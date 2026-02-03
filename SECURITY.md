# Security Policy

## Supported Versions

We actively support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability within the Steward design system, please report it responsibly.

### How to Report

**Do NOT open a public GitHub issue for security vulnerabilities.**

Instead, please send an email to: **security@steward.church** (or create a private security advisory on GitHub)

### What to Include

Please include the following information in your report:

1. **Description** - A clear description of the vulnerability
2. **Impact** - What could an attacker accomplish with this vulnerability?
3. **Steps to Reproduce** - Detailed steps to reproduce the issue
4. **Affected Versions** - Which versions are affected?
5. **Suggested Fix** - If you have one (optional)

### What to Expect

- **Acknowledgment** - We will acknowledge receipt within 48 hours
- **Assessment** - We will assess the vulnerability within 7 days
- **Resolution** - Critical vulnerabilities will be patched within 30 days
- **Disclosure** - We will coordinate public disclosure with you

### Safe Harbor

We consider security research conducted in accordance with this policy to be:

- Authorized and lawful
- Helpful to the security of our users
- Eligible for recognition (with your permission)

We will not pursue legal action against researchers who:

- Follow this disclosure policy
- Make a good faith effort to avoid privacy violations
- Do not exploit vulnerabilities beyond what is necessary to demonstrate them

## Security Best Practices

### For Package Publishers

All maintainers with npm publish access must:

1. Enable **two-factor authentication (2FA)** on npm
2. Use **npm provenance** for published packages
3. Never commit secrets or tokens to the repository
4. Review dependency updates before merging

### For Package Consumers

When using `@steward/*` packages:

1. Keep packages updated to the latest versions
2. Run `npm audit` or `pnpm audit` regularly
3. Review the [CHANGELOG](CHANGELOG.md) before updating major versions
4. Pin exact versions in production environments

## Dependency Security

We use the following tools to maintain security:

- **Dependabot** - Automated dependency updates
- **npm audit** - Run in CI for every pull request
- **GitHub Security Advisories** - Monitor for CVEs

## Contact

For non-vulnerability security questions, please open a GitHub Discussion or contact us at security@steward.church.

