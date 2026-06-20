/**
 * Steward Token Build Script
 * Transforms DTCG tokens into CSS, TypeScript, and JSON outputs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const srcDir = join(rootDir, "src");
const distDir = join(rootDir, "dist");

if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

const tokens = JSON.parse(
  readFileSync(join(srcDir, "tokens.dtcg.json"), "utf-8")
);
const lightTheme = JSON.parse(
  readFileSync(join(srcDir, "themes/light.json"), "utf-8")
);
const darkTheme = JSON.parse(
  readFileSync(join(srcDir, "themes/dark.json"), "utf-8")
);

function getTokenValue(token: unknown): string | number | string[] | object {
  if (typeof token === "object" && token !== null && "$value" in token) {
    return (token as { $value: string | number | string[] | object }).$value;
  }
  return token as string | number | string[] | object;
}

function resolveReference(ref: string, src: object): string {
  const match = ref.match(/^\{(.+)\}$/);
  if (!match) return ref;

  const path = (match[1] ?? "").split(".");
  let current: unknown = src;

  for (let i = 0; i < path.length; i++) {
    const key = path[i] ?? "";
    if (typeof current === "object" && current !== null && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      throw new Error(
        `Token reference "${ref}" not found: "${path.slice(0, i + 1).join(".")}" does not exist`
      );
    }
  }

  const value = getTokenValue(current);
  if (typeof value === "string" && value.startsWith("{")) {
    return resolveReference(value, src);
  }

  return String(value);
}

function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function generateCSS(): string {
  const lines: string[] = [
    "/**",
    " * Steward Design Tokens",
    " * Auto-generated - do not edit directly",
    " */",
    "",
    ':root, [data-theme="light"] {',
  ];

  lines.push("  /* Brand Colors */");
  for (const [key, token] of Object.entries(tokens.color.brand)) {
    const value = getTokenValue(token);
    lines.push(`  --st-color-brand-${key}: ${value};`);
  }

  lines.push("");
  lines.push("  /* Neutral Colors */");
  for (const [key, token] of Object.entries(tokens.color.neutral)) {
    const value = getTokenValue(token);
    lines.push(`  --st-color-neutral-${key}: ${value};`);
  }

  lines.push("");
  lines.push("  /* Semantic Tokens */");
  for (const [key, ref] of Object.entries(lightTheme.semantic)) {
    const value = resolveReference(ref as string, tokens);
    lines.push(`  --st-${key}: ${value};`);
    lines.push(`  --${toKebabCase(key)}: ${value};`);
  }

  lines.push("");
  lines.push("  /* Typography */");
  const fontSans = getTokenValue(tokens.typography.fontFamily.sans) as string[];
  const fontMono = getTokenValue(tokens.typography.fontFamily.mono) as string[];
  const fontDisplay = getTokenValue(tokens.typography.fontFamily.display) as string[];
  lines.push(`  --st-font-sans: ${fontSans.join(", ")};`);
  lines.push(`  --st-font-mono: ${fontMono.join(", ")};`);
  lines.push(`  --st-font-display: ${fontDisplay.join(", ")};`);

  for (const [key, token] of Object.entries(tokens.typography.fontSize)) {
    if (key.startsWith("$")) continue;
    const value = getTokenValue(token);
    lines.push(`  --st-font-size-${key}: ${value};`);
  }

  for (const [key, token] of Object.entries(tokens.typography.lineHeight)) {
    if (key.startsWith("$")) continue;
    const value = getTokenValue(token);
    lines.push(`  --st-line-height-${key}: ${value};`);
  }

  for (const [key, token] of Object.entries(tokens.typography.fontWeight)) {
    if (key.startsWith("$")) continue;
    const value = getTokenValue(token);
    lines.push(`  --st-font-weight-${key}: ${value};`);
  }

  lines.push("");
  lines.push("  /* Spacing */");
  for (const [key, token] of Object.entries(tokens.spacing)) {
    if (key.startsWith("$")) continue;
    const value = getTokenValue(token);
    lines.push(`  --st-spacing-${key}: ${value};`);
  }

  lines.push("");
  lines.push("  /* Border Radius */");
  for (const [key, token] of Object.entries(tokens.radius)) {
    if (key.startsWith("$")) continue;
    const value = getTokenValue(token);
    lines.push(`  --st-radius-${key}: ${value};`);
    lines.push(`  --radius-${key}: ${value};`);
  }

  lines.push("");
  lines.push("  /* Shadows */");
  for (const [key, token] of Object.entries(tokens.shadow)) {
    if (key.startsWith("$")) continue;
    const shadow = getTokenValue(token) as {
      color: string;
      offsetX: string;
      offsetY: string;
      blur: string;
      spread: string;
    };
    const shadowValue = `${shadow.offsetX} ${shadow.offsetY} ${shadow.blur} ${shadow.spread} ${shadow.color}`;
    lines.push(`  --st-shadow-${key}: ${shadowValue};`);
  }

  lines.push("}");
  lines.push("");

  lines.push('.dark, [data-theme="dark"] {');

  lines.push("  /* Neutral Colors (Dark) */");
  for (const [key, token] of Object.entries(tokens.color["neutral-dark"])) {
    const value = getTokenValue(token);
    lines.push(`  --st-color-neutral-${key}: ${value};`);
  }

  lines.push("");
  lines.push("  /* Semantic Tokens (Dark) */");
  for (const [key, ref] of Object.entries(darkTheme.semantic)) {
    const value = resolveReference(ref as string, tokens);
    lines.push(`  --st-${key}: ${value};`);
    lines.push(`  --${toKebabCase(key)}: ${value};`);
  }

  lines.push("}");
  lines.push("");

  return lines.join("\n");
}

