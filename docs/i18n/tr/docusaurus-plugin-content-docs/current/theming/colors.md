---
sidebar_position: 2
title: Renkler
description: Kapsamlı renk sistemi ve variant'lar
---

# Renkler

Rott UI, semantik adlandırma ve özel renk desteğiyle kapsamlı bir renk sistemi sunar.

## Default Renk Paleti {#default-color-palette}

### Marka Renkleri {#brand-colors}

```tsx
<Button variant="primary">Primary</Button>      // #00a9ce (Camgöbeği)
<Button variant="secondary">Secondary</Button>  // #ffc72c (Sarı)
```

### Semantik Renkler {#semantic-colors}

```tsx
<Button variant="danger">Danger</Button>    // #f65353 (Kırmızı)
<Button variant="success">Success</Button>  // #3fb618 (Yeşil)
<Button variant="warning">Warning</Button>  // #ff7518 (Turuncu)
<Button variant="info">Info</Button>        // #3fb6d2 (Mavi)
<Button variant="mint">Mint</Button>        // #20966e (Nane yeşili)
```

### Nötr Renkler {#neutral-colors}

```tsx
<Button variant="grey-900">Dark Grey</Button>   // #223f46
<Button variant="grey-800">Grey</Button>        // #3d585e
<Button variant="grey-200">Light Grey</Button>  // #a1adaf
<Button variant="grey-100">Lightest</Button>    // #eaeff0
<Button variant="white">White</Button>          // #ffffff
<Button variant="black">Black</Button>          // #111111
```

### Outline Variant'ları {#outline-variants}

Tüm renklerin şeffaf arka planlı outline variant'ları vardır:

```tsx
<Button variant="primary-outline">Primary Outline</Button>
<Button variant="secondary-outline">Secondary Outline</Button>
<Button variant="danger-outline">Danger Outline</Button>
<Button variant="success-outline">Success Outline</Button>
```

### Alpha Variant'ları {#alpha-variants}

Overlay'ler için yarı saydam renkler:

```tsx
<Item backgroundColor="neutral-alpha-900">90% opacity</Item>
<Item backgroundColor="neutral-alpha-700">75% opacity</Item>
<Item backgroundColor="neutral-alpha-400">40% opacity</Item>
<Item backgroundColor="neutral-alpha-200">15% opacity</Item>
<Item backgroundColor="neutral-alpha-100">10% opacity</Item>
```

## Özel Renkler {#custom-colors}

Özel renkleri `rott.config.ts` üzerinden ekleyin:

```typescript title="rott.config.ts"
import { defineRottConfig } from '@tansuk/rott-ui';

export const config = defineRottConfig({
  colors: {
    // Özel renkleriniz
    brandPrimary: '#123456',
    brandSecondary: '#654321',
    accentPurple: '#9b59b6',
    accentOrange: '#e67e22',
    
    // Koyu mod variant'ları
    darkBackground: '#1a1a1a',
    darkSurface: '#2a2a2a',
    
    // Component'e özel
    buttonPrimary: '#00a9ce',
    buttonSecondary: '#ffc72c',
    inputBorder: '#e0e0e0',
    inputFocus: '#00a9ce',
  },
} as const);
```

Ardından autocomplete ile kullanın:

```tsx
<Button variant="brandPrimary">Brand Button</Button>
<Label variant="accentPurple">Purple Text</Label>
<Item backgroundColor="darkBackground">Dark Item</Item>
```

## Component'lerde Renk Kullanımı {#color-usage-in-components}

### Button {#button}

```tsx
<Button variant="primary">Primary</Button>
<Button variant="danger">Delete</Button>
<Button variant="success">Confirm</Button>
<Button backgroundColor="custom" color="white">Custom</Button>
```

### Label {#label}

```tsx
<Label text="Title" variant="grey-900" />
<Label text="Error" variant="danger" />
<Label text="Success" variant="success" />
```

### Icon {#icon}

```tsx
<Icon name="STAR" variant="warning" />
<Icon name="CHECK" variant="success" />
<Icon name="CLOSE" variant="danger" />
```

### Alert {#alert}

```tsx
<Alert variant="danger" text="Error message" />
<Alert variant="success" text="Success message" />
<Alert variant="warning" text="Warning message" />
<Alert variant="info" text="Info message" />
```

## Renk Utility'leri {#color-utilities}

### colorFromVariant {#colorfromvariant}

Variant adından renk değerini alın:

```tsx
import { colorFromVariant } from '@tansuk/rott-ui';

const primaryColor = colorFromVariant('primary'); // '#00a9ce'
const customColor = colorFromVariant('brandPrimary'); // Özel renginiz
```

### textcolorFromVariant {#textcolorfromvariant}

Bir variant için uygun metin rengini alın:

```tsx
import { textcolorFromVariant } from '@tansuk/rott-ui';

const textColor = textcolorFromVariant('primary'); // Arka plana göre beyaz veya siyah döndürür
```

## Erişilebilirlik {#accessibility}

Erişilebilirlik için yeterli renk kontrastı sağlayın:

- **Normal metin**: 4.5:1 kontrast oranı
- **Büyük metin**: 3:1 kontrast oranı
- **Etkileşimli öğeler**: 3:1 kontrast oranı

Rott UI'ın default renkleri WCAG AA standartlarını karşılayacak şekilde tasarlanmıştır.

## En İyi Uygulamalar {#best-practices}

### Yapılması Gerekenler ✅ {#dos-}

- Semantik renkler kullanın (hatalar için danger, onaylar için success)
- Marka renklerini rott.config.ts içinde tanımlayın
- Renkleri hem açık hem koyu modda test edin
- Erişilebilirlik için yeterli kontrast sağlayın

### Yapılmaması Gerekenler ❌ {#donts-}

- Çok fazla özel renk kullanmayın (tutarlı kalın)
- Component'lerde hex değerlerini hardcode etmeyin
- Renk körü kullanıcılarla test etmeyi unutmayın
- Rengi tek gösterge olarak kullanmayın (ikon/metin ekleyin)

## Sonraki Adımlar {#next-steps}

- **[Tipografi](/docs/theming/typography)** - Font config'i
- **[Spacing](/docs/theming/spacing)** - Spacing sistemi
- **[rott.config.ts](/docs/theming/rott-config)** - Kapsamlı config rehberi
