---
sidebar_position: 4
title: ActionMenu
description: Bottom sheet aksiyon menüsü
---

# ActionMenu

ActionMenu, kullanıcının aralarından seçim yapabileceği bir aksiyon listesini bottom sheet içinde gösterir.

## Özellikler {#features}

- 📱 Bottom sheet görünümü
- 📝 Başlık ve alt başlık
- 🎯 Aksiyon listesi
- 📏 Maksimum öğe sınırı
- 👆 Kaydırarak kapatma

## Temel Kullanım {#basic-usage}

```tsx
import { ActionMenu } from '@tansuk/rott-ui';

ActionMenu.showActionMenu({
  title: 'Choose Action',
  data: [
    {
      title: 'Edit',
      icon: { name: 'EDIT' },
      onPress: () => handleEdit(),
    },
    {
      title: 'Delete',
      icon: { name: 'REMOVE', variant: 'danger' },
      onPress: () => handleDelete(),
    },
  ],
});
```

## Alt Başlık ile {#with-subtitle}

```tsx
ActionMenu.showActionMenu({
  title: 'Share Options',
  subTitle: 'Choose how to share this content',
  data: [
    { title: 'Copy Link', icon: { name: 'COPY' }, onPress: copyLink },
    { title: 'Share via Email', icon: { name: 'MAIL' }, onPress: shareEmail },
    { title: 'Share on Social', icon: { name: 'SHARE' }, onPress: shareSocial },
  ],
});
```

## Maksimum Öğe {#max-items}

```tsx
ActionMenu.showActionMenu({
  title: 'Actions',
  maxItem: 5,
  data: longActionList,
});
```

## Props {#props}

| Prop | Tip | Açıklama |
|------|------|-------------|
| `title` | `string` | Menü başlığı |
| `subTitle` | `string` | Menü alt başlığı |
| `data` | `ActionModel[]` | Aksiyon öğeleri |
| `maxItem` | `number` | Maksimum görünür öğe sayısı |
| `visible` | `boolean` | Görünürlük state'i |
| `onClose` | `() => void` | Kapatma handler'ı |

## Örnekler {#examples}

### Dosya Aksiyonları {#file-actions}

```tsx
ActionMenu.showActionMenu({
  title: 'File Options',
  data: [
    { title: 'Download', icon: { name: 'DOWNLOAD' }, onPress: download },
    { title: 'Share', icon: { name: 'SHARE' }, onPress: share },
    { title: 'Delete', icon: { name: 'REMOVE', variant: 'danger' }, onPress: deleteFile },
  ],
});
```

### Profil Aksiyonları {#profile-actions}

```tsx
ActionMenu.showActionMenu({
  title: 'Profile',
  subTitle: 'Manage your account',
  data: [
    { title: 'Edit Profile', icon: { name: 'USER' }, onPress: editProfile },
    { title: 'Settings', icon: { name: 'SETTINGS' }, onPress: openSettings },
    { title: 'Logout', icon: { name: 'EXIT', variant: 'danger' }, onPress: logout },
  ],
});
```
