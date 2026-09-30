---
sidebar_position: 5
title: Notification
description: Toast bildirim sistemi
---

# Notification

Notification, geçici mesajları göstermek için bir toast bildirim sistemi sunar.

## Özellikler {#features}

- 🎨 Birden fazla tip (success, error, warning, info)
- ⏱️ Otomatik kapanma
- 🎯 Özel içerik
- 📍 Konum kontrolü
- 🔧 Özelleştirilebilir style

## Temel Kullanım {#basic-usage}

```tsx
import { Notification } from '@tansuk/rott-ui';

// Başarı bildirimi
Notification.success('Changes saved successfully');

// Hata bildirimi
Notification.error('Something went wrong');

// Uyarı bildirimi
Notification.warning('Please verify your email');

// Bilgi bildirimi
Notification.info('New update available');
```

## Özel Bildirim {#custom-notification}

```tsx
Notification.custom({
  title: 'Custom Title',
  message: 'Custom message content',
  icon: { name: 'STAR', variant: 'warning' },
  duration: 5000,
});
```

## Props {#props}

Notification component'i arka planda `react-native-toast-notifications` kullanır.

### Static Method'lar {#static-methods}

| Method | Parametreler | Açıklama |
|--------|------------|-------------|
| `success` | `(message: string)` | Başarı toast'u gösterir |
| `error` | `(message: string)` | Hata toast'u gösterir |
| `warning` | `(message: string)` | Uyarı toast'u gösterir |
| `info` | `(message: string)` | Bilgi toast'u gösterir |
| `custom` | `(options)` | Özel toast gösterir |

## Örnekler {#examples}

### Form Gönderiminden Sonra {#after-form-submit}

```tsx
const handleSubmit = async (values) => {
  try {
    await submitForm(values);
    Notification.success('Form submitted successfully');
    navigation.goBack();
  } catch (error) {
    Notification.error('Failed to submit form');
  }
};
```

### Silme İşleminden Sonra {#after-delete}

```tsx
const handleDelete = async (id) => {
  try {
    await deleteItem(id);
    Notification.success('Item deleted');
  } catch (error) {
    Notification.error('Failed to delete item');
  }
};
```

### Ağ Durumu {#network-status}

```tsx
import NetInfo from '@react-native-community/netinfo';

NetInfo.addEventListener(state => {
  if (!state.isConnected) {
    Notification.warning('No internet connection');
  } else {
    Notification.success('Connected to internet');
  }
});
```

### İkon ile Özel Bildirim {#custom-with-icon}

```tsx
Notification.custom({
  title: 'New Message',
  message: 'You have a new message from John',
  icon: { name: 'MAIL', variant: 'primary' },
  duration: 4000,
});
```
