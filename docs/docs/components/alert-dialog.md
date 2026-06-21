---
sidebar_position: 3
title: AlertDialog
description: Simple confirmation dialogs
---

# AlertDialog

AlertDialog provides simple confirmation dialogs with customizable buttons and content.

## Features

- ✅ Simple API
- 🎨 Customizable buttons
- 📝 Title and text support
- 🖼️ Icon support
- 🎯 Empty state integration

## Basic Usage

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

## With Icon

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

## Destructive Action

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

## Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Dialog title |
| `text` | `string` | Dialog message |
| `icon` | `IconProps` | Icon to display |
| `buttons` | `AlertDialogButtonProps[]` | Action buttons |
| `emptyState` | `EmptyStateProps` | Custom empty state |

## Examples

### Confirmation

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

### Success Message

```tsx
AlertDialog.show({
  title: 'Success',
  text: 'Your payment was processed successfully',
  icon: { name: 'CHECK_CIRCLE', variant: 'success' },
  buttons: [{ text: 'OK', variant: 'primary' }],
});
```

### Error Message

```tsx
AlertDialog.show({
  title: 'Error',
  text: 'Something went wrong. Please try again.',
  icon: { name: 'WARNING', variant: 'danger' },
  buttons: [{ text: 'Retry', variant: 'primary', onPress: retry }],
});
```
