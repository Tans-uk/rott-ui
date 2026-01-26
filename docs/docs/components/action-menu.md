---
sidebar_position: 4
title: ActionMenu
description: Bottom sheet action menu
---

# ActionMenu

ActionMenu displays a bottom sheet with a list of actions for the user to choose from.

## Features

- 📱 Bottom sheet style
- 📝 Title and subtitle
- 🎯 Action list
- 📏 Max items limit
- 👆 Slide to close

## Basic Usage

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

## With Subtitle

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

## Max Items

```tsx
ActionMenu.showActionMenu({
  title: 'Actions',
  maxItem: 5,
  data: longActionList,
});
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Menu title |
| `subTitle` | `string` | Menu subtitle |
| `data` | `ActionModel[]` | Action items |
| `maxItem` | `number` | Max visible items |
| `visible` | `boolean` | Visibility state |
| `onClose` | `() => void` | Close handler |

## Examples

### File Actions

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

### Profile Actions

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
