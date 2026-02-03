# App Icons

This directory contains application icons for various platforms.

## Structure

```
app-icons/
├── ios/
│   ├── icon-60@2x.png (120x120)
│   ├── icon-60@3x.png (180x180)
│   ├── icon-76.png (76x76)
│   ├── icon-76@2x.png (152x152)
│   └── icon-83.5@2x.png (167x167)
├── android/
│   ├── mipmap-mdpi/ (48x48)
│   ├── mipmap-hdpi/ (72x72)
│   ├── mipmap-xhdpi/ (96x96)
│   ├── mipmap-xxhdpi/ (144x144)
│   └── mipmap-xxxhdpi/ (192x192)
└── web/
    ├── icon-192.png
    └── icon-512.png
```

## Generation

Generate app icons from the source mark using:
- [Expo Asset Generator](https://github.com/expo/expo/tree/main/packages/%40expo/image-utils) for React Native
- Android Studio's Image Asset Studio
- Xcode's Asset Catalog

