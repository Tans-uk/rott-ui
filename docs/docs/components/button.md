---
sidebar_position: 1
title: Button
description: Interactive button component with variants, sizes, icons, and loading states
---

# Button

The Button component is a versatile, interactive element that supports multiple variants, sizes, icons, images, and loading states.

## Features

- 🎨 Multiple color variants
- 📏 Flexible sizing
- 🖼️ Left/right icons and images
- ⏳ Loading states
- 🔘 Circle button variant
- 🎯 Outline variants
- ♿ Accessibility support

## Basic Usage

```tsx
import { Button } from '@tansuk/rott-ui';

<Button variant="primary" onPress={() => console.log('Pressed!')}>
  Click Me
</Button>
```

## Variants

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>
<Button variant="primary-outline">Primary Outline</Button>
```

### Custom Borders

`borderWidth` and `borderColor` are honored on every variant, not just `*-outline`.
Explicit values always win; the `*-outline` border is the fallback when you pass neither.

This matters for controls whose fill is fixed by a brand guideline — the border is then
the only thing separating the control from the page, and WCAG 2.1 SC 1.4.11 asks for at
least 3:1 contrast on that boundary.

```tsx
<Button backgroundColor="#FFFFFF" color="#1F1F1F" borderWidth={1} borderColor="#747775">
  Sign in with Google
</Button>
```

## Sizes

```tsx
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="xxl">Extra Extra Large</Button>
<Button size="full">Full Width</Button>
```

| Size | Width | Height |
|------|-------|--------|
| `xs` | 85.5 | 36 |
| `sm` | 114 | 40 |
| `md` | 171 | 48 |
| `lg` | 228 | 56 |
| `xl` | 85% of parent | 64 |
| `xxl` | 92.5% of parent | 72 |
| `full` | 100% of parent | 56 |

`xs` through `lg` are fixed widths, expressed against a 390pt reference device and
scaled to the actual screen width. `xl`, `xxl` and `full` are **relative to the parent
container**, so a `size="full"` button inside a padded card fills the card's content
box rather than overflowing it.

`size` also accepts an object to choose width and height independently:

```tsx
<Button size={{ width: 'md', height: 'lg' }}>Medium wide, large tall</Button>
```

When no `size` is given the button defaults to `{ height: 'lg' }` — full width, 56 tall.

## With Icons

```tsx
<Button 
  variant="primary"
  leftIcon={{ name: 'PLUS', width: 20, height: 20 }}
>
  Add Item
</Button>

<Button 
  variant="primary"
  rightIcon={{ name: 'ARROW_RIGHT', width: 20, height: 20 }}
>
  Continue
</Button>
```

## Loading States

```tsx
<Button
  variant="primary"
  isLoading={true}
  loadingText="Processing..."
  onPress={handleSubmit}
>
  Submit
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `Variant` | `'primary'` | Color variant |
| `size` | `Size \| { width, height }` | `{ height: 'lg' }` | Button size |
| `borderWidth` | `number` | `2` for `*-outline`, none otherwise | Border width; honored on every variant |
| `borderColor` | `string` | variant color for `*-outline`, none otherwise | Border color; honored on every variant |
| `isLoading` | `boolean` | `false` | Loading state |
| `loadingText` | `string` | - | Loading text |
| `disabled` | `boolean` | `false` | Disabled state |
| `circle` | `boolean` | `false` | Circular button |
| `leftIcon` | `ButtonIconProps` | - | Left icon |
| `rightIcon` | `ButtonIconProps` | - | Right icon |
| `leftImage` | `ButtonImageProps` | - | Left image |
| `rightImage` | `ButtonImageProps` | - | Right image |
| `onPress` | `() => void` | - | Press handler |

## Examples

### Login Button

```tsx
<Button
  size="full"
  variant="primary"
  fontSize="lg"
  leftIcon={{ name: 'USER', width: 20, height: 20 }}
  onPress={handleLogin}
>
  Sign In
</Button>
```

### Delete with Confirmation

```tsx
<Button
  variant="danger"
  leftIcon={{ name: 'REMOVE', width: 20, height: 20 }}
  onPress={() => {
    AlertDialog.show({
      title: 'Confirm Delete',
      text: 'Are you sure?',
      buttons: [
        { text: 'Cancel', variant: 'secondary' },
        { text: 'Delete', variant: 'danger', onPress: handleDelete },
      ],
    });
  }}
>
  Delete
</Button>
```
