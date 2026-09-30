---
sidebar_position: 5
title: Skeleton
description: Yükleme sırasında placeholder gösteren component
---

# Skeleton

Skeleton, içerik getirilirken animasyonlu yükleme placeholder'ları gösterir.

## Özellikler {#features}

- ✨ Shimmer animasyonu
- 📏 Özelleştirilebilir boyutlar
- 🎯 Border radius kontrolü
- 🔒 İsteğe bağlı olarak animasyonu kapatma

## Temel Kullanım {#basic-usage}

```tsx
import { Skeleton } from '@tansuk/rott-ui';

<Skeleton show={isLoading} width={200} height={20} />
```

## Özel Boyutlar {#custom-dimensions}

```tsx
<Skeleton show={true} width={300} height={100} radius={12} />
```

## Animasyonsuz {#no-animation}

```tsx
<Skeleton show={true} width={200} height={20} noAnimation />
```

## Props {#props}

| Prop | Tip | Default | Açıklama |
|------|------|---------|-------------|
| `show` | `boolean` | **Zorunlu** | Skeleton'ı gösterir |
| `width` | `number` | **Zorunlu** | Genişlik |
| `height` | `number` | **Zorunlu** | Yükseklik |
| `radius` | `number` | `4` | Border radius |
| `noAnimation` | `boolean` | `false` | Animasyonu kapatır |

## Örnekler {#examples}

### Yükleme Kartı {#loading-card}

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

### Yükleme Listesi {#loading-list}

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

### Item Component'i ile {#with-item-component}

```tsx
<Item skeletonShow={isLoading} skeletonStyle={{ width: 200, height: 100 }}>
  <Label text="Actual Content" />
</Item>
```
