---
sidebar_position: 5
title: Spacing
description: Responsive spacing and layout system
---

# Spacing

Rott UI provides a responsive spacing system that automatically scales based on device dimensions.

## Reference Device

All spacing is calculated relative to a reference device:

```typescript
referenceDevice: {
  width: 390,   // iPhone 12/13 width
  height: 844,  // iPhone 12/13 height
}
```

Spacing values automatically scale on different devices to maintain consistent visual proportions.

## Common UI Props

All components support common spacing props:

### Margins

```tsx
<Button marginTop={16}>Top Margin</Button>
<Button marginBottom={24}>Bottom Margin</Button>
<Button marginLeft={8}>Left Margin</Button>
<Button marginRight={8}>Right Margin</Button>
<Button marginHorizontal={16}>Horizontal Margin</Button>
<Button marginVertical={24}>Vertical Margin</Button>
<Button margin={16}>All Sides</Button>
```

### Padding

```tsx
<Content paddingTop={16}>Top Padding</Content>
<Content paddingBottom={24}>Bottom Padding</Content>
<Content paddingLeft={8}>Left Padding</Content>
<Content paddingRight={8}>Right Padding</Content>
<Content paddingHorizontal={16}>Horizontal Padding</Content>
<Content paddingVertical={24}>Vertical Padding</Content>
<Content padding={16}>All Sides</Content>
```

## Spacing Scale

Recommended spacing values for consistency:

| Value | Usage |
|-------|-------|
| 4 | Tiny spacing |
| 8 | Small spacing |
| 12 | Medium-small spacing |
| 16 | Medium spacing (default) |
| 24 | Large spacing |
| 32 | Extra large spacing |
| 48 | Section spacing |
| 64 | Major section spacing |

## Responsive Utilities

### Percentage-Based Sizing

```tsx
import { setWidth, setHeight } from '@tansuk/rott-ui';

<Item width={setWidth(50)}>50% width</Item>
<Item height={setHeight(30)}>30% height</Item>
```

### Pixel Normalization

```tsx
import { px, heightPixel } from '@tansuk/rott-ui';

<Item width={px(200)}>Normalized width</Item>
<Item height={heightPixel(100)}>Normalized height</Item>
```

## Layout Props

### Flex

```tsx
<Content flex={1}>Takes available space</Content>
<Item flex={2}>Takes 2x space</Item>
```

### Dimensions

```tsx
<Item width={200} height={100}>Fixed size</Item>
<Item width="100%" height={50}>Full width</Item>
```

### Alignment

```tsx
<Content alignItemsCenter>Center items</Content>
<Content justifyContentCenter>Center content</Content>
<Content justifyContentSpaceBetween>Space between</Content>
```

## Spacing Patterns

### Form Spacing

```tsx
<Content paddingHorizontal={24}>
  <Input name="email" marginBottom={16} />
  <Input name="password" marginBottom={24} />
  <Button size="full" marginTop={8}>Submit</Button>
</Content>
```

### Card Spacing

```tsx
<Item 
  padding={16} 
  marginHorizontal={16} 
  marginVertical={8}
  borderRadius={12}
>
  <Label text="Card Title" marginBottom={8} />
  <Label text="Card content" fontSize="sm" />
</Item>
```

### List Item Spacing

```tsx
<Item 
  paddingHorizontal={16} 
  paddingVertical={12}
  marginBottom={1}
>
  <Label text="List Item" />
</Item>
```

## Border Radius

```tsx
<Item borderRadius={4}>Small radius</Item>
<Item borderRadius={8}>Medium radius</Item>
<Item borderRadius={12}>Large radius</Item>
<Item borderRadius={24}>Extra large radius</Item>
<Item borderRadius={999}>Pill shape</Item>
```

## Best Practices

### Do's ✅

- Use multiples of 4 or 8 for spacing
- Be consistent with spacing throughout your app
- Use the spacing scale for predictable layouts
- Test on different screen sizes

### Don'ts ❌

- Don't use arbitrary spacing values
- Don't mix different spacing systems
- Don't forget responsive considerations
- Don't use negative margins excessively

## Accessibility

- Minimum touch target: 44x44 points
- Sufficient spacing between interactive elements
- Clear visual grouping with spacing
- Consistent spacing for predictable navigation

## Next Steps

- **[Colors](/docs/theming/colors)** - Color system
- **[Typography](/docs/theming/typography)** - Font configuration
- **[rott.config.ts](/docs/theming/rott-config)** - Custom configuration
