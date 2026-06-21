---
sidebar_position: 5
title: Item
description: Flexible layout container
---

# Item

Item is a flexible layout container component with built-in skeleton support and common UI props.

## Features

- 📏 Flex layout
- 🎨 Styling support
- 💀 Built-in skeleton
- 🎯 Common UI props

## Basic Usage

```tsx
import { Item } from '@tansuk/rott-ui';

<Item>
  <Label text="Content" />
</Item>
```

## Row Layout

```tsx
<Item row alignItemsCenter>
  <Icon name="STAR" width={20} height={20} />
  <Label text="Rating" marginLeft={8} />
</Item>
```

## With Flex

```tsx
<Item flex={1} justifyContentCenter alignItemsCenter>
  <Label text="Centered Content" />
</Item>
```

## With Skeleton

```tsx
<Item 
  skeletonShow={isLoading}
  skeletonStyle={{ width: 200, height: 100 }}
>
  <Label text="Content" />
</Item>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content |
| `row` | `boolean` | `false` | Row layout |
| `flexWrap` | `'wrap' \| 'nowrap'` | - | Flex wrap |
| `skeletonShow` | `boolean` | `false` | Show skeleton |
| `skeletonStyle` | `SkeletonStyleProps` | - | Skeleton style |

Plus all [CommonUiProps]().

## Examples

### Card

```tsx
<Item 
  padding={16}
  backgroundColor="white"
  borderRadius={12}
  marginBottom={12}
>
  <Label text="Card Title" fontSize="lg" fontWeight="bold" marginBottom={8} />
  <Label text="Card content" fontSize="sm" variant="grey-800" />
</Item>
```

### List Item

```tsx
<Item 
  row 
  alignItemsCenter 
  justifyContentSpaceBetween
  paddingHorizontal={16}
  paddingVertical={12}
>
  <Item row alignItemsCenter>
    <Icon name="USER" width={24} height={24} marginRight={12} />
    <Label text="User Name" />
  </Item>
  <Icon name="CHEVRON_RIGHT" width={20} height={20} />
</Item>
```

### Grid Item

```tsx
<Item row flexWrap="wrap">
  {items.map((item) => (
    <Item key={item.id} width="50%" padding={8}>
      <Image source={item.image} width="100%" height={150} />
      <Label text={item.title} marginTop={8} />
    </Item>
  ))}
</Item>
```
