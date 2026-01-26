---
sidebar_position: 1
title: Installation
description: Install Rott UI and its peer dependencies
---

# Installation

This guide will help you install Rott UI and all required dependencies in your React Native project.

## Prerequisites

Before installing Rott UI, make sure you have:

- **Node.js** 18.0 or higher
- **React Native** 0.70 or higher
- **React** 18.0 or higher
- A React Native project (using Expo or React Native CLI)

## Install Rott UI

Install the Rott UI package using your preferred package manager:

```bash npm2yarn
npm install @tansuk/rott-ui
```

## Install Peer Dependencies

Rott UI requires several peer dependencies for full functionality. Install them all at once:

```bash npm2yarn
npm install react react-native react-intl date-fns \
  @shopify/flash-list react-native-reanimated \
  react-native-safe-area-context react-native-svg \
  react-native-linear-gradient react-native-mask-input \
  react-native-device-info react-native-tab-view \
  react-native-toast-notifications react-native-keyboard-controller \
  react-native-edge-to-edge react-native-worklets \
  react-native-select-contact @react-native-community/netinfo
```

### Key Dependencies

| Package | Purpose | Version |
|---------|---------|---------|
| `@shopify/flash-list` | High-performance lists | ≥1.8.0 |
| `react-native-reanimated` | Smooth animations | 4.0.1 |
| `react-native-safe-area-context` | Safe area handling | ≥5.4.1 |
| `react-native-svg` | SVG icon support | ≥15.12.0 |
| `react-intl` | Internationalization | ≥7.1.0 |
| `date-fns` | Date formatting | ≥4.0.0 |

## Platform-Specific Setup

### iOS

After installing dependencies, install iOS pods:

```bash
cd ios && pod install && cd ..
```

### Android

Make sure your `android/build.gradle` has the following minimum SDK version:

```gradle
buildscript {
    ext {
        minSdkVersion = 21
        compileSdkVersion = 34
        targetSdkVersion = 34
    }
}
```

## Configure React Native Reanimated

Add the Reanimated plugin to your `babel.config.js`:

```js title="babel.config.js"
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // Must be last!
  ],
};
```

:::warning
The Reanimated plugin must be the **last item** in the plugins array.
:::

## Verify Installation

Create a simple test file to verify everything is installed correctly:

```tsx title="App.tsx"
import React from 'react';
import { RottProvider, Button } from '@tansuk/rott-ui';

export default function App() {
  return (
    <RottProvider>
      <Button variant="primary" onPress={() => console.log('Works!')}>
        Test Button
      </Button>
    </RottProvider>
  );
}
```

## Next Steps

Now that Rott UI is installed, you're ready to:

1. **[Quick Start](/docs/getting-started/quick-start)** - Build your first screen
2. **[Components](/docs/components/overview)** - Explore all components

## Need Help?

- Check the [GitHub Issues](https://github.com/Tans-uk/rott-ui/issues)
- Join the [Discussions](https://github.com/Tans-uk/rott-ui/discussions)
