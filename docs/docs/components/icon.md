---
sidebar_position: 2
title: Icon
description: SVG icon component with 117+ built-in icons
---

# Icon

The Icon component provides access to 117+ built-in SVG icons with support for custom colors, sizes, and stroke/fill modes.

:::info Prerequisites
The Icon component renders SVG files as React components. This requires `react-native-svg` and `react-native-svg-transformer` to be installed, and your Metro config to include the SVG setup. If icons are not rendering, see [Installation - SVG Icon Support](/docs/getting-started/installation#configure-svg-icon-support).
:::

## Features

- 🎨 117+ built-in icons
- 📏 Customizable size
- 🖌️ Stroke and fill modes
- 🎯 Theme color variants
- 🔧 Stroke width control

## Basic Usage

```tsx
import { Icon } from '@tansuk/rott-ui';

<Icon name="MENU" width={24} height={24} />
```

## Icon Sizes

```tsx
<Icon name="STAR" width={16} height={16} />
<Icon name="STAR" width={24} height={24} />
<Icon name="STAR" width={32} height={32} />
<Icon name="STAR" width={48} height={48} />
```

## Color Variants

```tsx
<Icon name="HEART" width={24} height={24} variant="primary" />
<Icon name="HEART" width={24} height={24} variant="danger" />
<Icon name="HEART" width={24} height={24} variant="success" />
```

## Stroke vs Fill

```tsx
{/* Stroke mode (outline) */}
<Icon name="HEART" width={24} height={24} mode="stroke" />

{/* Fill mode (solid) */}
<Icon name="HEART" width={24} height={24} mode="fill" />
```

## Available Icons

### Interface Icons
- MENU, CLOSE, REMOVE, PLUS, MINUS
- ARROW_LEFT, ARROW_RIGHT, CHEVRON_LEFT, CHEVRON_RIGHT
- CHECK, CHECK_CIRCLE, REMOVE_CIRCLE
- SEARCH, FILTER, SETTINGS
- USER, NOTIFICATION, MAIL
- STAR, HEART, EYE
- LOCK, LOCATION, CALENDAR
- CAMERA, GALLERY, QR
- And 90+ more...

### Currency Icons
- MONEY_ADD, MONEY_REMOVE, MONEY_TRANSFER
- CREDIT_CARD, WALLET

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `IconKeys` | **Required** | Icon name |
| `width` | `number` | `24` | Icon width |
| `height` | `number` | `24` | Icon height |
| `variant` | `Variant` | `'grey-900'` | Color variant |
| `mode` | `'stroke' \| 'fill'` | `'stroke'` | Render mode |
| `strokeWidth` | `number` | `2` | Stroke width |

## Examples

### Navigation

```tsx
<Icon name="ARROW_LEFT" width={24} height={24} />
<Icon name="MENU" width={24} height={24} />
<Icon name="CLOSE" width={24} height={24} />
```

### Actions

```tsx
<Icon name="PLUS" width={20} height={20} variant="primary" />
<Icon name="REMOVE" width={20} height={20} variant="danger" />
<Icon name="CHECK" width={20} height={20} variant="success" />
```

### In Buttons

```tsx
<Button 
  variant="primary"
  leftIcon={{ name: 'PLUS', width: 20, height: 20 }}
>
  Add Item
</Button>
```

### In Headers

```tsx
<Header
  title="Settings"
  leftIcon={[{ name: 'ARROW_LEFT', onPress: () => navigation.goBack() }]}
  rightIcon={[{ name: 'SEARCH', onPress: () => {} }]}
/>
```
