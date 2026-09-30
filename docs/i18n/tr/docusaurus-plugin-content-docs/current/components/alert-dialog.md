---
sidebar_position: 3
title: AlertDialog
description: Basit onay dialog'ları
---

# AlertDialog

AlertDialog, butonları ve içeriği özelleştirilebilen basit onay dialog'ları sunar.

## Özellikler {#features}

- ✅ Basit API
- 🎨 Özelleştirilebilir butonlar
- 📝 Başlık ve metin desteği
- 🖼️ İkon desteği
- 🎯 Empty state entegrasyonu

## Temel Kullanım {#basic-usage}

```tsx
import { AlertDialog } from '@tansuk/rott-ui';

AlertDialog.show({
  title: 'Confirm Action',
  text: 'Are you sure you want to continue?',
  buttons: [
    {
      text: 'Cancel',
      variant: 'secondary',
      onPress: () => AlertDialog.hide(),
    },
    {
      text: 'Confirm',
      variant: 'primary',
      onPress: () => {
        handleConfirm();
        AlertDialog.hide();
      },
    },
  ],
});
```

## İkon ile {#with-icon}

```tsx
AlertDialog.show({
  title: 'Success',
  text: 'Your changes have been saved',
  icon: {
    name: 'CHECK_CIRCLE',
    variant: 'success',
    width: 48,
    height: 48,
  },
  buttons: [
    {
      text: 'OK',
      variant: 'primary',
      onPress: () => AlertDialog.hide(),
    },
  ],
});
```

## Yıkıcı Aksiyon {#destructive-action}

```tsx
AlertDialog.show({
  title: 'Delete Account',
  text: 'This action cannot be undone. Are you sure?',
  icon: {
    name: 'WARNING',
    variant: 'danger',
    width: 48,
    height: 48,
  },
  buttons: [
    {
      text: 'Cancel',
      variant: 'secondary-outline',
      size: 'full',
      onPress: () => AlertDialog.hide(),
    },
    {
      text: 'Delete',
      variant: 'danger',
      size: 'full',
      onPress: handleDelete,
    },
  ],
});
```

## Props {#props}

| Prop | Tip | Açıklama |
|------|------|-------------|
| `title` | `string` | Dialog başlığı |
| `text` | `string` | Dialog mesajı |
| `icon` | `IconProps` | Gösterilecek ikon |
| `buttons` | `AlertDialogButtonProps[]` | Aksiyon butonları |
| `emptyState` | `EmptyStateProps` | Özel empty state |

## Örnekler {#examples}

### Onay {#confirmation}

```tsx
const confirmDelete = () => {
  AlertDialog.show({
    title: 'Confirm Delete',
    text: 'Delete this item?',
    buttons: [
      { text: 'Cancel', variant: 'secondary' },
      { text: 'Delete', variant: 'danger', onPress: handleDelete },
    ],
  });
};
```

### Başarı Mesajı {#success-message}

```tsx
AlertDialog.show({
  title: 'Success',
  text: 'Your payment was processed successfully',
  icon: { name: 'CHECK_CIRCLE', variant: 'success' },
  buttons: [{ text: 'OK', variant: 'primary' }],
});
```

### Hata Mesajı {#error-message}

```tsx
AlertDialog.show({
  title: 'Error',
  text: 'Something went wrong. Please try again.',
  icon: { name: 'WARNING', variant: 'danger' },
  buttons: [{ text: 'Retry', variant: 'primary', onPress: retry }],
});
```
