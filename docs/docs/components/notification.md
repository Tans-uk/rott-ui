---
sidebar_position: 5
title: Notification
description: Toast notification system
---

# Notification

Notification shows short toast messages at the top of the screen. `RottProvider` sets
it up; once it has rendered, call the static methods from anywhere in your app, including
a component's first-mount effect.

## Features

- 🎨 Four variants: success, warning, danger and info
- ⏱️ Auto-dismiss after three seconds
- 👆 Tap to act: pass an `onPress` callback
- 🖐️ Optional touch blocking while a toast is visible

## Basic Usage

```tsx
import { Notification } from '@tansuk/rott-ui';

Notification.success('Changes saved');
Notification.warning('Please verify your email');
Notification.danger('Something went wrong');
Notification.info('New update available');
```

:::note
A call made before `RottProvider` has rendered does nothing.
:::

## With a Description and an Action

```tsx
Notification.info('New message', 'You have a new message from John', () =>
  navigation.navigate('Inbox')
);
```

The toast runs `onPress` when the user taps it, then closes.

## Static Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `success` | `(title: string, description?: string, onPress?: () => void)` | Show a success toast |
| `warning` | `(title: string, description?: string, onPress?: () => void)` | Show a warning toast |
| `danger` | `(title: string, description?: string, onPress?: () => void)` | Show an error toast |
| `info` | `(title: string, description?: string, onPress?: () => void)` | Show an info toast |
| `show` | `({ title, description?, variant, onPress? })` | Show a toast; `variant` is `'success'`, `'warning'`, `'danger'` or `'info'` |
| `hide` | `(id: string)` | Hide one toast; the methods above return its id |
| `hideAll` | `()` | Hide every visible toast |

`show` styles the `success`, `warning`, `danger` and `info` variants. Any other `variant`
falls back to the library's plain toast, which shows only the title and ignores
`description` and `onPress`.

The toasts are rendered with `react-native-toast-notifications`.

## Blocking Touches While Visible

By default the app stays interactive while a toast is on screen. To make the whole app
ignore touches until the last toast closes — the behavior before 0.10.0 — opt in on the
provider:

```tsx
<RottProvider blockTouchesWhileNotificationVisible>
  <App />
</RottProvider>
```

With blocking on, the toast itself cannot be tapped or swiped, and `onPress` does not
run. It closes on its timer, or through `Notification.hide` or `Notification.hideAll`.

## Examples

### After Form Submit

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

### After Delete

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
