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

## Sizes

```tsx
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="full">Full Width</Button>
```

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
| `size` | `Size \| { width, height }` | `'md'` | Button size |
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
