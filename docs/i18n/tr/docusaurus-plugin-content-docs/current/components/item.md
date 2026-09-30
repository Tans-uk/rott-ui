---
sidebar_position: 5
title: Item
description: Esnek layout container'ı
---

# Item

Item; built-in skeleton desteği ve ortak UI prop'larıyla gelen esnek bir layout container component'idir.

## Özellikler {#features}

- 📏 Flex layout
- 🎨 Style desteği
- 💀 Built-in skeleton
- 🎯 Ortak UI prop'ları

## Temel Kullanım {#basic-usage}

```tsx
import { Item } from '@tansuk/rott-ui';

<Item>
  <Label text="Content" />
</Item>
```

## Yatay Layout {#row-layout}

```tsx
<Item row alignItemsCenter>
  <Icon name="STAR" width={20} height={20} />
  <Label text="Rating" marginLeft={8} />
</Item>
```

## Flex ile {#with-flex}

```tsx
<Item flex={1} justifyContentCenter alignItemsCenter>
  <Label text="Centered Content" />
</Item>
```

## Skeleton ile {#with-skeleton}

```tsx
<Item 
  skeletonShow={isLoading}
  skeletonStyle={{ width: 200, height: 100 }}
>
  <Label text="Content" />
</Item>
```

## Props {#props}

| Prop | Tip | Default | Açıklama |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | İçerik |
| `row` | `boolean` | `false` | Yatay layout |
| `flexWrap` | `'wrap' \| 'nowrap'` | - | Flex wrap |
| `skeletonShow` | `boolean` | `false` | Skeleton'ı gösterir |
| `skeletonStyle` | `SkeletonStyleProps` | - | Skeleton style'ı |

Bunlara ek olarak tüm `CommonUiProps` desteklenir.

## Örnekler {#examples}

### Kart {#card}

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

### Liste Öğesi {#list-item}

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

### Grid Öğesi {#grid-item}

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
