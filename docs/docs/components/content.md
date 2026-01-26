---
sidebar_position: 2
title: Content
description: Scrollable content container with keyboard handling
---

# Content

The Content component is a scrollable container for your main content with automatic keyboard avoidance and pull-to-refresh support.

## Features

- 📜 Automatic scrolling
- ⌨️ Keyboard avoidance
- 🔄 Pull-to-refresh
- 📏 Flexible layout
- 📱 Bottom menu spacing

## Basic Usage

```tsx
import { Content } from '@tansuk/rott-ui';

<Content flex={1}>
  {/* Your scrollable content */}
</Content>
```

## Keyboard Avoidance

```tsx
<Content 
  flex={1}
  keyboardAvoidingView
  keyboardVerticalOffset={100}
>
  <Input name="email" type="email" />
  <Input name="password" type="password" />
</Content>
```

## Pull to Refresh

```tsx
import { useState } from 'react';

function MyScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <Content
      flex={1}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Content */}
    </Content>
  );
}
```

## Horizontal Layout

```tsx
<Content row scrollEnabled>
  <Item width={200} height={200} />
  <Item width={200} height={200} />
</Content>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content |
| `flex` | `number` | - | Flex value |
| `row` | `boolean` | `false` | Horizontal layout |
| `noPadding` | `boolean` | `false` | Remove padding |
| `keyboardAvoidingView` | `boolean` | `false` | Keyboard avoidance |
| `scrollEnabled` | `boolean` | `true` | Enable scrolling |
| `refreshControl` | `ReactElement` | - | Pull-to-refresh |
| `hasBottomMenu` | `boolean` | `false` | Bottom menu spacing |

## Example

```tsx
<Content 
  flex={1}
  keyboardAvoidingView
  paddingHorizontal={24}
>
  <Input name="name" type="default" label="Name" />
  <Input name="email" type="email" label="Email" />
  <Button variant="primary" marginTop={24}>Submit</Button>
</Content>
```
