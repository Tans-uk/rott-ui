---
sidebar_position: 3
title: Configuration
description: Configure RottProvider and customize your app
---

# Configuration

Learn how to configure Rott UI using the `RottProvider` component.

## RottProvider

The `RottProvider` component wraps your entire app and provides theme configuration, device detection, and internationalization support.

## Basic Setup

```tsx title="App.tsx"
import React from 'react';
import { RottProvider } from '@tansuk/rott-ui';
import YourApp from './YourApp';

export default function App() {
  return (
    <RottProvider>
      <YourApp />
    </RottProvider>
  );
}
```

## Configuration Options

### Language

Set the default language for your app:

```tsx
<RottProvider
  config={{
    options: {
      language: 'en', // 'en' or 'tr'
    },
  }}
>
  <YourApp />
</RottProvider>
```

### Device Features

Override automatic device detection:

```tsx
<RottProvider
  config={{
    options: {
      hasNotch: true,
      hasDynamicIsland: false,
    },
  }}
>
  <YourApp />
</RottProvider>
```

### Custom Theme

Provide a custom theme configuration:

```tsx
import { defaultThemeConfig } from '@tansuk/rott-ui';

<RottProvider
  config={{
    ...defaultThemeConfig,
    colors: {
      ...defaultThemeConfig.colors,
      primary: '#FF0000',
      secondary: '#00FF00',
    },
  }}
>
  <YourApp />
</RottProvider>
```

The `config` you pass to `RottProvider` (`colors`, `icons`, `images`, `fontSizes`,
etc.) is merged into the active theme. If you also use [`rott.config.ts`](/docs/theming/rott-config),
**`rott.config.ts` is the primary source and wins on any key collision** — values
from `RottProvider config` supplement it but do not override keys already defined
there.

:::tip
Pass a **stable** `config` reference — define it at module scope or memoize it
with `useMemo`. A new inline object on every render (e.g. `config={{ ... }}`
written directly in JSX) causes the theme to be recomputed on each render.
:::

## Complete Configuration

```tsx
import React from 'react';
import { RottProvider, defaultThemeConfig } from '@tansuk/rott-ui';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';

export default function App() {
  return (
    <RottProvider
      config={{
        ...defaultThemeConfig,
        options: {
          language: 'en',
          hasNotch: true,
          hasDynamicIsland: false,
        },
        colors: {
          ...defaultThemeConfig.colors,
          // Add custom colors
          brandPrimary: '#123456',
          brandSecondary: '#654321',
        },
        goBack: () => {
          // Custom navigation back handler
          console.log('Go back pressed');
        },
      }}
    >
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </RottProvider>
  );
}
```

## Config Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `options.language` | `string` | `'en'` | App language |
| `options.hasNotch` | `boolean` | Auto-detected | Device has notch |
| `options.hasDynamicIsland` | `boolean` | Auto-detected | Device has Dynamic Island |
| `colors` | `Record<string, string>` | `defaultThemeConfig.colors` | Color palette |
| `images` | `Record<string, ImageSource>` | `defaultThemeConfig.images` | Image assets |
| `icons` | `Record<string, ImageSource>` | `defaultThemeConfig.icons` | Icon assets |
| `fontSizes` | `Record<string, number>` | `defaultThemeConfig.fontSizes` | Font sizes |
| `goBack` | `() => void` | - | Custom back handler |

## Device Detection

Rott UI automatically detects device features using `react-native-device-info`:

- **hasNotch**: Detects if device has a notch (iPhone X and newer)
- **hasDynamicIsland**: Detects if device has Dynamic Island (iPhone 14 Pro and newer)

These values are available throughout your app via the `useRottContext` hook:

```tsx
import { useRottContext } from '@tansuk/rott-ui';

function MyComponent() {
  const { hasNotch, hasDynamicIsland, language } = useRottContext();
  
  return (
    <View>
      <Text>Has Notch: {hasNotch ? 'Yes' : 'No'}</Text>
      <Text>Has Dynamic Island: {hasDynamicIsland ? 'Yes' : 'No'}</Text>
      <Text>Language: {language.name}</Text>
    </View>
  );
}
```

## Next Steps

- **[Theming](/docs/theming/overview)** - Learn about the theming system
- **[rott.config.ts](/docs/theming/rott-config)** - Type-safe theme configuration
- **[Components](/docs/components/overview)** - Explore all components
