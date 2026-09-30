---
sidebar_position: 3
title: Tipografi
description: Font boyutları, aileleri ve kalınlıkları
---

# Tipografi

Rott UI; önceden tanımlı font boyutları, aileleri ve kalınlıklarıyla responsive bir tipografi sistemi sunar.

## Font Boyutları {#font-sizes}

### Önceden Tanımlı Boyutlar {#predefined-sizes}

```tsx
<Label text="Extra Small" fontSize="xs" />   // 10px
<Label text="Small" fontSize="sm" />          // 12px
<Label text="Medium" fontSize="md" />         // 14px (default)
<Label text="Large" fontSize="lg" />          // 16px
<Label text="Extra Large" fontSize="xl" />    // 18px
<Label text="2X Large" fontSize="xxl" />      // 24px
<Label text="3X Large" fontSize="xxxl" />     // 36px
```

### Responsive Boyutlandırma {#responsive-sizing}

Font boyutları küçük ekranlar (< 380px genişlik) için otomatik olarak ayarlanır:

| Boyut | Normal | Küçük Ekran |
|------|--------|--------------|
| xs | 10px | 8px |
| sm | 12px | 10px |
| md | 14px | 12px |
| lg | 16px | 14px |
| xl | 18px | 16px |
| xxl | 24px | 22px |
| xxxl | 36px | 34px |

### Config'de tanımlı font-size token'ları {#configured-font-size-tokens}

`fontSize`, herhangi bir sayısal değerin yanı sıra [`rott.config.ts`](/docs/theming/rott-config) dosyanızdaki `fontSizes` map'inde tanımlı her token'ı da kabul eder (örneğin `2xl`, `3xl` veya kendi özel key'leriniz). Orada tanımladığınız token'lar runtime'da resolve edilir; `fontSizes` içinde built-in bir key'i (örn. `md`) override etmek, onu `Label`'ın kullanıldığı her yerde günceller. Built-in key'ler, küçük ekranlara özgü responsive boyutlandırmalarını korur.

### Özel Font Boyutları {#custom-font-sizes}

Component seviyesinde override edin:

```tsx
<Label text="Custom Size" style={{ fontSize: 20 }} />
```

## Font Aileleri {#font-families}

### Default Fontlar {#default-fonts}

Rott UI default olarak Markpro font ailesini kullanır:

- **MarkproRegular** - Normal kalınlık
- **MarkproBold** - Kalın
- **MarkproMedium** - Orta kalınlık
- **MarkproLight** - İnce

### Font Ailelerini Kullanma {#using-font-families}

```tsx
<Label text="Regular" fontFamily="MarkproRegular" />
<Label text="Bold" fontFamily="MarkproBold" />
<Label text="Medium" fontFamily="MarkproMedium" />
```

### Özel Fontlar {#custom-fonts}

Özel fontları `rott.config.ts` üzerinden ekleyin:

```typescript title="rott.config.ts"
export const config = defineRottConfig({
  fontFamilies: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    bold: 'Inter-Bold',
    light: 'Inter-Light',
  },
} as const);
```

## Font Kalınlıkları {#font-weights}

### Font Kalınlığını Kullanma {#using-font-weight}

```tsx
<Label text="Regular" fontWeight="regular" />
<Label text="Medium" fontWeight="medium" />
<Label text="Bold" fontWeight="bold" />
<Label text="Light" fontWeight="light" />
```

### Font Kalınlığı Eşlemesi {#font-weight-mapping}

Font kalınlıkları otomatik olarak font ailelerine eşlenir:

```typescript
fontWeights: {
  regular: 'MarkproRegular',
  medium: 'MarkproMedium',
  bold: 'MarkproBold',
  light: 'MarkproLight',
}
```

## Tipografi Ölçeği {#typography-scale}

### Başlıklar {#headings}

```tsx
<Label text="H1 Heading" fontSize="xxxl" fontWeight="bold" />
<Label text="H2 Heading" fontSize="xxl" fontWeight="bold" />
<Label text="H3 Heading" fontSize="xl" fontWeight="bold" />
<Label text="H4 Heading" fontSize="lg" fontWeight="bold" />
```

### Gövde Metni {#body-text}

```tsx
<Label text="Body Large" fontSize="lg" />
<Label text="Body Medium" fontSize="md" />
<Label text="Body Small" fontSize="sm" />
```

### Açıklama Metinleri {#captions}

```tsx
<Label text="Caption" fontSize="xs" variant="grey-800" />
```

## Harf Aralığı {#letter-spacing}

Özel harf aralığı ekleyin:

```tsx
<Label text="Tight" letterSpacing={-0.5} />
<Label text="Normal" letterSpacing={0} />
<Label text="Wide" letterSpacing={2} />
```

## Metin Style'ları {#text-styles}

### Vurgu {#emphasis}

```tsx
<Label text="Bold Text" fontWeight="bold" />
<Label text="Medium Text" fontWeight="medium" />
<Label text="Light Text" fontWeight="light" />
```

### Hizalama {#alignment}

```tsx
<Label text="Left" textAlign="left" />
<Label text="Center" textCenter />
<Label text="Right" textAlign="right" />
```

### Kırpma {#truncation}

```tsx
<Label 
  text="Long text that will be truncated with ellipsis"
  numberOfLines={1}
/>
```

## Component'lerde Tipografi {#typography-in-components}

### Button {#button}

```tsx
<Button fontSize="lg" fontWeight="bold">
  Large Bold Button
</Button>
```

### Input {#input}

```tsx
<Input
  name="email"
  label={{
    text: "Email",
    fontSize: "lg",
    fontWeight: "bold",
  }}
/>
```

## En İyi Uygulamalar {#best-practices}

### Yapılması Gerekenler ✅ {#dos-}

- Tutarlılık için önceden tanımlı font ölçeğini kullanın
- Semantik boyutlar kullanın (başlıklar için lg, gövde metni için md)
- Tipografiyi farklı ekran boyutlarında test edin
- Okunabilir satır yükseklikleri sağlayın

### Yapılmaması Gerekenler ❌ {#donts-}

- Tek bir ekranda çok fazla font boyutu kullanmayın
- Aşırı harf aralığı kullanmayın
- Çok fazla font ailesini bir arada kullanmayın
- Küçük cihazlarda test etmeyi unutmayın

## Erişilebilirlik {#accessibility}

- Minimum font boyutu: gövde metni için 12px
- Yeterli satır yüksekliği: gövde metni için 1.5
- Boyut ve kalınlıkla net bir hiyerarşi
- İyi kontrast oranları

## Sonraki Adımlar {#next-steps}

- **[Renkler](/docs/theming/colors)** - Renk sistemi
- **[Spacing](/docs/theming/spacing)** - Spacing sistemi
- **[rott.config.ts](/docs/theming/rott-config)** - Özel config
