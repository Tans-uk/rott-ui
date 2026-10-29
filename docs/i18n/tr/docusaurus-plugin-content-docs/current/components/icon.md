---
sidebar_position: 2
title: Icon
description: 117+ built-in ikon içeren SVG ikon component'i
---

# Icon

Icon component'i; özel renk, boyut ve stroke/fill modu desteğiyle 117+ built-in SVG ikona erişim sağlar.

:::info Ön Koşullar
Icon component'i SVG dosyalarını React component'leri olarak render eder. Bunun için `react-native-svg` ve `react-native-svg-transformer` kurulu olmalı, Metro config'iniz de SVG kurulumunu içermelidir. İkonlar render edilmiyorsa [Kurulum - SVG İkon Desteği](/docs/getting-started/installation#configure-svg-icon-support) bölümüne bakın.
:::

## Özellikler {#features}

- 🎨 117+ built-in ikon
- 📏 Özelleştirilebilir boyut
- 🖌️ Stroke ve fill modları
- 🎯 Theme renk variant'ları
- 🔧 Stroke kalınlığı kontrolü

## Temel Kullanım {#basic-usage}

```tsx
import {Icon} from '@tansuk/rott-ui'

;<Icon name='MENU' width={24} height={24} />
```

## İkon Boyutları {#icon-sizes}

```tsx
<Icon name="STAR" width={16} height={16} />
<Icon name="STAR" width={24} height={24} />
<Icon name="STAR" width={32} height={32} />
<Icon name="STAR" width={48} height={48} />
```

## Renk Variant'ları {#color-variants}

```tsx
<Icon name="HEART" width={24} height={24} variant="primary" />
<Icon name="HEART" width={24} height={24} variant="danger" />
<Icon name="HEART" width={24} height={24} variant="success" />
```

## Stroke ve Fill {#stroke-vs-fill}

```tsx
{
  /* Stroke modu (dış çizgi) */
}
;<Icon name='HEART' width={24} height={24} mode='stroke' />

{
  /* Fill modu (dolu) */
}
;<Icon name='HEART' width={24} height={24} mode='fill' />
```

## Mevcut İkonlar {#available-icons}

### Arayüz İkonları {#interface-icons}

- MENU, CLOSE, REMOVE, PLUS, MINUS
- ARROW_LEFT, ARROW_RIGHT, CHEVRON_LEFT, CHEVRON_RIGHT
- CHECK, CHECK_CIRCLE, REMOVE_CIRCLE
- SEARCH, FILTER, SETTINGS
- USER, NOTIFICATION, MAIL
- STAR, HEART, EYE
- LOCK, LOCATION, CALENDAR
- CAMERA, GALLERY, QR
- Ve 90+ ikon daha...

### Para Birimi İkonları {#currency-icons}

- MONEY_ADD, MONEY_REMOVE, MONEY_TRANSFER
- CREDIT_CARD, WALLET

## Props {#props}

| Prop          | Tip                  | Default      | Açıklama          |
| ------------- | -------------------- | ------------ | ----------------- |
| `name`        | `IconKeys`           | **Zorunlu**  | İkon adı          |
| `width`       | `number`             | `24`         | İkon genişliği    |
| `height`      | `number`             | `24`         | İkon yüksekliği   |
| `variant`     | `Variant`            | `'grey-900'` | Renk variant'ı    |
| `mode`        | `'stroke' \| 'fill'` | `'stroke'`   | Render modu       |
| `strokeWidth` | `number`             | `2`          | Stroke kalınlığı  |

## Örnekler {#examples}

### Navigation {#navigation}

```tsx
<Icon name="ARROW_LEFT" width={24} height={24} />
<Icon name="MENU" width={24} height={24} />
<Icon name="CLOSE" width={24} height={24} />
```

### Aksiyonlar {#actions}

```tsx
<Icon name="PLUS" width={20} height={20} variant="primary" />
<Icon name="REMOVE" width={20} height={20} variant="danger" />
<Icon name="CHECK" width={20} height={20} variant="success" />
```

### Butonlarda {#in-buttons}

```tsx
<Button variant='primary' leftIcon={{name: 'PLUS', width: 20, height: 20}}>
  Add Item
</Button>
```

### Header'larda {#in-headers}

```tsx
<Header
  title='Settings'
  leftIcon={[{name: 'ARROW_LEFT', onPress: () => navigation.goBack()}]}
  rightIcon={[{name: 'SEARCH', onPress: () => {}}]}
/>
```

### Özel İkonlar (Auto-Discovery) {#custom-icons-auto-discovery}

Metro config'inizde `withRottAssets` kullanıldığında, `src/assets/icons/svg/` içindeki SVG dosyaları dosya adlarıyla (uzantı olmadan) otomatik olarak kullanılabilir hâle gelir:

```tsx
// src/assets/icons/svg/my-logo.svg → name="my-logo"
<Icon name="my-logo" width={48} height={48} />
```

Ayrıntılar için [rott.config.ts - Asset Auto-Discovery](/docs/theming/rott-config#asset-auto-discovery) bölümüne bakın.
