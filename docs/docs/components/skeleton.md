---
sidebar_position: 5
title: Skeleton
description: Loading placeholder component
---

# Skeleton

Skeleton displays animated loading placeholders while content is being fetched.

## Features

- ✨ Shimmer animation
- 📏 Customizable dimensions
- 🎯 Border radius control
- 🔒 Optional animation disable

## Basic Usage

```tsx
import { Skeleton } from '@tansuk/rott-ui';

<Skeleton show={isLoading} width={200} height={20} />
```

## Custom Dimensions

```tsx
<Skeleton show={true} width={300} height={100} radius={12} />
```

## No Animation

```tsx
<Skeleton show={true} width={200} height={20} noAnimation />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `show` | `boolean` | **Required** | Show skeleton |
| `width` | `number` | **Required** | Width |
| `height` | `number` | **Required** | Height |
| `radius` | `number` | `4` | Border radius |
| `noAnimation` | `boolean` | `false` | Disable animation |

## Examples

### Loading Card

```tsx
function LoadingCard() {
  return (
    <Item padding={16} backgroundColor="white" borderRadius={12}>
      <Skeleton show={true} width="100%" height={200} radius={8} marginBottom={12} />
      <Skeleton show={true} width="80%" height={20} marginBottom={8} />
      <Skeleton show={true} width="60%" height={16} />
    </Item>
  );
}
```

### Loading List

```tsx
function LoadingList() {
  return (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <Item key={i} row paddingVertical={12} paddingHorizontal={16}>
          <Skeleton show={true} width={48} height={48} radius={24} marginRight={12} />
          <Item flex={1}>
            <Skeleton show={true} width="70%" height={16} marginBottom={8} />
            <Skeleton show={true} width="50%" height={14} />
          </Item>
        </Item>
      ))}
    </>
  );
}
```

### With Item Component

```tsx
<Item skeletonShow={isLoading} skeletonStyle={{ width: 200, height: 100 }}>
  <Label text="Actual Content" />
</Item>
```
