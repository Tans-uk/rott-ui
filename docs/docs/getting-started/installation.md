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

| Package                          | Purpose                         | Version  | Type                     |
| -------------------------------- | ------------------------------- | -------- | ------------------------ |
| `@shopify/flash-list`            | High-performance lists          | ≥1.8.0   | peer                     |
| `react-native-reanimated`        | Smooth animations               | 4.0.1    | peer                     |
| `react-native-safe-area-context` | Safe area handling              | ≥5.4.1   | peer                     |
| `react-native-svg`               | SVG icon support                | ≥15.12.0 | peer                     |
| `react-intl`                     | Internationalization            | ≥7.1.0   | peer                     |
| `date-fns`                       | Date formatting                 | ≥4.0.0   | peer                     |
| `react-native-svg-transformer`   | SVG → React component transform | ≥5.0.0   | devDependency            |
| `babel-plugin-module-resolver`   | rott.config.ts runtime alias    | ≥5.0.0   | devDependency (optional) |

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

## Configure SVG Icon Support

Rott UI's built-in icons and custom SVG icons are loaded as React components. React Native does not support SVG imports out of the box, so you need to install `react-native-svg-transformer` and update your Metro configuration.

### Install react-native-svg-transformer

```bash npm2yarn
npm install react-native-svg-transformer --save-dev
```

### Update Metro Configuration

Create or update your `metro.config.js` to use the SVG transformer:

```js title="metro.config.js"
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config')
const {withRottAssets} = require('@tansuk/rott-ui/metro')

const defaultConfig = getDefaultConfig(__dirname)
const {assetExts, sourceExts} = defaultConfig.resolver

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
}

module.exports = withRottAssets(mergeConfig(defaultConfig, config), {
  projectRoot: __dirname,
})
```

:::tip Asset Auto-Discovery
The `withRottAssets()` wrapper enables **Asset Auto-Discovery**: images in `src/assets/images/` and icons in `src/assets/icons/svg/` are automatically scanned and available by filename. See [rott.config.ts - Asset Auto-Discovery](/docs/theming/rott-config#asset-auto-discovery).
:::

:::info Why is SVG transformer needed?
By default, Metro treats `.svg` files as static assets (like images). Moving `svg` from `assetExts` to `sourceExts` allows the SVG transformer to convert `.svg` files into React components at bundle time. Without this setup, any component that renders an SVG icon (Icon, Header, Input, Button with icons, etc.) will throw a render error.
:::

## Configure Babel Plugins

Add the required Babel plugins to your `babel.config.js`:

```js title="babel.config.js"
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets/plugin',
    'react-native-reanimated/plugin', // Must be last!
  ],
}
```

:::warning Plugin Order
The `react-native-reanimated/plugin` must **always** be the **last item** in the plugins array. All other plugins (worklets, module-resolver, etc.) must come before it.
:::

### Optional: rott.config.ts Runtime Resolution {#babel-module-resolver}

If you are using [`rott.config.ts`](/docs/theming/rott-config) for type-safe theming, the `tsconfig.json` path mapping only works at compile time. For Metro/Babel to resolve the module at **runtime**, you also need `babel-plugin-module-resolver`:

```bash npm2yarn
npm install babel-plugin-module-resolver --save-dev
```

Then update your `babel.config.js`:

```js title="babel.config.js"
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets/plugin',
    [
      'module-resolver',
      {
        alias: {
          'rott.config': './rott.config.ts',
        },
        extensions: ['.ts', '.tsx', '.js', '.json'],
      },
    ],
    'react-native-reanimated/plugin', // Must be last!
  ],
}
```

:::tip
You can skip this step if you are not using `rott.config.ts`. See the [rott.config.ts](/docs/theming/rott-config) page for full setup instructions.
:::

## Verify Installation

Create a simple test file to verify everything is installed correctly:

```tsx title="App.tsx"
import React from 'react'

import {Button, RottProvider} from '@tansuk/rott-ui'

export default function App() {
  return (
    <RottProvider>
      <Button variant='primary' onPress={() => console.log('Works!')}>
        Test Button
      </Button>
    </RottProvider>
  )
}
```

## Next Steps

Now that Rott UI is installed, you're ready to:

1. **[Quick Start](/docs/getting-started/quick-start)** - Build your first screen
2. **[Components](/docs/components/overview)** - Explore all components

## Need Help?

- Check the [GitHub Issues](https://github.com/Tans-uk/rott-ui/issues)
- Join the [Discussions](https://github.com/Tans-uk/rott-ui/discussions)
