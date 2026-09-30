---
sidebar_position: 1
title: Separator
description: Görsel ayırıcı component
---

# Separator

Separator, içerik bölümleri arasında görsel ayırıcılar oluşturur.

## Özellikler {#features}

- 📏 Yatay ve dikey
- 🎨 Özelleştirilebilir renk
- 📐 Ayarlanabilir boyutlar
- 🎯 Opaklık kontrolü

## Temel Kullanım {#basic-usage}

```tsx
import { Separator } from '@tansuk/rott-ui';

<Separator />
```

## Yatay {#horizontal}

```tsx
<Separator orientation="horizontal" width="100%" height={1} />
```

## Dikey {#vertical}

```tsx
<Separator orientation="vertical" width={1} height={50} />
```

## Özel Renk {#custom-color}

```tsx
<Separator variant="primary" />
<Separator variant="danger" />
<Separator variant="grey-200" />
```

## Özel Opaklık {#custom-opacity}

```tsx
<Separator opacity={0.5} />
<Separator opacity={0.2} />
```

## Props {#props}

| Prop | Tip | Default | Açıklama |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Yön |
| `width` | `number \| string` | `'100%'` | Genişlik |
| `height` | `number \| string` | `1` | Yükseklik |
| `variant` | `Variant` | `'grey-200'` | Renk variant'ı |
| `opacity` | `number` | `1` | Opaklık (0-1) |

## Örnekler {#examples}

### Liste Öğeleri Arasında {#between-list-items}

```tsx
<Item paddingVertical={12}>
  <Label text="Item 1" />
</Item>
<Separator />
<Item paddingVertical={12}>
  <Label text="Item 2" />
</Item>
<Separator />
<Item paddingVertical={12}>
  <Label text="Item 3" />
</Item>
```

### Formlarda {#in-forms}

```tsx
<Input name="email" type="email" />
<Separator marginVertical={16} />
<Input name="password" type="password" />
```

### Dikey Ayırıcı {#vertical-divider}

```tsx
<Item row alignItemsCenter>
  <Label text="Option 1" />
  <Separator orientation="vertical" height={20} marginHorizontal={12} />
  <Label text="Option 2" />
  <Separator orientation="vertical" height={20} marginHorizontal={12} />
  <Label text="Option 3" />
</Item>
```
