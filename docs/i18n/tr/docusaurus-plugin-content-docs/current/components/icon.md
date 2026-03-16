---
sidebar_position: 2
title: İkon
description: 117+ yerleşik SVG ikon bileşeni
---

# İkon

İkon bileşeni, özel renkler, boyutlar ve stroke/fill modları desteği ile 117+ yerleşik SVG ikonuna erişim sağlar.

:::info Önkoşullar
İkon bileşeni SVG dosyalarını React bileşenleri olarak render eder. Bu, `react-native-svg` ve `react-native-svg-transformer` paketlerinin kurulu olmasını ve Metro yapılandırmanızın SVG kurulumunu içermesini gerektirir. İkonlar görünmüyorsa [Kurulum - SVG İkon Desteği](/docs/getting-started/installation#configure-svg-icon-support) bölümüne bakın.
:::

## Özellikler

- 🎨 117+ yerleşik ikon
- 📏 Özelleştirilebilir boyut
- 🖌️ Stroke ve fill modları
- 🎯 Tema renk varyantları
- 🔧 Stroke genişliği kontrolü

## Temel Kullanım

```tsx
import {Icon} from '@tansuk/rott-ui'

;<Icon name='MENU' width={24} height={24} />
```

## İkon Boyutları

```tsx
<Icon name="STAR" width={16} height={16} />
<Icon name="STAR" width={24} height={24} />
<Icon name="STAR" width={32} height={32} />
<Icon name="STAR" width={48} height={48} />
```

## Renk Varyantları

```tsx
<Icon name="HEART" width={24} height={24} variant="primary" />
<Icon name="HEART" width={24} height={24} variant="danger" />
<Icon name="HEART" width={24} height={24} variant="success" />
```

## Stroke vs Fill

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

## Mevcut İkonlar

### Arayüz İkonları

- MENU, CLOSE, REMOVE, PLUS, MINUS
- ARROW_LEFT, ARROW_RIGHT, CHEVRON_LEFT, CHEVRON_RIGHT
- CHECK, CHECK_CIRCLE, REMOVE_CIRCLE
- SEARCH, FILTER, SETTINGS
- USER, NOTIFICATION, MAIL
- STAR, HEART, EYE
- LOCK, LOCATION, CALENDAR
- CAMERA, GALLERY, QR
- Ve 90+ fazlası...

### Para Birimi İkonları

- MONEY_ADD, MONEY_REMOVE, MONEY_TRANSFER
- CREDIT_CARD, WALLET

## Props

| Prop          | Type                 | Default      | Açıklama       |
| ------------- | -------------------- | ------------ | -------------- |
| `name`        | `IconKeys`           | **Required** | İkon adı       |
| `width`       | `number`             | `24`         | İkon genişliği |
| `height`      | `number`             | `24`         | İkon yüksekliği|
| `variant`     | `Variant`            | `'grey-900'` | Renk varyantı  |
| `mode`        | `'stroke' \| 'fill'` | `'stroke'`   | Render modu    |
| `strokeWidth` | `number`             | `2`          | Stroke genişliği |

## Örnekler

### Navigasyon

```tsx
<Icon name="ARROW_LEFT" width={24} height={24} />
<Icon name="MENU" width={24} height={24} />
<Icon name="CLOSE" width={24} height={24} />
```

### Eylemler

```tsx
<Icon name="PLUS" width={20} height={20} variant="primary" />
<Icon name="REMOVE" width={20} height={20} variant="danger" />
<Icon name="CHECK" width={20} height={20} variant="success" />
```

### Butonlarda

```tsx
<Button variant='primary' leftIcon={{name: 'PLUS', width: 20, height: 20}}>
  Add Item
</Button>
```

### Başlıklarda

```tsx
<Header
  title='Settings'
  leftIcon={[{name: 'ARROW_LEFT', onPress: () => navigation.goBack()}]}
  rightIcon={[{name: 'SEARCH', onPress: () => {}}]}
/>
```

### Özel İkonlar (Otomatik Keşif)

Metro yapılandırmanızda `withRottAssets` ile `src/assets/icons/svg/` klasöründeki SVG dosyaları dosya adıyla (uzantısız) otomatik olarak kullanılabilir:

```tsx
// src/assets/icons/svg/my-logo.svg → name="my-logo"
<Icon name="my-logo" width={48} height={48} />
```

Bkz. [rott.config.ts - Varlık Otomatik Keşfi](/docs/theming/rott-config#asset-auto-discovery).
