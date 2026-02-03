/**
 * Steward Tailwind Preset
 * Provides consistent design tokens and utilities across all Steward apps
 */

/** @type {import('tailwindcss').Config} */
const stewardPreset = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Brand colors
        brand: {
          navy: "var(--st-color-brand-navy)",
          blue: "var(--st-color-brand-blue)",
          emerald: "var(--st-color-brand-emerald)",
          amber: "var(--st-color-brand-amber)",
          red: "var(--st-color-brand-red)",
        },
        // Semantic colors (CSS variables)
        background: "var(--st-bg)",
        foreground: "var(--st-fg)",
        surface: {
          DEFAULT: "var(--st-surface)",
          muted: "var(--st-surfaceMuted)",
        },
        border: "var(--st-border)",
        primary: {
          DEFAULT: "var(--st-primary)",
          foreground: "var(--st-primaryFg)",
        },
        secondary: {
          DEFAULT: "var(--st-secondary)",
          foreground: "var(--st-secondaryFg)",
        },
        accent: {
          DEFAULT: "var(--st-accent)",
          foreground: "var(--st-accentFg)",
        },
        success: {
          DEFAULT: "var(--st-success)",
          foreground: "var(--st-successFg)",
        },
        warning: {
          DEFAULT: "var(--st-warning)",
          foreground: "var(--st-warningFg)",
        },
        danger: {
          DEFAULT: "var(--st-danger)",
          foreground: "var(--st-dangerFg)",
        },
        muted: {
          DEFAULT: "var(--st-muted)",
          foreground: "var(--st-mutedFg)",
        },
        link: "var(--st-link)",
        ring: "var(--st-focusRing)",
      },
      fontFamily: {
        sans: ["var(--st-font-sans)"],
        mono: ["var(--st-font-mono)"],
      },
      fontSize: {
        display: ["var(--st-font-size-display)", { lineHeight: "var(--st-line-height-display)" }],
        h1: ["var(--st-font-size-h1)", { lineHeight: "var(--st-line-height-h1)" }],
        h2: ["var(--st-font-size-h2)", { lineHeight: "var(--st-line-height-h2)" }],
        h3: ["var(--st-font-size-h3)", { lineHeight: "var(--st-line-height-h3)" }],
        body: ["var(--st-font-size-body)", { lineHeight: "var(--st-line-height-body)" }],
        small: ["var(--st-font-size-small)", { lineHeight: "var(--st-line-height-small)" }],
        caption: ["var(--st-font-size-caption)", { lineHeight: "var(--st-line-height-caption)" }],
      },
      borderRadius: {
        none: "var(--st-radius-none)",
        sm: "var(--st-radius-sm)",
        DEFAULT: "var(--st-radius-md)",
        md: "var(--st-radius-md)",
        lg: "var(--st-radius-lg)",
        full: "var(--st-radius-full)",
      },
      boxShadow: {
        sm: "var(--st-shadow-sm)",
        DEFAULT: "var(--st-shadow-md)",
        md: "var(--st-shadow-md)",
        lg: "var(--st-shadow-lg)",
      },
      ringColor: {
        DEFAULT: "var(--st-focusRing)",
      },
      ringOffsetColor: {
        DEFAULT: "var(--st-surface)",
      },
    },
  },
  plugins: [],
};

export default stewardPreset;
module.exports = stewardPreset;

