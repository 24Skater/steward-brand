# Favicon Assets

This directory contains favicon files for Steward applications.

## SVG Favicons (Recommended)

Modern browsers support SVG favicons directly. Use these for best quality at any size:

| File | Use |
|------|-----|
| `favicon.svg` | Primary favicon (scalable) |
| `favicon-16.svg` | 16x16 variant |
| `favicon-32.svg` | 32x32 variant |
| `apple-touch-icon.svg` | iOS home screen icon |

## Usage in HTML

```html
<!-- SVG favicon (modern browsers) -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">

<!-- Fallback for older browsers -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

<!-- Web App Manifest -->
<link rel="manifest" href="/site.webmanifest">
```

## Generating PNG Versions

To generate PNG favicons from the SVG sources, use one of these methods:

### Option 1: Online Tool (Recommended)
1. Go to [RealFaviconGenerator.net](https://realfavicongenerator.net/)
2. Upload `favicon.svg`
3. Configure settings for each platform
4. Download the generated package

### Option 2: Command Line (Sharp)
```bash
# Install sharp-cli
npm install -g sharp-cli

# Generate PNGs
sharp -i favicon.svg -o favicon-16x16.png resize 16 16
sharp -i favicon.svg -o favicon-32x32.png resize 32 32
sharp -i apple-touch-icon.svg -o apple-touch-icon.png resize 180 180
```

### Option 3: ImageMagick
```bash
# Generate PNGs
convert -background none favicon.svg -resize 16x16 favicon-16x16.png
convert -background none favicon.svg -resize 32x32 favicon-32x32.png
convert -background none favicon.svg -resize 48x48 favicon-48x48.png

# Generate ICO (multi-resolution)
convert favicon-16x16.png favicon-32x32.png favicon-48x48.png favicon.ico
```

## Web App Manifest

Create a `site.webmanifest` file:

```json
{
  "name": "Steward",
  "short_name": "Steward",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#1B2A41",
  "background_color": "#FFFFFF",
  "display": "standalone"
}
```

## Color Reference

| Element | Color |
|---------|-------|
| Background | `#1B2A41` (Navy) |
| Accent | `#2563EB` (Blue) |
| Icon on dark | `#FFFFFF` (White) |
