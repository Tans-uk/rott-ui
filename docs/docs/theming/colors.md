---
sidebar_position: 2
title: Colors
description: Complete color system and variants
---

# Colors

Rott UI provides a comprehensive color system with semantic naming and support for custom colors.

## Default Color Palette

### Brand Colors

```tsx
<Button variant="primary">Primary</Button>      // #00a9ce (Cyan)
<Button variant="secondary">Secondary</Button>  // #ffc72c (Yellow)
```

### Semantic Colors

```tsx
<Button variant="danger">Danger</Button>    // #f65353 (Red)
<Button variant="success">Success</Button>  // #3fb618 (Green)
<Button variant="warning">Warning</Button>  // #ff7518 (Orange)
<Button variant="info">Info</Button>        // #3fb6d2 (Blue)
<Button variant="mint">Mint</Button>        // #20966e (Mint)
```

### Neutral Colors

```tsx
<Button variant="grey-900">Dark Grey</Button>   // #223f46
<Button variant="grey-800">Grey</Button>        // #3d585e
<Button variant="grey-200">Light Grey</Button>  // #a1adaf
<Button variant="grey-100">Lightest</Button>    // #eaeff0
<Button variant="white">White</Button>          // #ffffff
<Button variant="black">Black</Button>          // #111111
```

### Outline Variants

All colors have outline variants with transparent backgrounds:

```tsx
<Button variant="primary-outline">Primary Outline</Button>
<Button variant="secondary-outline">Secondary Outline</Button>
<Button variant="danger-outline">Danger Outline</Button>
<Button variant="success-outline">Success Outline</Button>
```

### Alpha Variants

Semi-transparent colors for overlays:

```tsx
<Item backgroundColor="neutral-alpha-900">90% opacity</Item>
<Item backgroundColor="neutral-alpha-700">75% opacity</Item>
<Item backgroundColor="neutral-alpha-400">40% opacity</Item>
<Item backgroundColor="neutral-alpha-200">15% opacity</Item>
<Item backgroundColor="neutral-alpha-100">10% opacity</Item>
```

## Custom Colors

Add custom colors via `rott.config.ts`:

```typescript title="rott.config.ts"
import { defineRottConfig } from '@tansuk/rott-ui';

export const config = defineRottConfig({
  colors: {
    // Your custom colors
    brandPrimary: '#123456',
    brandSecondary: '#654321',
    accentPurple: '#9b59b6',
    accentOrange: '#e67e22',
    
    // Dark mode variants
    darkBackground: '#1a1a1a',
    darkSurface: '#2a2a2a',
    
    // Component-specific
    buttonPrimary: '#00a9ce',
    buttonSecondary: '#ffc72c',
    inputBorder: '#e0e0e0',
    inputFocus: '#00a9ce',
  },
} as const);
```

Then use with autocomplete:

```tsx
<Button variant="brandPrimary">Brand Button</Button>
<Label variant="accentPurple">Purple Text</Label>
<Item backgroundColor="darkBackground">Dark Item</Item>
```

## Color Usage in Components

### Button

```tsx
<Button variant="primary">Primary</Button>
<Button variant="danger">Delete</Button>
<Button variant="success">Confirm</Button>
<Button backgroundColor="custom" color="white">Custom</Button>
```

### Label

```tsx
<Label text="Title" variant="grey-900" />
<Label text="Error" variant="danger" />
<Label text="Success" variant="success" />
```

### Icon

```tsx
<Icon name="STAR" variant="warning" />
<Icon name="CHECK" variant="success" />
<Icon name="CLOSE" variant="danger" />
```

### Alert

```tsx
<Alert variant="danger" text="Error message" />
<Alert variant="success" text="Success message" />
<Alert variant="warning" text="Warning message" />
<Alert variant="info" text="Info message" />
```

## Color Utilities

### colorFromVariant

Get color value from variant name:

```tsx
import { colorFromVariant } from '@tansuk/rott-ui';

const primaryColor = colorFromVariant('primary'); // '#00a9ce'
const customColor = colorFromVariant('brandPrimary'); // Your custom color
```

### textcolorFromVariant

Get appropriate text color for a variant:

```tsx
import { textcolorFromVariant } from '@tansuk/rott-ui';

const textColor = textcolorFromVariant('primary'); // Returns white or black based on background
```

## Accessibility

Ensure sufficient color contrast for accessibility:

- **Normal text**: 4.5:1 contrast ratio
- **Large text**: 3:1 contrast ratio
- **Interactive elements**: 3:1 contrast ratio

Rott UI's default colors are designed to meet WCAG AA standards.

## Best Practices

### Do's ✅

- Use semantic colors (danger for errors, success for confirmations)
- Define brand colors in rott.config.ts
- Test colors in both light and dark modes
- Ensure sufficient contrast for accessibility

### Don'ts ❌

- Don't use too many custom colors (keep it consistent)
- Don't hardcode hex values in components
- Don't forget to test with colorblind users
- Don't use color as the only indicator (add icons/text)

## Next Steps

- **[Typography](/docs/theming/typography)** - Font configuration
- **[Spacing](/docs/theming/spacing)** - Spacing system
- **[rott.config.ts](/docs/theming/rott-config)** - Complete configuration guide
