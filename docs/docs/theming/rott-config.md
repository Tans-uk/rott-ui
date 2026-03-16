---
sidebar_position: 4
title: rott.config.ts
description: Type-safe theme configuration with autocomplete
---

# rott.config.ts

The `rott.config.ts` file provides a Tailwind-style configuration system with full TypeScript autocomplete for your custom theme.

## Why rott.config.ts?

- ✅ **Type-safe**: Full TypeScript autocomplete
- ✅ **Centralized**: Single source of truth
- ✅ **Autocomplete**: Your custom colors appear in IDE
- ✅ **Compile-time**: Catch errors before runtime

## Setup

### Step 1: Create rott.config.ts

Create a `rott.config.ts` file in your project root:

```typescript title="rott.config.ts"
import { defineRottConfig } from '@tansuk/rott-ui';

export const config = defineRottConfig({
  colors: {
    brandPrimary: '#123456',
    brandSecondary: '#654321',
    brandAccent: '#ff00aa',
    customButton: '#00ff00',
    customBackground: '#f5f5f5',
  },
} as const);
```

### Step 2: Add TypeScript Path Mapping

Add the path mapping to your `tsconfig.json` so the IDE can resolve the module:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "paths": {
      "rott.config": ["./rott.config.ts"]
    }
  }
}
```

:::caution TypeScript paths are compile-time only
The `tsconfig.json` path mapping provides IDE autocomplete and type checking, but it does **not** work at runtime. Metro/Babel cannot resolve `rott.config` from `tsconfig.json` paths alone. You must also complete **Step 2b** below.
:::

### Step 2b: Add Babel Module Resolver (Runtime)

Install `babel-plugin-module-resolver` so Metro can resolve `rott.config` at bundle time:

```bash npm2yarn
npm install babel-plugin-module-resolver --save-dev
```

Add the alias to your `babel.config.js`:

```js title="babel.config.js"
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
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
};
```

:::warning Plugin Order
The `react-native-reanimated/plugin` must **always** be the last plugin. Place `module-resolver` and any other plugins before it. See [Installation - Babel Plugins](/docs/getting-started/installation#babel-module-resolver) for the full plugin order.
:::

### Step 3: Use Your Custom Theme

Now your custom colors have full autocomplete:

```tsx
import { Button, Label } from '@tansuk/rott-ui';

<Button variant="brandPrimary">Primary Button</Button>
<Button variant="brandSecondary">Secondary Button</Button>
<Button variant="customButton">Custom Button</Button>
<Label variant="brandAccent">Accent Text</Label>
```

## Configuration Options

### Colors

Define custom colors that extend the default palette:

```typescript
export const config = defineRottConfig({
  colors: {
    // Your brand colors
    brandPrimary: '#00a9ce',
    brandSecondary: '#ffc72c',
    brandAccent: '#3fb618',
    
    // Component-specific colors
    buttonPrimary: '#0098b8',
    buttonSecondary: '#f5bb00',
    
    // Semantic colors
    errorRed: '#f65353',
    successGreen: '#3fb618',
    warningOrange: '#ff7518',
    
    // Background colors
    backgroundLight: '#ffffff',
    backgroundDark: '#1a1a1a',
    
    // Text colors
    textPrimary: '#223f46',
    textSecondary: '#a1adaf',
  },
} as const);
```

### Images

Add custom images to your theme:

```typescript
export const config = defineRottConfig({
  colors: { /* ... */ },
  images: {
    logo: require('./assets/logo.png'),
    background: require('./assets/background.png'),
    placeholder: require('./assets/placeholder.png'),
  },
} as const);
```

Then use them in components:

```tsx
<Image name="logo" width={100} height={100} />
<Header logo="logo" />
```

:::tip Zero-config alternative: Asset Auto-Discovery
Instead of manually defining images and icons, you can use **Asset Auto-Discovery**. Add the `withRottAssets()` wrapper to your Metro config and drop files into `src/assets/images/` or `src/assets/icons/svg/`. They are scanned automatically and available by filename (e.g. `my-logo.png` → `name="my-logo"`). See [Asset Auto-Discovery](#asset-auto-discovery) below.
:::

### Icons

Add custom SVG icons:

:::warning SVG Transformer Required
Custom SVG icons require `react-native-svg-transformer` to be installed and your Metro config to include the SVG setup. Without this, `require('./path/to/icon.svg')` will fail at runtime. See [Installation - SVG Icon Support](/docs/getting-started/installation#configure-svg-icon-support) for setup instructions.
:::

```typescript
export const config = defineRottConfig({
  colors: { /* ... */ },
  icons: {
    customIcon: require('./assets/icons/custom.svg'),
    brandIcon: require('./assets/icons/brand.svg'),
  },
} as const);
```

Use them like built-in icons:

```tsx
<Icon name="customIcon" width={24} height={24} />
<Button leftIcon={{ name: 'brandIcon', width: 20, height: 20 }}>
  Button with Custom Icon
</Button>
```

## Asset Auto-Discovery

Asset Auto-Discovery lets you use images and icons **without manually defining them** in `rott.config.ts`. Add files to the correct folders and they are automatically registered.

### Setup

1. Add the `withRottAssets()` wrapper to your Metro config:

```js title="metro.config.js"
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')
const { withRottAssets } = require('@tansuk/rott-ui/metro')

