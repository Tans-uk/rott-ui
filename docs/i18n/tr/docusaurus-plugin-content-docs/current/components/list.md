---
sidebar_position: 1
title: List
description: FlashList ile yüksek performanslı liste
---

# List

List, Shopify'ın FlashList'ini kullanan yüksek performanslı, virtualized bir liste sağlar.

## Özellikler {#features}

- ⚡ FlashList ile yüksek performans
- 🔄 Pull-to-refresh
- 📏 Ayırıcılar
- 💀 Skeleton ile yükleme state'leri
- 🎯 Empty state desteği
- 👆 Kaydırılabilir öğeler

## Temel Kullanım {#basic-usage}

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

## Ayırıcılarla {#with-separators}

```tsx
<List
  data={items}
  renderItem={renderItem}
  renderSeparator
  separatorVariant="grey-200"
  estimatedItemSize={50}
/>
```

## Empty State ile {#with-empty-state}

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

## Yükleme State'i ile {#with-loading}

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

## Props {#props}

| Prop | Tip | Açıklama |
|------|------|-------------|
| `data` | `T[]` | Liste verisi |
| `renderItem` | `(info) => ReactElement` | Öğe renderer'ı |
| `estimatedItemSize` | `number` | **Zorunlu** - Tahmini öğe yüksekliği |
| `renderSeparator` | `boolean` | Ayırıcıları gösterir |
| `separatorVariant` | `Variant` | Ayırıcı rengi |
| `emptyState` | `EmptyStateProps \| ReactNode` | Empty state |
| `isLoading` | `boolean` | Yükleme state'i |
| `listSkeletonItem` | `ReactNode` | Skeleton öğesi |
| `itemsToShow` | `number` | Skeleton öğe sayısı |

Bunlara ek olarak tüm FlashList prop'ları desteklenir.

## Örnekler {#examples}

### Basit Liste {#simple-list}

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

### Pull-to-Refresh ile {#with-pull-to-refresh}

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

### Yükleme Skeleton'ı ile {#with-loading-skeleton}

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

### Kaydırılabilir Liste {#swipeable-list}

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
