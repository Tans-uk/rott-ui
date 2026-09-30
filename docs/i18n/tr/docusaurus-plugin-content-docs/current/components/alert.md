---
sidebar_position: 2
title: Alert
description: Uyarı banner component'i
---

# Alert

Alert, ikonlu ve style'ı özelleştirilebilen bilgilendirme banner'ları gösterir.

## Özellikler {#features}

- 🎨 Birden çok variant
- 📏 Boyut seçenekleri
- 🖼️ Sol/sağ ikonlar
- 🎯 Özelleştirilebilir içerik

## Temel Kullanım {#basic-usage}

```tsx
import { Alert } from '@tansuk/rott-ui';

<Alert 
  text="This is an alert message" 
  variant="info"
/>
```

## Variant'lar {#variants}

```tsx
<Alert text="Info message" variant="info" />
<Alert text="Success message" variant="success" />
<Alert text="Warning message" variant="warning" />
<Alert text="Error message" variant="danger" />
```

## İkonlarla {#with-icons}

```tsx
<Alert 
  text="Important message"
  variant="warning"
  leftIcon={{ name: 'WARNING', width: 20, height: 20 }}
/>

<Alert 
  text="Completed"
  variant="success"
  leftIcon={{ name: 'CHECK_CIRCLE', width: 20, height: 20 }}
  rightIcon={{ name: 'CLOSE', width: 16, height: 16 }}
/>
```

## Boyutlar {#sizes}

```tsx
<Alert text="Small alert" size="sm" />
<Alert text="Medium alert" size="md" />
<Alert text="Large alert" size="lg" />
```

## Props {#props}

| Prop | Tip | Default | Açıklama |
|------|------|---------|-------------|
| `text` | `string \| LabelProps` | - | Alert mesajı |
| `variant` | `Variant` | `'info'` | Renk variant'ı |
| `size` | `Size` | `'md'` | Alert boyutu |
| `leftIcon` | `IconProps` | - | Sol ikon |
| `rightIcon` | `IconProps` | - | Sağ ikon |

## Örnekler {#examples}

### Bilgi Alert'i {#info-alert}

```tsx
<Alert 
  text="Your session will expire in 5 minutes"
  variant="info"
  leftIcon={{ name: 'INFORMATION_CIRCLE', width: 20, height: 20 }}
/>
```

### Başarı Alert'i {#success-alert}

```tsx
<Alert 
  text="Your changes have been saved"
  variant="success"
  leftIcon={{ name: 'CHECK_CIRCLE', width: 20, height: 20 }}
/>
```

### Uyarı Alert'i {#warning-alert}

```tsx
<Alert 
  text="Please verify your email address"
  variant="warning"
  leftIcon={{ name: 'WARNING', width: 20, height: 20 }}
/>
```

### Hata Alert'i {#error-alert}

```tsx
<Alert 
  text="Failed to load data. Please try again."
  variant="danger"
  leftIcon={{ name: 'WARNING_ERROR', width: 20, height: 20 }}
/>
```
