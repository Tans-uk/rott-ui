---
sidebar_position: 2
title: Pressable
description: Özel touchable component
---

# Pressable

Pressable, metin render etme ve animasyon desteği sunan, özelleştirilebilir bir touchable component'tir.

## Özellikler {#features}

- 👆 Dokunma yönetimi
- 📝 Metin render etme
- 🎨 Style desteği
- ✨ Animasyon desteği
- 🎯 Ortak UI prop'ları

## Temel Kullanım {#basic-usage}

```tsx
import { Pressable } from '@tansuk/rott-ui';

<Pressable onPress={() => console.log('Pressed')}>
  <Label text="Press Me" />
</Pressable>
```

## Metin ile {#with-text}

```tsx
<Pressable 
  text="Click Here"
  textVariant="primary"
  textSize="lg"
  onPress={handlePress}
/>
```

## Animasyonlu {#animated}

```tsx
<Pressable 
  animated
  onPress={handlePress}
>
  <Icon name="STAR" width={24} height={24} />
</Pressable>
```

## Yatay Layout {#row-layout}

```tsx
<Pressable row alignItemsCenter onPress={handlePress}>
  <Icon name="ARROW_RIGHT" width={20} height={20} />
  <Label text="Next" marginLeft={8} />
</Pressable>
```

## Props {#props}

| Prop | Tip | Default | Açıklama |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | İçerik |
| `text` | `string` | - | Gösterilecek metin |
| `textStyle` | `TextStyle` | - | Metin style'ı |
| `textVariant` | `Variant` | - | Metin rengi |
| `textSize` | `FontSize` | - | Metin boyutu |
| `textWeight` | `FontWeight` | - | Metin kalınlığı |
| `animated` | `boolean` | `false` | Animasyonu etkinleştirir |
| `row` | `boolean` | `false` | Satır layout'u |
| `onPress` | `() => void` | - | Basma handler'ı |

## Örnekler {#examples}

### Liste Öğesi {#list-item}

```tsx
<Pressable 
  row 
  alignItemsCenter 
  justifyContentSpaceBetween
  paddingHorizontal={16}
  paddingVertical={12}
  onPress={() => navigation.navigate('Details')}
>
  <Label text="Item Title" />
  <Icon name="CHEVRON_RIGHT" width={20} height={20} />
</Pressable>
```

### Kart {#card}

```tsx
<Pressable
  padding={16}
  borderRadius={12}
  backgroundColor="white"
  marginBottom={12}
  onPress={() => openDetails()}
>
  <Label text="Card Title" fontSize="lg" fontWeight="bold" marginBottom={8} />
  <Label text="Card description" fontSize="sm" variant="grey-800" />
</Pressable>
```

### İkon Butonu {#icon-button}

```tsx
<Pressable
  animated
  width={44}
  height={44}
  alignItemsCenter
  justifyContentCenter
  borderRadius={22}
  backgroundColor="primary"
  onPress={handleAction}
>
  <Icon name="PLUS" width={24} height={24} variant="white" />
</Pressable>
```
