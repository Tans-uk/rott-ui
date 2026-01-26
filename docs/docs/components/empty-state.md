---
sidebar_position: 4
title: EmptyState
description: Empty state illustrations and messages
---

# EmptyState

EmptyState displays empty state illustrations with title, description, and action buttons.

## Basic Usage

```tsx
import { EmptyState } from '@tansuk/rott-ui';

<EmptyState
  icon={{ name: 'SEARCH', width: 64, height: 64 }}
  title="No Results Found"
  description="Try adjusting your search criteria"
/>
```

## With Actions

```tsx
<EmptyState
  icon={{ name: 'EMPTY_BOX', width: 80, height: 80 }}
  title="No Items"
  description="You haven't added any items yet"
  actions={[
    {
      text: 'Add Item',
      variant: 'primary',
      onPress: () => navigation.navigate('AddItem'),
    },
  ]}
/>
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `icon` | `IconProps` | Empty state icon |
| `title` | `string \| JSX.Element` | Title |
| `description` | `string \| JSX.Element` | Description |
| `actions` | `ButtonProps[]` | Action buttons |

## Examples

### No Search Results

```tsx
<EmptyState
  icon={{ name: 'SEARCH', width: 64, height: 64, variant: 'grey-800' }}
  title="No Results"
  description="We couldn't find any matches for your search"
  actions={[
    { text: 'Clear Search', variant: 'primary-outline', onPress: clearSearch },
  ]}
/>
```

### Empty List

```tsx
<EmptyState
  icon={{ name: 'LIST', width: 64, height: 64 }}
  title="No Items Yet"
  description="Start by adding your first item"
  actions={[
    { text: 'Add Item', variant: 'primary', onPress: addItem },
  ]}
/>
```

### No Internet

```tsx
<EmptyState
  icon={{ name: 'WIFI_OFF', width: 64, height: 64, variant: 'danger' }}
  title="No Connection"
  description="Please check your internet connection"
  actions={[
    { text: 'Retry', variant: 'primary', onPress: retry },
  ]}
/>
```
