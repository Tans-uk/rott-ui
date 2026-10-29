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
  skeletonCount={5}
  estimatedItemSize={76}
/>
```

`skeletonCount` sets how many skeleton rows render while `isLoading`. Without it the
count falls back to `estimatedItemSize` (76 rows here), then to 1, so set it whenever
you pass `estimatedItemSize`.

## With Header and Footer

```tsx
<List
  data={items}
  renderItem={renderItem}
  ListHeaderComponent={<Label text="Today" />}
  ListFooterComponent={<Button onPress={loadMore}>Load more</Button>}
  headerSeparator
  footerSeparator
/>
```

`headerSeparator` and `footerSeparator` draw a separator between your header or footer
and the items, so the order is header, separator, items, separator, footer. Without a
header or footer, they draw the separator alone at the top or bottom of the list.

## FlashList 1.x and 2.x

`List` works with `@shopify/flash-list` 1.x (from 1.8.0) and 2.x. FlashList 2.x runs
only on the New Architecture, so an app on the old architecture stays on 1.x.

- `estimatedItemSize` is a `List` prop in both. FlashList 1.x uses it for layout;
  2.x measures items itself and ignores it.
- Other props that FlashList 2.x removed (`estimatedListSize`, `disableAutoLayout` and
  the like) type-check only when your app has 1.x installed.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | `T[]` | List data |
| `renderItem` | `(info) => ReactElement` | Item renderer |
| `estimatedItemSize` | `number` | Estimated item height (width when horizontal). Used for layout by FlashList 1.x, ignored by 2.x; also sizes the list with `itemsToShow`. Defaults to `50` |
| `renderSeparator` | `boolean` | Show separators between items |
| `separatorVariant` | `Variant` | Separator color |
| `headerSeparator` | `boolean` | Separator between the header and the items, or at the top without a header |
| `footerSeparator` | `boolean` | Separator between the items and the footer, or at the bottom without a footer |
| `ListHeaderComponent` | `ComponentType \| ReactElement` | Rendered above the items; keeps its state across renders |
| `ListFooterComponent` | `ComponentType \| ReactElement` | Rendered below the items |
| `emptyState` | `EmptyStateProps \| ReactNode` | Empty state |
| `isLoading` | `boolean` | Loading state |
| `listSkeletonItem` | `ReactNode` | Skeleton item |
| `skeletonCount` | `number` | Skeleton rows while `isLoading`. Falls back to `estimatedItemSize`, then `1` |
| `itemsToShow` | `number` | Fixes the list height to this many items (`itemsToShow × estimatedItemSize`) |

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
  skeletonCount={5}
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
