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
  skeletonCount={5}
  estimatedItemSize={76}
/>
```

`skeletonCount`, `isLoading` iken kaç skeleton satırı render edileceğini belirler.
Verilmezse sayı `estimatedItemSize`'a (burada 76 satır), o da yoksa 1'e düşer; bu yüzden
`estimatedItemSize` verdiğiniz her yerde `skeletonCount`'u da verin. Yüklenen bir liste
her zaman en az bir satır çizer; bu yüzden yüklenirken asla empty state göstermez.

## Header ve Footer ile {#with-header-and-footer}

```tsx
<List
  data={items}
  renderItem={renderItem}
  ListHeaderComponent={<Label text="Bugün" />}
  ListFooterComponent={<Button onPress={loadMore}>Daha fazla yükle</Button>}
  headerSeparator
  footerSeparator
/>
```

`headerSeparator` ve `footerSeparator`, header'ınız ya da footer'ınız ile öğeler arasına bir
ayırıcı çizer; sıra header, ayırıcı, öğeler, ayırıcı, footer olur. Header ya da footer
yoksa ayırıcıyı tek başına listenin en üstüne ya da en altına çizerler.

## FlashList 1.x ve 2.x {#flashlist-1x-and-2x}

`List`, `@shopify/flash-list` 1.x (1.8.0'dan itibaren) ve 2.x ile çalışır. FlashList 2.x
yalnızca New Architecture'da çalışır; eski mimarideki bir uygulama 1.x'te kalır.

- `estimatedItemSize` ikisinde de bir `List` prop'udur. FlashList 1.x onu layout için
  kullanır; 2.x öğeleri kendisi ölçer ve onu yok sayar.
- FlashList 2.x'in kaldırdığı diğer prop'lar (`estimatedListSize`, `disableAutoLayout` vb.)
  yalnızca uygulamanızda 1.x kuruluysa tip kontrolünden geçer.

## Props {#props}

| Prop | Tip | Açıklama |
|------|------|-------------|
| `data` | `T[]` | Liste verisi |
| `renderItem` | `(info) => ReactElement` | Öğe renderer'ı |
| `estimatedItemSize` | `number` | Tahmini öğe yüksekliği (yatayda genişliği). FlashList 1.x layout için kullanır, 2.x yok sayar; `itemsToShow` ile listenin boyunu da belirler. Default `50` |
| `renderSeparator` | `boolean` | Öğeler arasında ayırıcı gösterir |
| `separatorVariant` | `Variant` | Ayırıcı rengi |
| `headerSeparator` | `boolean` | Header ile öğeler arasında, header yoksa en üstte ayırıcı |
| `footerSeparator` | `boolean` | Öğeler ile footer arasında, footer yoksa en altta ayırıcı |
| `ListHeaderComponent` | `ComponentType \| ReactElement` | Öğelerin üstünde render edilir; render'lar arasında state'ini korur |
| `ListFooterComponent` | `ComponentType \| ReactElement` | Öğelerin altında render edilir |
| `emptyState` | `EmptyStateProps \| ReactNode` | Empty state |
| `isLoading` | `boolean` | Yükleme state'i |
| `listSkeletonItem` | `ReactNode` | Skeleton öğesi |
| `skeletonCount` | `number` | `isLoading` iken skeleton satır sayısı, en az `1`. `estimatedItemSize`'a, o da yoksa `1`'e düşer |
| `itemsToShow` | `number` | Listenin boyunu bu kadar öğeye sabitler (`itemsToShow × estimatedItemSize`) |

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
  skeletonCount={5}
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