function generateTypeScript(): string {
  const lines: string[] = [
    "/**",
    " * Steward Design Tokens",
    " * Auto-generated - do not edit directly",
    " */",
    "",
    "export const tokens = {",
    "  color: {",
    "    brand: {",
  ];

  for (const [key, token] of Object.entries(tokens.color.brand)) {
    const value = getTokenValue(token);
    lines.push(`      ${key}: "${value}",`);
  }
  lines.push("    },");
  lines.push("    neutral: {");
  for (const [key, token] of Object.entries(tokens.color.neutral)) {
    const value = getTokenValue(token);
    lines.push(`      ${key}: "${value}",`);
  }
  lines.push("    },");
  lines.push("    neutralDark: {");
  for (const [key, token] of Object.entries(tokens.color["neutral-dark"])) {
    const value = getTokenValue(token);
    lines.push(`      ${key}: "${value}",`);
  }
  lines.push("    },");
  lines.push("  },");

  lines.push("  typography: {");
  lines.push("    fontFamily: {");
  const fontSans = getTokenValue(tokens.typography.fontFamily.sans) as string[];
  const fontMono = getTokenValue(tokens.typography.fontFamily.mono) as string[];
  const fontDisplay = getTokenValue(tokens.typography.fontFamily.display) as string[];
  lines.push(`      sans: "${fontSans.join(", ")}",`);
  lines.push(`      mono: "${fontMono.join(", ")}",`);
  lines.push(`      display: "${fontDisplay.join(", ")}",`);
  lines.push("    },");
  lines.push("    fontSize: {");
  for (const [key, token] of Object.entries(tokens.typography.fontSize)) {
    if (key.startsWith("$")) continue;
    const value = getTokenValue(token);
    lines.push(`      ${key}: "${value}",`);
  }
  lines.push("    },");
  lines.push("    lineHeight: {");
  for (const [key, token] of Object.entries(tokens.typography.lineHeight)) {
    if (key.startsWith("$")) continue;
    const value = getTokenValue(token);
    lines.push(`      ${key}: "${value}",`);
  }
  lines.push("    },");
  lines.push("    fontWeight: {");
  for (const [key, token] of Object.entries(tokens.typography.fontWeight)) {
    if (key.startsWith("$")) continue;
    const value = getTokenValue(token);
    lines.push(`      ${key}: ${value},`);
  }
  lines.push("    },");
  lines.push("  },");

  lines.push("  spacing: {");
  for (const [key, token] of Object.entries(tokens.spacing)) {
    if (key.startsWith("$")) continue;
    const value = getTokenValue(token);
    lines.push(`    "${key}": "${value}",`);
  }
  lines.push("  },");

  lines.push("  radius: {");
  for (const [key, token] of Object.entries(tokens.radius)) {
    if (key.startsWith("$")) continue;
    const value = getTokenValue(token);
    lines.push(`    ${key}: "${value}",`);
  }
  lines.push("  },");

  lines.push("} as const;");
  lines.push("");
  lines.push("export type Tokens = typeof tokens;");
  lines.push("");

  lines.push("export const semanticTokens = {");
  lines.push("  light: {");
  for (const [key, ref] of Object.entries(lightTheme.semantic)) {
    const value = resolveReference(ref as string, tokens);
    lines.push(`    ${key}: "${value}",`);
  }
  lines.push("  },");
  lines.push("  dark: {");
  for (const [key, ref] of Object.entries(darkTheme.semantic)) {
    const value = resolveReference(ref as string, tokens);
    lines.push(`    ${key}: "${value}",`);
  }
  lines.push("  },");
  lines.push("} as const;");
  lines.push("");
  lines.push("export type SemanticTokens = typeof semanticTokens;");
  lines.push("");

  return lines.join("\n");
}