const defaultConfig = getDefaultConfig(__dirname)
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
}

module.exports = withRottAssets(mergeConfig(defaultConfig, config), {
  projectRoot: __dirname,
})
```

2. Add images to `src/assets/images/` (`.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`)
3. Add icons to `src/assets/icons/svg/` (`.svg`)
4. Restart Metro (`npx react-native start --reset-cache`)

### Usage

Use assets by **filename without extension**:

```tsx
<Image name="my-logo" />
<Icon name="arrow-right" />
```

### TypeScript Autocomplete

The wrapper generates `.rott/consumer-assets.d.ts` for autocomplete. Add it to your `tsconfig.json`:

```json
{
  "include": ["**/*.ts", "**/*.tsx", ".rott/**/*.d.ts"]
}
```

Restart the TypeScript server (`Cmd+Shift+P` → "TypeScript: Restart TS Server") after adding assets.

### Default Directories

| Type   | Path                      |
| ------ | ------------------------- |
| Images | `src/assets/images/`      |
| Icons  | `src/assets/icons/svg/`   |

Override via options: `withRottAssets(config, { imagesDir: 'assets/img', iconsDir: 'assets/ico' })`

### Retina Variants

`@2x` and `@3x` variants (e.g. `logo@2x.png`) are skipped; only the base file is registered.

---

## Empty Config

You can use an **empty config** when you want only consumer-scanned assets (no library defaults):

```typescript title="rott.config.ts"
import { defineRottConfig } from '@tansuk/rott-ui';

export const config = defineRottConfig({} as const);
```

With empty config:

- **Images & Icons**: Only assets from your `src/assets/` scan (no default library assets)
- **Colors, fonts, etc.**: Default theme values are still used
- **Autocomplete**: Only your consumer asset names appear for `Image` and `Icon`

Use `...defaultThemeConfig` when you want library defaults plus your custom assets:

```typescript
import { defaultThemeConfig, defineRottConfig } from '@tansuk/rott-ui';

export const config = defineRottConfig({
  ...defaultThemeConfig,
  colors: { brandPrimary: '#123456' },
} as const);
```

---

## Advanced Configuration

### Font Customization

```typescript
export const config = defineRottConfig({
  colors: { /* ... */ },
  fontFamilies: {
    regular: 'YourFont-Regular',
    bold: 'YourFont-Bold',
    medium: 'YourFont-Medium',
  },
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 28,
    xxxl: 40,
  },
} as const);
```

### Reference Device

Customize the reference device for responsive scaling:

```typescript
export const config = defineRottConfig({
  referenceDevice: {
    width: 375,  // iPhone SE width
    height: 667, // iPhone SE height
  },
  colors: { /* ... */ },
} as const);
```

## Complete Example

```typescript title="rott.config.ts"
import { defineRottConfig } from '@tansuk/rott-ui';

export const config = defineRottConfig({
  referenceDevice: {
    width: 390,
    height: 844,
  },
  options: {
    language: 'en',
  },
  colors: {
    // Brand colors
    brandPrimary: '#00a9ce',
    brandSecondary: '#ffc72c',
    brandAccent: '#3fb618',
    
    // UI colors
    uiBackground: '#ffffff',
    uiSurface: '#f5f5f5',
    uiBorder: '#e0e0e0',
    
    // Text colors
    textPrimary: '#223f46',
    textSecondary: '#a1adaf',
    textDisabled: '#cccccc',
    
    // Semantic colors
    errorRed: '#f65353',
    successGreen: '#3fb618',
    warningOrange: '#ff7518',
    infoBlue: '#3fb6d2',
  },
  images: {
    logo: require('./assets/images/logo.png'),
    logoWhite: require('./assets/images/logo-white.png'),
    splash: require('./assets/images/splash.png'),
  },
  icons: {
    customHome: require('./assets/icons/home.svg'),
    customProfile: require('./assets/icons/profile.svg'),
  },
  fontFamilies: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    bold: 'Inter-Bold',
  },
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 24,
    xxxl: 36,
  },
  goBack: () => {
    // Custom navigation logic
    console.log('Navigate back');
  },
} as const);
```

## TypeScript Benefits

With `rott.config.ts`, you get:

1. **Autocomplete**: Your custom color names appear in IDE
2. **Type Safety**: Catch typos at compile time
3. **Refactoring**: Rename colors safely across your app
4. **Documentation**: Self-documenting color palette

## Migration from Runtime Config

If you're currently using runtime configuration:

```tsx
// Old way (runtime)
<RottProvider
  config={{
    colors: { brandPrimary: '#123456' }
  }}
>
```

Migrate to:

```typescript
// New way (compile-time)
// rott.config.ts
export const config = defineRottConfig({
  colors: { brandPrimary: '#123456' },
} as const);

// App.tsx
<RottProvider>
  <YourApp />
</RottProvider>
```

## Next Steps

- **[Colors](/docs/theming/colors)** - Complete color system
- **[Typography](/docs/theming/typography)** - Font configuration
- **[Configuration](/docs/getting-started/configuration)** - RottProvider setup
