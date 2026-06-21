---
sidebar_position: 1
title: Theming Overview
description: Understanding the Rott UI theming system
---

# Theming Overview

Rott UI provides a powerful, type-safe theming system that allows you to customize colors, typography, spacing, and more throughout your entire application.

## Theming Philosophy

Rott UI's theming system is designed around these principles:

1. **Type-Safe**: Full TypeScript support with autocomplete
2. **Centralized**: Configure once, use everywhere
3. **Flexible**: Override at component level when needed
4. **Responsive**: Automatic scaling based on screen size
5. **Consistent**: Shared design tokens across all components

## Theme Configuration

There are two ways to configure your theme:

### 1. RottProvider Config (Runtime)

Pass configuration directly to `RottProvider`:

```tsx
import { RottProvider, defaultThemeConfig } from '@tansuk/rott-ui';

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

### 2. rott.config.ts (Compile-Time)

Create a `rott.config.ts` file for type-safe theming with autocomplete:

```tsx title="rott.config.ts"
import { defineRottConfig } from '@tansuk/rott-ui';

export const config = defineRottConfig({
  colors: {
    brandPrimary: '#123456',
    brandAccent: '#ff00aa',
    customButton: '#00ff00',
  },
} as const);
```

Then use your custom colors with full autocomplete:

```tsx
<Button variant="brandPrimary">Primary Button</Button>
<Button variant="customButton">Custom Button</Button>
```

[Learn more about rott.config.ts →](/docs/theming/rott-config)

## Theme Structure

The theme configuration includes:

### Colors

Define your color palette with semantic names:

```typescript
colors: {
  // Brand colors
  primary: '#00a9ce',
  secondary: '#ffc72c',
  
  // Semantic colors
  danger: '#f65353',
  success: '#3fb618',
  warning: '#ff7518',
  info: '#3fb6d2',
  
  // Neutral colors
  'grey-900': '#223f46',
  'grey-800': '#3d585e',
  'grey-200': '#a1adaf',
  'grey-100': '#eaeff0',
  white: '#ffffff',
  black: '#111111',
  
  // Custom colors
  brandPrimary: '#your-color',
}
```

[Learn more about colors →](/docs/theming/colors)

### Typography

Configure fonts, sizes, and weights:

```typescript
fontSizes: {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 24,
  xxxl: 36,
}

fontFamilies: {
  regular: 'YourFont-Regular',
  bold: 'YourFont-Bold',
  medium: 'YourFont-Medium',
}
```

[Learn more about typography →](/docs/theming/typography)

### Spacing

Responsive spacing based on reference device:

```typescript
referenceDevice: {
  width: 390,
  height: 844,
}
```

All spacing values are automatically scaled based on the actual device dimensions.

[Learn more about spacing →](/docs/theming/spacing)

## Using Theme Values

### In Components

All components accept theme variants:

```tsx
<Button variant="primary">Primary</Button>
<Label variant="danger">Error</Label>
<Icon name="STAR" variant="warning" />
```

### Custom Colors

Override colors at component level:

```tsx
<Button 
  backgroundColor="custom-color"
  color="text-color"
>
  Custom Button
</Button>
```

### Common UI Props

All components support common styling props:

```tsx
<Button
  marginTop={16}
  marginBottom={24}
  paddingHorizontal={32}
  borderRadius={12}
  backgroundColor="primary"
>
  Styled Button
</Button>
```

## Accessing Theme

Use the theme in your custom components:

```tsx
import { theme } from '@tansuk/rott-ui';

function MyComponent() {
  return (
    <View style={{ backgroundColor: theme.colors.primary }}>
      <Text style={{ fontSize: theme.fontSizes.lg }}>
        Custom Component
      </Text>
    </View>
  );
}
```

## Best Practices

### Do's ✅

- Use semantic color names (danger, success, warning)
- Define custom colors in rott.config.ts for autocomplete
- Use theme font sizes for consistency
- Leverage common UI props for spacing

### Don'ts ❌

- Don't hardcode colors in components
- Don't mix different spacing systems
- Don't override theme values without good reason
- Don't forget to test in both light and dark modes

## Next Steps

- **[Colors](/docs/theming/colors)** - Complete color system guide
- **[Typography](/docs/theming/typography)** - Font configuration
- **[Spacing](/docs/theming/spacing)** - Responsive spacing system
- **[rott.config.ts](/docs/theming/rott-config)** - Type-safe configuration