function generateJSON(): string {
  const output = {
    color: {
      brand: {} as Record<string, string>,
      neutral: {} as Record<string, string>,
      neutralDark: {} as Record<string, string>,
    },
    typography: {
      fontFamily: {
        sans: getTokenValue(tokens.typography.fontFamily.sans),
        mono: getTokenValue(tokens.typography.fontFamily.mono),
        display: getTokenValue(tokens.typography.fontFamily.display),
      },
      fontSize: {} as Record<string, string>,
      lineHeight: {} as Record<string, string>,
      fontWeight: {} as Record<string, number>,
    },
    spacing: {} as Record<string, string>,
    radius: {} as Record<string, string>,
    semantic: {
      light: {} as Record<string, string>,
      dark: {} as Record<string, string>,
    },
  };

  for (const [key, token] of Object.entries(tokens.color.brand)) {
    output.color.brand[key] = getTokenValue(token) as string;
  }
  for (const [key, token] of Object.entries(tokens.color.neutral)) {
    output.color.neutral[key] = getTokenValue(token) as string;
  }
  for (const [key, token] of Object.entries(tokens.color["neutral-dark"])) {
    output.color.neutralDark[key] = getTokenValue(token) as string;
  }

  for (const [key, token] of Object.entries(tokens.typography.fontSize)) {
    if (!key.startsWith("$")) {
      output.typography.fontSize[key] = getTokenValue(token) as string;
    }
  }
  for (const [key, token] of Object.entries(tokens.typography.lineHeight)) {
    if (!key.startsWith("$")) {
      output.typography.lineHeight[key] = getTokenValue(token) as string;
    }
  }
  for (const [key, token] of Object.entries(tokens.typography.fontWeight)) {
    if (!key.startsWith("$")) {
      output.typography.fontWeight[key] = getTokenValue(token) as number;
    }
  }

  for (const [key, token] of Object.entries(tokens.spacing)) {
    if (!key.startsWith("$")) {
      output.spacing[key] = getTokenValue(token) as string;
    }
  }

  for (const [key, token] of Object.entries(tokens.radius)) {
    if (!key.startsWith("$")) {
      output.radius[key] = getTokenValue(token) as string;
    }
  }

  for (const [key, ref] of Object.entries(lightTheme.semantic)) {
    output.semantic.light[key] = resolveReference(ref as string, tokens);
  }
  for (const [key, ref] of Object.entries(darkTheme.semantic)) {
    output.semantic.dark[key] = resolveReference(ref as string, tokens);
  }

  return JSON.stringify(output, null, 2);
}

