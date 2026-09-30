---
sidebar_position: 5
title: Spacing
description: Responsive spacing ve layout sistemi
---

# Spacing

Rott UI, cihaz boyutlarına göre otomatik olarak ölçeklenen responsive bir spacing sistemi sunar.

## Referans Cihaz {#reference-device}

Tüm spacing değerleri bir referans cihaza göre hesaplanır:

```typescript
referenceDevice: {
  width: 390,   // iPhone 12/13 genişliği
  height: 844,  // iPhone 12/13 yüksekliği
}
```

Spacing değerleri, tutarlı görsel oranları korumak için farklı cihazlarda otomatik olarak ölçeklenir.

## Ortak UI Prop'ları {#common-ui-props}

Tüm component'ler ortak spacing prop'larını destekler:

### Margin'ler {#margins}

```tsx
<Button marginTop={16}>Top Margin</Button>
<Button marginBottom={24}>Bottom Margin</Button>
<Button marginLeft={8}>Left Margin</Button>
<Button marginRight={8}>Right Margin</Button>
<Button marginHorizontal={16}>Horizontal Margin</Button>
<Button marginVertical={24}>Vertical Margin</Button>
<Button margin={16}>All Sides</Button>
```

### Padding {#padding}

```tsx
<Content paddingTop={16}>Top Padding</Content>
<Content paddingBottom={24}>Bottom Padding</Content>
<Content paddingLeft={8}>Left Padding</Content>
<Content paddingRight={8}>Right Padding</Content>
<Content paddingHorizontal={16}>Horizontal Padding</Content>
<Content paddingVertical={24}>Vertical Padding</Content>
<Content padding={16}>All Sides</Content>
```

## Spacing Ölçeği {#spacing-scale}

Tutarlılık için önerilen spacing değerleri:

| Değer | Kullanım |
|-------|-------|
| 4 | Çok küçük spacing |
| 8 | Küçük spacing |
| 12 | Orta-küçük spacing |
| 16 | Orta spacing (default) |
| 24 | Büyük spacing |
| 32 | Çok büyük spacing |
| 48 | Bölüm spacing'i |
| 64 | Ana bölüm spacing'i |

## Responsive Utility'ler {#responsive-utilities}

### Yüzde Bazlı Boyutlandırma {#percentage-based-sizing}

```tsx
import { setWidth, setHeight } from '@tansuk/rott-ui';

<Item width={setWidth(50)}>50% width</Item>
<Item height={setHeight(30)}>30% height</Item>
```

### Piksel Normalizasyonu {#pixel-normalization}

```tsx
import { px, heightPixel } from '@tansuk/rott-ui';

<Item width={px(200)}>Normalized width</Item>
<Item height={heightPixel(100)}>Normalized height</Item>
```

## Layout Prop'ları {#layout-props}

### Flex {#flex}

```tsx
<Content flex={1}>Takes available space</Content>
<Item flex={2}>Takes 2x space</Item>
```

### Boyutlar {#dimensions}

```tsx
<Item width={200} height={100}>Fixed size</Item>
<Item width="100%" height={50}>Full width</Item>
```

### Hizalama {#alignment}

```tsx
<Content alignItemsCenter>Center items</Content>
<Content justifyContentCenter>Center content</Content>
<Content justifyContentSpaceBetween>Space between</Content>
```

## Spacing Pattern'leri {#spacing-patterns}

### Form Spacing'i {#form-spacing}

```tsx
<Content paddingHorizontal={24}>
  <Input name="email" marginBottom={16} />
  <Input name="password" marginBottom={24} />
  <Button size="full" marginTop={8}>Submit</Button>
</Content>
```

### Kart Spacing'i {#card-spacing}

```tsx
<Item 
  padding={16} 
  marginHorizontal={16} 
  marginVertical={8}
  borderRadius={12}
>
  <Label text="Card Title" marginBottom={8} />
  <Label text="Card content" fontSize="sm" />
</Item>
```

### Liste Öğesi Spacing'i {#list-item-spacing}

```tsx
<Item 
  paddingHorizontal={16} 
  paddingVertical={12}
  marginBottom={1}
>
  <Label text="List Item" />
</Item>
```

## Border Radius {#border-radius}

```tsx
<Item borderRadius={4}>Small radius</Item>
<Item borderRadius={8}>Medium radius</Item>
<Item borderRadius={12}>Large radius</Item>
<Item borderRadius={24}>Extra large radius</Item>
<Item borderRadius={999}>Pill shape</Item>
```

## En İyi Uygulamalar {#best-practices}

### Yapılması Gerekenler ✅ {#dos-}

- Spacing için 4'ün veya 8'in katlarını kullanın
- Uygulamanızın genelinde spacing konusunda tutarlı olun
- Öngörülebilir layout'lar için spacing ölçeğini kullanın
- Farklı ekran boyutlarında test edin

### Yapılmaması Gerekenler ❌ {#donts-}

- Rastgele spacing değerleri kullanmayın
- Farklı spacing sistemlerini karıştırmayın
- Responsive gereksinimleri göz ardı etmeyin
- Negatif margin'leri aşırı kullanmayın

## Erişilebilirlik {#accessibility}

- Minimum dokunma alanı: 44x44 point
- Etkileşimli öğeler arasında yeterli spacing
- Spacing ile net görsel gruplama
- Öngörülebilir navigation için tutarlı spacing

## Sonraki Adımlar {#next-steps}

- **[Renkler](/docs/theming/colors)** - Renk sistemi
- **[Tipografi](/docs/theming/typography)** - Font config'i
- **[rott.config.ts](/docs/theming/rott-config)** - Özel config
