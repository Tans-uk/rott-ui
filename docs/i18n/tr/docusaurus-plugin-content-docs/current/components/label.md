---
sidebar_position: 1
title: Label
description: Theming destekli metin gösterme component'i
---

# Label

Label component'i; tam theming desteği, responsive font boyutlandırma ve kapsamlı style seçenekleri sunan esnek bir metin gösterme component'idir.

## Özellikler {#features}

- 🎨 Theme renk variant'ları
- 📏 Responsive font boyutları
- 🔤 Font ailesi ve kalınlığı
- 📝 Metin hizalama
- ✂️ Metin kısaltma
- 🎯 Harf aralığı

## Temel Kullanım {#basic-usage}

```tsx
import { Label } from '@tansuk/rott-ui';

<Label text="Hello World" />
```

İçeriği `text` prop'u üzerinden ya da `children` olarak verebilirsiniz:

```tsx
<Label text="Hello World" />
<Label>Hello World</Label>
```

İkisi birden verildiğinde `children` önceliklidir (children olmadığında `text`
fallback olarak kullanılır).

## Font Boyutları {#font-sizes}

```tsx
<Label text="Extra Small" fontSize="xs" />
<Label text="Small" fontSize="sm" />
<Label text="Medium" fontSize="md" />
<Label text="Large" fontSize="lg" />
<Label text="Extra Large" fontSize="xl" />
<Label text="2X Large" fontSize="xxl" />
<Label text="3X Large" fontSize="xxxl" />
```

## Renk Variant'ları {#color-variants}

```tsx
<Label text="Primary" variant="primary" />
<Label text="Secondary" variant="secondary" />
<Label text="Danger" variant="danger" />
<Label text="Success" variant="success" />
<Label text="Grey" variant="grey-900" />
```

## Font Kalınlığı {#font-weight}

```tsx
<Label text="Regular" fontWeight="regular" />
<Label text="Medium" fontWeight="medium" />
<Label text="Bold" fontWeight="bold" />
```

## Metin Hizalama {#text-alignment}

```tsx
<Label text="Left Aligned" />
<Label text="Center Aligned" textCenter />
<Label text="Right Aligned" textAlign="right" />
```

## Metin Kısaltma {#text-truncation}

```tsx
<Label 
  text="This is a very long text that will be truncated"
  numberOfLines={1}
/>
```

## Props {#props}

| Prop | Tip | Default | Açıklama |
|------|------|---------|-------------|
| `text` | `string` | - | Gösterilecek metin (`children` verilmediğinde fallback) |
| `variant` | `Variant` | `'grey-900'` | Renk variant'ı |
| `fontSize` | `FontSize` | `'md'` | Font boyutu |
| `fontWeight` | `FontWeight` | `'regular'` | Font kalınlığı |
| `textCenter` | `boolean` | `false` | Ortaya hizalar |
| `numberOfLines` | `number` | - | Maksimum satır sayısı |

## Örnekler {#examples}

### Başlık {#heading}

```tsx
<Label 
  text="Page Title" 
  fontSize="3xl" 
  fontWeight="bold"
  marginBottom={16}
/>
```

### Hata Mesajı {#error-message}

```tsx
<Label 
  text="This field is required" 
  fontSize="sm" 
  variant="danger"
  marginTop={4}
/>
```

### Başarı Mesajı {#success-message}

```tsx
<Label 
  text="✓ Changes saved" 
  fontSize="md" 
  variant="success"
  textCenter
/>
```
