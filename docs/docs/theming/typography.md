---
sidebar_position: 3
title: Typography
description: Font sizes, families, and weights
---

# Typography

Rott UI provides a responsive typography system with predefined font sizes, families, and weights.

## Font Sizes

### Predefined Sizes

```tsx
<Label text="Extra Small" fontSize="xs" />   // 10px
<Label text="Small" fontSize="sm" />          // 12px
<Label text="Medium" fontSize="md" />         // 14px (default)
<Label text="Large" fontSize="lg" />          // 16px
<Label text="Extra Large" fontSize="xl" />    // 18px
<Label text="2X Large" fontSize="xxl" />      // 24px
<Label text="3X Large" fontSize="xxxl" />     // 36px
```

### Responsive Sizing

Font sizes automatically adjust for small screens (< 380px width):

| Size | Normal | Small Screen |
|------|--------|--------------|
| xs | 10px | 9px |
| sm | 12px | 11px |
| md | 14px | 12px |
| lg | 16px | 14px |
| xl | 18px | 16px |
| xxl | 24px | 20px |
| xxxl | 36px | 30px |

### Custom Font Sizes

Override at component level:

```tsx
<Label text="Custom Size" style={{ fontSize: 20 }} />
```

## Font Families

### Default Fonts

Rott UI uses the Markpro font family by default:

- **MarkproRegular** - Regular weight
- **MarkproBold** - Bold weight
- **MarkproMedium** - Medium weight
- **MarkproLight** - Light weight

### Using Font Families

```tsx
<Label text="Regular" fontFamily="MarkproRegular" />
<Label text="Bold" fontFamily="MarkproBold" />
<Label text="Medium" fontFamily="MarkproMedium" />
```

### Custom Fonts

Add custom fonts via `rott.config.ts`:

```typescript title="rott.config.ts"
export const config = defineRottConfig({
  fontFamilies: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    bold: 'Inter-Bold',
    light: 'Inter-Light',
  },
} as const);
```

## Font Weights

### Using Font Weight

```tsx
<Label text="Regular" fontWeight="regular" />
<Label text="Medium" fontWeight="medium" />
<Label text="Bold" fontWeight="bold" />
<Label text="Light" fontWeight="light" />
```

### Font Weight Mapping

Font weights automatically map to font families:

```typescript
fontWeights: {
  regular: 'MarkproRegular',
  medium: 'MarkproMedium',
  bold: 'MarkproBold',
  light: 'MarkproLight',
}
```

## Typography Scale

### Headings

```tsx
<Label text="H1 Heading" fontSize="xxxl" fontWeight="bold" />
<Label text="H2 Heading" fontSize="xxl" fontWeight="bold" />
<Label text="H3 Heading" fontSize="xl" fontWeight="bold" />
<Label text="H4 Heading" fontSize="lg" fontWeight="bold" />
```

### Body Text

```tsx
<Label text="Body Large" fontSize="lg" />
<Label text="Body Medium" fontSize="md" />
<Label text="Body Small" fontSize="sm" />
```

### Captions

```tsx
<Label text="Caption" fontSize="xs" variant="grey-800" />
```

## Letter Spacing

Add custom letter spacing:

```tsx
<Label text="Tight" letterSpacing={-0.5} />
<Label text="Normal" letterSpacing={0} />
<Label text="Wide" letterSpacing={2} />
```

## Text Styles

### Emphasis

```tsx
<Label text="Bold Text" fontWeight="bold" />
<Label text="Medium Text" fontWeight="medium" />
<Label text="Light Text" fontWeight="light" />
```

### Alignment

```tsx
<Label text="Left" textAlign="left" />
<Label text="Center" textCenter />
<Label text="Right" textAlign="right" />
```

### Truncation

```tsx
<Label 
  text="Long text that will be truncated with ellipsis"
  numberOfLines={1}
/>
```

## Typography in Components

### Button

```tsx
<Button fontSize="lg" fontWeight="bold">
  Large Bold Button
</Button>
```

### Input

```tsx
<Input
  name="email"
  label={{
    text: "Email",
    fontSize: "lg",
    fontWeight: "bold",
  }}
/>
```

## Best Practices

### Do's ✅

- Use the predefined font scale for consistency
- Use semantic sizes (lg for headings, md for body)
- Test typography on different screen sizes
- Ensure readable line heights

### Don'ts ❌

- Don't use too many font sizes on one screen
- Don't use extreme letter spacing
- Don't mix too many font families
- Don't forget to test on small devices

## Accessibility

- Minimum font size: 12px for body text
- Sufficient line height: 1.5 for body text
- Clear hierarchy with size and weight
- Good contrast ratios

## Next Steps

- **[Colors](/docs/theming/colors)** - Color system
- **[Spacing](/docs/theming/spacing)** - Spacing system
- **[rott.config.ts](/docs/theming/rott-config)** - Custom configuration
