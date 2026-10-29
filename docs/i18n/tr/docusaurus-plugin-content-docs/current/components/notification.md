---
sidebar_position: 5
title: Notification
description: Toast bildirim sistemi
---

# Notification

Notification, ekranın üstünde kısa toast mesajları gösterir. Kurulumunu `RottProvider`
yapar; render edildikten sonra static method'ları uygulamanın her yerinden çağırabilirsiniz,
bir component'in ilk mount effect'i dahil.

## Özellikler {#features}

- 🎨 Dört variant: success, warning, danger ve info
- ⏱️ Üç saniye sonra otomatik kapanma
- 👆 Dokunarak aksiyon: bir `onPress` callback'i verin
- 🖐️ Toast görünürken opsiyonel touch engelleme

## Temel Kullanım {#basic-usage}

```tsx
import { Notification } from '@tansuk/rott-ui';

Notification.success('Changes saved');
Notification.warning('Please verify your email');
Notification.danger('Something went wrong');
Notification.info('New update available');
```

:::note
`RottProvider` render edilmeden önce yapılan bir çağrı hiçbir şey yapmaz.
:::

## Açıklama ve Aksiyon ile {#with-a-description-and-an-action}

```tsx
Notification.info('New message', 'You have a new message from John', () =>
  navigation.navigate('Inbox')
);
```

Kullanıcı toast'a dokunduğunda toast `onPress`'i çalıştırır, ardından kapanır.

## Static Method'lar {#static-methods}

| Method | Parametreler | Açıklama |
|--------|------------|-------------|
| `success` | `(title: string, description?: string, onPress?: () => void)` | Başarı toast'u gösterir |
| `warning` | `(title: string, description?: string, onPress?: () => void)` | Uyarı toast'u gösterir |
| `danger` | `(title: string, description?: string, onPress?: () => void)` | Hata toast'u gösterir |
| `info` | `(title: string, description?: string, onPress?: () => void)` | Bilgi toast'u gösterir |
| `show` | `({ title, description?, variant, onPress? })` | Toast gösterir; `variant` `'success'`, `'warning'`, `'danger'` ya da `'info'` olur |
| `hide` | `(id: string)` | Tek bir toast'u gizler; yukarıdaki method'lar id'sini döndürür |
| `hideAll` | `()` | Görünen tüm toast'ları gizler |

`show`, `success`, `warning`, `danger` ve `info` variant'larını style'lar. Başka herhangi
bir `variant`, kütüphanenin yalnızca title gösteren ve `description` ile `onPress`'i yok
sayan sade toast'una düşer.

Toast'lar `react-native-toast-notifications` ile render edilir.

## Görünürken Touch'ları Engelleme {#blocking-touches-while-visible}

Default olarak bir toast ekrandayken uygulama etkileşimli kalır. Son toast kapanana kadar
tüm uygulamanın touch'ları yok saymasını istiyorsanız — 0.10.0 öncesindeki davranış —
provider üzerinden opt-in yapın:

```tsx
<RottProvider blockTouchesWhileNotificationVisible>
  <App />
</RottProvider>
```

Engelleme açıkken toast'a dokunulamaz ya da kaydırılamaz ve `onPress` çalışmaz. Toast
kendi timer'ı ile ya da `Notification.hide` veya `Notification.hideAll` ile kapanır.

## Örnekler {#examples}

### Form Gönderiminden Sonra {#after-form-submit}

```tsx
const handleSubmit = async (values) => {
  try {
    await submitForm(values);
    Notification.success('Form submitted successfully');
    navigation.goBack();
  } catch (error) {
    Notification.danger('Failed to submit form');
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
    Notification.danger('Failed to delete item');
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
