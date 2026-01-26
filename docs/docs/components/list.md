---
sidebar_position: 1
title: List
description: High-performance list with FlashList
---

# List

List provides a high-performance virtualized list using Shopify's FlashList.

## Features

- ⚡ High performance with FlashList
- 🔄 Pull-to-refresh
- 📏 Separators
- 💀 Loading states with skeleton
- 🎯 Empty state support
- 👆 Swipeable items

## Basic Usage

```tsx
import { List } from '@tansuk/rott-ui';

<List
  data={items}
  renderItem={({ item }) => (
    <Item paddingHorizontal={16} paddingVertical={12}>
      <Label text={item.title} />
    </Item>
  )}
  estimatedItemSize={50}
/>
```

## With Separators

```tsx
<List
  data={items}
  renderItem={renderItem}
  renderSeparator
  separatorVariant="grey-200"
  estimatedItemSize={50}
/>
```

## With Empty State

```tsx
<List
  data={items}
  renderItem={renderItem}
  emptyState={{
    icon: { name: 'SEARCH', width: 64, height: 64 },
    title: 'No Items',
    description: 'No items found',
  }}
  estimatedItemSize={50}
/>
```

## With Loading

```tsx
<List
  data={items}
  renderItem={renderItem}
  isLoading={isLoading}
  listSkeletonItem={
    <Item padding={16}>
      <Skeleton show width="100%" height={60} />
    </Item>
  }
  itemsToShow={5}
  estimatedItemSize={76}
/>
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | `T[]` | List data |
| `renderItem` | `(info) => ReactElement` | Item renderer |
| `estimatedItemSize` | `number` | **Required** - Estimated item height |
| `renderSeparator` | `boolean` | Show separators |
| `separatorVariant` | `Variant` | Separator color |
| `emptyState` | `EmptyStateProps \| ReactNode` | Empty state |
| `isLoading` | `boolean` | Loading state |
| `listSkeletonItem` | `ReactNode` | Skeleton item |
| `itemsToShow` | `number` | Skeleton items count |

Plus all FlashList props.

## Examples

### Simple List

```tsx
const items = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
];

<List
  data={items}
  renderItem={({ item }) => (
    <CommonItem
      title={item.title}
      rightIcon="CHEVRON_RIGHT"
      onPress={() => openItem(item)}
    />
  )}
  renderSeparator
  estimatedItemSize={60}
/>
```

### With Pull-to-Refresh

```tsx
function ProductList() {
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([]);

  const onRefresh = async () => {
    setRefreshing(true);
    const data = await fetchProducts();
    setProducts(data);
    setRefreshing(false);
  };

  return (
    <List
      data={products}
      renderItem={({ item }) => <ProductCard product={item} />}
      refreshing={refreshing}
      onRefresh={onRefresh}
      estimatedItemSize={200}
    />
  );
}
```

### With Loading Skeleton

```tsx
<List
  data={items}
  renderItem={({ item }) => (
    <Item padding={16}>
      <Label text={item.title} fontSize="lg" marginBottom={8} />
      <Label text={item.description} fontSize="sm" variant="grey-800" />
    </Item>
  )}
  isLoading={isLoading}
  listSkeletonItem={
    <Item padding={16}>
      <Skeleton show width="80%" height={20} marginBottom={8} />
      <Skeleton show width="60%" height={16} />
    </Item>
  }
  itemsToShow={5}
  estimatedItemSize={76}
/>
```

### Swipeable List

```tsx
<List
  data={items}
  renderItem={({ item }) => (
    <SwipeableItem
      onSwipeLeft={() => deleteItem(item.id)}
      onSwipeRight={() => favoriteItem(item.id)}
    >
      <CommonItem title={item.title} />
    </SwipeableItem>
  )}
  estimatedItemSize={60}
/>
```
