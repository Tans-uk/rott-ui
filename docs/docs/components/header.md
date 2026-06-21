---
sidebar_position: 3
title: Header
description: Navigation header with logo and action buttons
---

# Header

The Header component provides a navigation bar with logo, title, and action buttons.

## Features

- 🎨 Logo support
- 📝 Title display
- 🔘 Left/right actions
- 🔙 Back button
- ❌ Close button
- 📏 Custom height

## Basic Usage

```tsx
import { Header } from '@tansuk/rott-ui';

<Header title="My Screen" />
```

## With Logo

```tsx
<Header height={40} logo="COMPANY_LOGO" />
```

## With Actions

```tsx
<Header
  title="Settings"
  leftElement={<Icon name="MENU" width={24} height={24} />}
  rightElement={<Icon name="SETTINGS" width={24} height={24} />}
/>
```

## Multiple Icons

```tsx
<Header
  title="Messages"
  leftIcon={[
    { name: 'ARROW_LEFT', onPress: () => navigation.goBack() },
  ]}
  rightIcon={[
    { name: 'SEARCH', onPress: () => {} },
    { name: 'MORE', onPress: () => {} },
  ]}
/>
```

## Close Button

```tsx
<Header
  title="Modal Title"
  closeButton
  onClose={() => navigation.goBack()}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Header title |
| `height` | `number` | `56` | Header height |
| `logo` | `string` | - | Logo name |
| `leftElement` | `ReactNode` | - | Left element |
| `rightElement` | `ReactNode` | - | Right element |
| `leftIcon` | `HeaderIconProps[]` | - | Left icons |
| `rightIcon` | `HeaderIconProps[]` | - | Right icons |
| `closeButton` | `boolean` | `false` | Show close button |

## Examples

### Navigation Header

```tsx
<Header
  title="Home"
  leftIcon={[{ name: 'MENU', onPress: () => navigation.openDrawer() }]}
  rightIcon={[{ name: 'NOTIFICATION', onPress: () => {} }]}
/>
```

### Modal Header

```tsx
<Header
  title="Edit Profile"
  closeButton
  onClose={() => Modal.hideModal('edit-profile')}
  rightIcon={[{ name: 'CHECK', onPress: handleSave }]}
/>
```
