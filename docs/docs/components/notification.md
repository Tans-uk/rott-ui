---
sidebar_position: 5
title: Notification
description: Toast notification system
---

# Notification

Notification provides a toast notification system for displaying temporary messages.

## Features

- 🎨 Multiple types (success, error, warning, info)
- ⏱️ Auto-dismiss
- 🎯 Custom content
- 📍 Position control
- 🔧 Customizable styling

## Basic Usage

```tsx
import { Notification } from '@tansuk/rott-ui';

// Success notification
Notification.success('Changes saved successfully');

// Error notification
Notification.error('Something went wrong');

// Warning notification
Notification.warning('Please verify your email');

// Info notification
Notification.info('New update available');
```

## Custom Notification

```tsx
Notification.custom({
  title: 'Custom Title',
  message: 'Custom message content',
  icon: { name: 'STAR', variant: 'warning' },
  duration: 5000,
});
```

## Props

The Notification component uses `react-native-toast-notifications` under the hood.

### Static Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `success` | `(message: string)` | Show success toast |
| `error` | `(message: string)` | Show error toast |
| `warning` | `(message: string)` | Show warning toast |
| `info` | `(message: string)` | Show info toast |
| `custom` | `(options)` | Show custom toast |

## Examples

### After Form Submit

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

### After Delete

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

### Network Status

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

### Custom with Icon

```tsx
Notification.custom({
  title: 'New Message',
  message: 'You have a new message from John',
  icon: { name: 'MAIL', variant: 'primary' },
  duration: 4000,
});
```
