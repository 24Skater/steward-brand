# Favicon Assets

This directory contains favicon files for Steward applications.

## Files

- `favicon.ico` - Multi-resolution ICO file (16x16, 32x32, 48x48)
- `favicon-16x16.png` - 16x16 PNG favicon
- `favicon-32x32.png` - 32x32 PNG favicon
- `apple-touch-icon.png` - 180x180 Apple touch icon
- `safari-pinned-tab.svg` - Safari pinned tab icon

## Usage

Copy these files to your application's public directory.

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```

## Generation

To regenerate favicons from the source mark, use a tool like [RealFaviconGenerator](https://realfavicongenerator.net/) with the `steward-mark.svg` file.

