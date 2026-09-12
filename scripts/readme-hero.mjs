import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

// Steward README hero system — one frame, one type scale, one mark.
// Only the accent and the copy change. Every accent is a token from
// steward-brand (brand primitive, or the product's own theme accent).
const NAVY      = '#0D1B2E';   // --st-fg
const NAVY_DEEP = '#081320';
const GOLD      = '#E8B847';   // color.brand.gold
const PARCHMENT = '#FAF7F2';   // --st-bg
const MUTED     = '#8C9AAB';

const W = 1600, H = 420, PAD_X = 96;

// The Steward mark, re-origined from steward-brand/assets/logo/steward-mark.svg (64x82).
const mark = (x, y, h, fill, opacity = 1) => {
  const s = h / 82;
  const r = (rx, ry, rw, rh, rr) =>
    `<rect x="${(x + rx * s).toFixed(2)}" y="${(y + ry * s).toFixed(2)}" width="${(rw * s).toFixed(2)}" height="${(rh * s).toFixed(2)}" rx="${(rr * s).toFixed(2)}"/>`;
  return `<g fill="${fill}" fill-opacity="${opacity}">${[
    r(28, 2, 8, 32, 4), r(12, 14, 40, 8, 4), r(30, 32, 4, 40, 2),
    r(34, 53, 13, 5, 2.5), r(34, 64, 9, 5, 2.5),
  ].join('')}</g>`;
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const FONT = 'Inter, system-ui, -apple-system, Segoe UI, sans-serif';

function hero({ name, tagline, accent, meta, alt }) {
  const textX = PAD_X + 104;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(alt)}">
  <title>${esc(alt)}</title>
  <defs>
    <linearGradient id="ground" x1="0" y1="0" x2="${W}" y2="${H}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${NAVY_DEEP}"/><stop offset="0.55" stop-color="${NAVY}"/><stop offset="1" stop-color="${NAVY_DEEP}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.80" cy="0.92" r="0.58">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.20"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rule" x1="${PAD_X}" y1="0" x2="${W - PAD_X}" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.9"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="spine" x1="0" y1="112" x2="0" y2="292" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${GOLD}"/><stop offset="1" stop-color="${accent}"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#ground)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- the mark at scale, bleeding off the right edge: the only ornament -->
  ${mark(1236, -96, 612, accent, 0.07)}

  <!-- faint column grid, the only texture -->
  <g stroke="${PARCHMENT}" stroke-opacity="0.04" stroke-width="1">
    ${[...Array(11)].map((_, i) => `<line x1="${PAD_X + i * 128}" y1="0" x2="${PAD_X + i * 128}" y2="${H}"/>`).join('\n    ')}
  </g>

  <rect x="${PAD_X}" y="112" width="5" height="180" rx="2.5" fill="url(#spine)"/>
  ${mark(PAD_X + 32, 118, 82, GOLD)}

  <text x="${textX}" y="152" font-family="${FONT}" font-size="19" font-weight="600" letter-spacing="0.34em" fill="${GOLD}">STEWARD</text>
  <text x="${textX}" y="234" font-family="${FONT}" font-size="74" font-weight="600" letter-spacing="-0.022em" fill="${PARCHMENT}">${esc(name)}</text>
  <text x="${textX}" y="282" font-family="${FONT}" font-size="25" font-weight="400" fill="${MUTED}">${esc(tagline)}</text>

  <line x1="${PAD_X}" y1="340" x2="${W - PAD_X}" y2="340" stroke="url(#rule)" stroke-width="1.5"/>
  <text x="${PAD_X}" y="376" font-family="${FONT}" font-size="17" font-weight="500" letter-spacing="0.07em" fill="${MUTED}">${esc(meta.join('   ·   '))}</text>
  <circle cx="${W - PAD_X - 6}" cy="370" r="6" fill="${accent}"/>
</svg>
`;
}

const repos = [
  { out: 'C:/Users/ramos/GitHub/StewardChMS/docs/assets/hero.svg',
    name: 'Congregation', accent: '#2563EB', // color.brand.blue
    tagline: 'Church management your congregation owns — people, giving, worship, reporting.',
    meta: ['Self-hosted', 'MIT', 'PostgreSQL', 'Docker'],
    alt: 'Steward Congregation — self-hosted church management covering people, giving, worship planning and reporting.' },

  { out: 'C:/Users/ramos/GitHub/stewardpos/docs/brand/hero-banner.svg',
    name: 'StewardPOS', accent: '#16A34A', // color.brand.emerald
    tagline: 'Point of sale for churches, ministries and small shops. Totals computed server-side.',
    meta: ['Self-hosted', 'MIT', 'PostgreSQL', 'Docker'],
    alt: 'StewardPOS — self-hosted point of sale for churches, ministries and small shops, with every total recomputed on the server.' },

  { out: 'C:/Users/ramos/GitHub/steward-table/docs/assets/hero.svg',
    name: 'Table', accent: '#0E7490', // themes/table.json accent
    tagline: 'Order management for ministry-led food sales — storefront to kitchen to doorstep.',
    meta: ['Self-hosted', 'AGPL-3.0', 'PostgreSQL', 'Docker'],
    alt: 'Steward Table — order management for ministry-led food sales, from online storefront through kitchen display to delivery.' },

  { out: 'C:/Users/ramos/GitHub/vbs-app/Docs/banner.svg',
    name: 'VBS', accent: '#F97316', // themes/vbs.json accent
    tagline: 'Run Vacation Bible School without a spreadsheet — register, check in, report.',
    meta: ['Self-hosted', 'MIT', 'PostgreSQL', 'Docker'],
    alt: 'Steward VBS — self-hosted Vacation Bible School management covering registration, daily check-in and reporting.' },

  { out: 'C:/Users/ramos/GitHub/steward-brand/assets/readme-hero.svg',
    name: 'Brand', accent: '#E8B847', // color.brand.gold
    tagline: 'Tokens, components and icons every Steward application is built from.',
    meta: ['4 packages', 'MIT', 'Tailwind v4', 'React 18'],
    alt: 'Steward Brand — the design tokens, React components and ministry icons shared by every Steward application.' },

  { out: 'C:/Users/ramos/GitHub/steward-platform/docs/assets/img/hero.svg',
    name: 'Platform', accent: '#6B7A8D', // --st-muted: deliberately not a product accent
    tagline: 'The control plane — signup, billing, entitlements and provisioning.',
    meta: ['Private', 'Control plane', 'Stripe', 'Caddy'],
    alt: 'Steward Platform — the private control plane handling signup, billing, entitlement issuance and tenant provisioning.' },
];

for (const r of repos) {
  mkdirSync(dirname(r.out), { recursive: true });
  writeFileSync(r.out, hero(r), 'utf8');
  console.log('wrote', r.out);
}
