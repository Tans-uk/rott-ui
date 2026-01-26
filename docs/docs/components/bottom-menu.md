---
sidebar_position: 5
title: BottomMenu
description: Bottom navigation bar
---

# BottomMenu

BottomMenu provides a bottom navigation bar with customizable items, icons, and images.

## Features

- 📱 Bottom navigation
- 🖼️ Icon and image support
- 🎨 Customizable styling
- 📏 Safe area handling
- 🔗 Phone/URL linking

## Basic Usage

```tsx
import { BottomMenu, BottomMenuItemModel } from '@tansuk/rott-ui';

const menuItems: BottomMenuItemModel[] = [
  {
    icon: { name: 'HOME', noStroke: true },
    title: 'Home',
    onPress: () => navigation.navigate('Home'),
  },
  {
    icon: { name: 'SEARCH', noStroke: true },
    title: 'Search',
    onPress: () => navigation.navigate('Search'),
  },
  {
    icon: { name: 'USER', noStroke: true },
    title: 'Profile',
    onPress: () => navigation.navigate('Profile'),
  },
];

<BottomMenu menuItems={menuItems} />
```

## With Images

```tsx
const menuItems: BottomMenuItemModel[] = [
  {
    icon: { name: 'HOME' },
    title: 'Home',
    onPress: () => {},
  },
  {
    image: { name: 'QR_BUTTON', width: 56, height: 56 },
    containerStyle: { top: -24 }, // Elevated button
    onPress: () => {},
  },
  {
    icon: { name: 'USER' },
    title: 'Profile',
    onPress: () => {},
  },
];

<BottomMenu menuItems={menuItems} />
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `menuItems` | `BottomMenuItemModel[]` | Menu items |

### BottomMenuItemModel

| Prop | Type | Description |
|------|------|-------------|
| `icon` | `IconProps` | Item icon |
| `image` | `ImageProps` | Item image |
| `title` | `string` | Item title |
| `onPress` | `() => void` | Press handler |
| `containerStyle` | `ViewStyle` | Container style |
| `phone` | `string` | Phone number to call |
| `url` | `string` | URL to open |

## Examples

### Tab Navigation

```tsx
const [activeTab, setActiveTab] = useState('home');

const menuItems = [
  {
    icon: { 
      name: 'HOME', 
      variant: activeTab === 'home' ? 'primary' : 'grey-800' 
    },
    title: 'Home',
    onPress: () => setActiveTab('home'),
  },
  {
    icon: { 
      name: 'SEARCH', 
      variant: activeTab === 'search' ? 'primary' : 'grey-800' 
    },
    title: 'Search',
    onPress: () => setActiveTab('search'),
  },
  {
    icon: { 
      name: 'USER', 
      variant: activeTab === 'profile' ? 'primary' : 'grey-800' 
    },
    title: 'Profile',
    onPress: () => setActiveTab('profile'),
  },
];

<BottomMenu menuItems={menuItems} />
```

### With Elevated Center Button

```tsx
const menuItems = [
  { icon: { name: 'HOME' }, title: 'Home', onPress: () => {} },
  { icon: { name: 'SEARCH' }, title: 'Search', onPress: () => {} },
  {
    image: { name: 'SCAN_QR', width: 56, height: 56 },
    containerStyle: { top: -24 },
    onPress: () => openQRScanner(),
  },
  { icon: { name: 'NOTIFICATION' }, title: 'Alerts', onPress: () => {} },
  { icon: { name: 'USER' }, title: 'Profile', onPress: () => {} },
];
```

### With Phone Link

```tsx
const menuItems = [
  {
    icon: { name: 'PHONE' },
    title: 'Call Support',
    phone: '+1234567890',
  },
];
```