function generateDTS(): string {
  const lines: string[] = [
    "/**",
    " * Steward Design Tokens",
    " * Auto-generated - do not edit directly",
    " */",
    "",
    "export declare const tokens: {",
    "  readonly color: {",
    "    readonly brand: {",
  ];

  for (const [key, token] of Object.entries(tokens.color.brand)) {
    const value = getTokenValue(token);
    lines.push(`      readonly ${key}: "${value}";`);
  }
  lines.push("    };");
  lines.push("    readonly neutral: {");
  for (const [key, token] of Object.entries(tokens.color.neutral)) {
    const value = getTokenValue(token);
    lines.push(`      readonly ${key}: "${value}";`);
  }
  lines.push("    };");
  lines.push("    readonly neutralDark: {");
  for (const [key, token] of Object.entries(tokens.color["neutral-dark"])) {
    const value = getTokenValue(token);
    lines.push(`      readonly ${key}: "${value}";`);
  }
  lines.push("    };");
  lines.push("  };");

  lines.push("  readonly typography: {");
  lines.push("    readonly fontFamily: {");
  lines.push("      readonly sans: string;");
  lines.push("      readonly mono: string;");
  lines.push("      readonly display: string;");
  lines.push("    };");

  lines.push("    readonly fontSize: {");
  for (const [key, token] of Object.entries(tokens.typography.fontSize)) {
    if (key.startsWith("$")) continue;
    const value = getTokenValue(token);
    lines.push(`      readonly ${key}: "${value}";`);
  }
  lines.push("    };");

  lines.push("    readonly lineHeight: {");
  for (const [key, token] of Object.entries(tokens.typography.lineHeight)) {
    if (key.startsWith("$")) continue;
    const value = getTokenValue(token);
    lines.push(`      readonly ${key}: "${value}";`);
  }
  lines.push("    };");

  lines.push("    readonly fontWeight: {");
  for (const [key, token] of Object.entries(tokens.typography.fontWeight)) {
    if (key.startsWith("$")) continue;
    const value = getTokenValue(token);
    lines.push(`      readonly ${key}: ${value};`);
  }
  lines.push("    };");
  lines.push("  };");

  lines.push("  readonly spacing: {");
  for (const [key, token] of Object.entries(tokens.spacing)) {
    if (key.startsWith("$")) continue;
    const value = getTokenValue(token);
    lines.push(`    readonly "${key}": "${value}";`);
  }
  lines.push("  };");

  lines.push("  readonly radius: {");
  for (const [key, token] of Object.entries(tokens.radius)) {
    if (key.startsWith("$")) continue;
    const value = getTokenValue(token);
    lines.push(`    readonly ${key}: "${value}";`);
  }
  lines.push("  };");

  lines.push("};");
  lines.push("");
  lines.push("export type Tokens = typeof tokens;");
  lines.push("");

  lines.push("export declare const semanticTokens: {");
  lines.push("  readonly light: {");
  for (const [key] of Object.entries(lightTheme.semantic)) {
    lines.push(`    readonly ${key}: string;`);
  }
  lines.push("  };");
  lines.push("  readonly dark: {");
  for (const [key] of Object.entries(darkTheme.semantic)) {
    lines.push(`    readonly ${key}: string;`);
  }
  lines.push("  };");
  lines.push("};");
  lines.push("");
  lines.push("export type SemanticTokens = typeof semanticTokens;");
  lines.push("");

  return lines.join("\n");
}

function generateProductThemes(): void {
  const productsDir = join(srcDir, "themes/products");
  const themeOutDir = join(distDir, "themes");

  if (!existsSync(productsDir)) return;

  if (!existsSync(themeOutDir)) {
    mkdirSync(themeOutDir, { recursive: true });
  }

  const productFiles = readdirSync(productsDir).filter((f) => f.endsWith(".json"));

  for (const file of productFiles) {
    const productName = file.replace(".json", "");
    const productTheme = JSON.parse(
      readFileSync(join(productsDir, file), "utf-8")
    );

    const lines = [
      `/* Steward ${productName} Product Theme */`,
      `/* Auto-generated - do not edit directly */`,
      ``,
      `[data-product="${productName}"], .steward-${productName} {`,
    ];

    for (const [key, value] of Object.entries(productTheme.semantic ?? {})) {
      const resolved = (value as string).startsWith("{")
        ? resolveReference(value as string, tokens)
        : (value as string);
      lines.push(`  --st-${key}: ${resolved};`);
      lines.push(`  --${toKebabCase(key)}: ${resolved};`);
    }

    lines.push(`}`);
    lines.push(``);

    writeFileSync(join(themeOutDir, `${productName}.css`), lines.join("\n"));
    console.log(`  ✓ Generated themes/${productName}.css`);
  }
}

console.log("🎨 Building Steward design tokens...");

const css = generateCSS();
writeFileSync(join(distDir, "tokens.css"), css);
console.log("  ✓ Generated tokens.css");

const ts = generateTypeScript();
writeFileSync(join(distDir, "tokens.js"), ts);
console.log("  ✓ Generated tokens.js");

const dts = generateDTS();
writeFileSync(join(distDir, "tokens.d.ts"), dts);
console.log("  ✓ Generated tokens.d.ts");

const json = generateJSON();
writeFileSync(join(distDir, "tokens.json"), json);
console.log("  ✓ Generated tokens.json");

generateProductThemes();

console.log("✅ Token build complete!");
