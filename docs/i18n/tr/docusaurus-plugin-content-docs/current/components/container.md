---
sidebar_position: 1
title: Container
description: Safe area'yı yöneten root wrapper component'i
---

# Container

Container component'i, ekranlarınızın root wrapper'ıdır. Safe area'ları yönetir, tutarlı padding sağlar ve status bar config'ini yönetir.

## Özellikler {#features}

- 📱 Otomatik safe area yönetimi
- 🎨 Özelleştirilebilir arka planlar
- 📏 İsteğe bağlı padding kontrolü
- 🔒 Modal ekran desteği
- 👆 Backdrop'a basma yönetimi

## Temel Kullanım {#basic-usage}

```tsx
import { Container } from '@tansuk/rott-ui';

<Container>
  {/* Ekran içeriğiniz */}
</Container>
```

## Padding'siz {#without-padding}

```tsx
<Container noPadding>
  {/* Tam genişlikte içerik */}
</Container>
```

## Ortalanmış İçerik {#centered-content}

```tsx
<Container center>
  <Label text="Centered Content" />
</Container>
```

## Modal Ekran {#modal-screen}

```tsx
<Container isModalScreen>
  {/* Modal içeriği */}
</Container>
```

## Props {#props}

| Prop | Tip | Default | Açıklama |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Ekran içeriği |
| `noPadding` | `boolean` | `false` | Padding'i kaldırır |
| `center` | `boolean` | `false` | İçeriği ortalar |
| `isModalScreen` | `boolean` | `false` | Modal config'i |
| `fullScreen` | `boolean` | `false` | Safe area'ları devre dışı bırakır |
| `closeOnClick` | `boolean` | `false` | Backdrop'a basmayı etkinleştirir |
| `showStatusBar` | `boolean` | `true` | Status bar'ı gösterir |

## Örnek {#example}

```tsx
<Container noPadding>
  <Header title="My Screen" />
  <Content flex={1}>
    {/* İçerik */}
  </Content>
</Container>
```
