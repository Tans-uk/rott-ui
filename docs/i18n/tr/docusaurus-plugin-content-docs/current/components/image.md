---
sidebar_position: 3
title: Image
description: Görsel gösterme component'i
---

# Image

Görselleri theme entegrasyonuyla göstermek için kullanılan Image component'i.

## Temel Kullanım {#basic-usage}

```tsx
import { Image } from '@tansuk/rott-ui';

<Image 
  name="LOGO"
  width={100}
  height={100}
/>
```

## Source ile {#with-source}

```tsx
<Image 
  source={require('./assets/photo.png')}
  width={200}
  height={200}
  resizeMode="cover"
/>
```

## Props {#props}

| Prop | Tip | Açıklama |
|------|------|-------------|
| `name` | `ImageTypes` | Theme'deki görsel adı |
| `source` | `ImageSourcePropType` | Görsel kaynağı |
| `width` | `number` | Görsel genişliği |
| `height` | `number` | Görsel yüksekliği |
| `resizeMode` | `'cover' \| 'contain' \| 'stretch'` | Yeniden boyutlandırma modu |

Bunlara ek olarak tüm React Native Image prop'ları desteklenir.

## Örnekler {#examples}

### Logo {#logo}

```tsx
<Image name="COMPANY_LOGO" width={120} height={40} />
```

### Avatar {#avatar}

```tsx
<Image 
  source={{ uri: user.avatarUrl }}
  width={64}
  height={64}
  borderRadius={32}
/>
```

### Ürün Görseli {#product-image}

```tsx
<Image 
  source={{ uri: product.imageUrl }}
  width="100%"
  height={200}
  resizeMode="cover"
  borderRadius={12}
/>
```

### Özel Görseller (Auto-Discovery) {#custom-images-auto-discovery}

Metro config'inizde `withRottAssets` kullanıldığında, `src/assets/images/` içindeki görseller dosya adlarıyla (uzantı olmadan) otomatik olarak kullanılabilir hâle gelir:

```tsx
// src/assets/images/cindoruk.png → name="cindoruk"
<Image name="cindoruk" width={100} height={100} />
```

Ayrıntılar için [rott.config.ts - Asset Auto-Discovery](/docs/theming/rott-config#asset-auto-discovery) bölümüne bakın.
