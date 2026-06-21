---
sidebar_position: 1
title: Separator
description: Visual divider component
---

# Separator

Separator creates visual dividers between content sections.

## Features

- 📏 Horizontal and vertical
- 🎨 Customizable color
- 📐 Adjustable dimensions
- 🎯 Opacity control

## Basic Usage

```tsx
import { Separator } from '@tansuk/rott-ui';

<Separator />
```

## Horizontal

```tsx
<Separator orientation="horizontal" width="100%" height={1} />
```

## Vertical

```tsx
<Separator orientation="vertical" width={1} height={50} />
```

## Custom Color

```tsx
<Separator variant="primary" />
<Separator variant="danger" />
<Separator variant="grey-200" />
```

## Custom Opacity

```tsx
<Separator opacity={0.5} />
<Separator opacity={0.2} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation |
| `width` | `number \| string` | `'100%'` | Width |
| `height` | `number \| string` | `1` | Height |
| `variant` | `Variant` | `'grey-200'` | Color variant |
| `opacity` | `number` | `1` | Opacity (0-1) |

## Examples

### Between List Items

```tsx
<Item paddingVertical={12}>
  <Label text="Item 1" />
</Item>
<Separator />
<Item paddingVertical={12}>
  <Label text="Item 2" />
</Item>
<Separator />
<Item paddingVertical={12}>
  <Label text="Item 3" />
</Item>
```

### In Forms

```tsx
<Input name="email" type="email" />
<Separator marginVertical={16} />
<Input name="password" type="password" />
```

### Vertical Divider

```tsx
<Item row alignItemsCenter>
  <Label text="Option 1" />
  <Separator orientation="vertical" height={20} marginHorizontal={12} />
  <Label text="Option 2" />
  <Separator orientation="vertical" height={20} marginHorizontal={12} />
  <Label text="Option 3" />
</Item>
```
