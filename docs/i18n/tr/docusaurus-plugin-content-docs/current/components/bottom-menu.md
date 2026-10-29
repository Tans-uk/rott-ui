---
sidebar_position: 5
title: BottomMenu
description: Alt navigation bar'ı
---

# BottomMenu

BottomMenu; öğeleri, ikonları ve görselleri özelleştirilebilen bir alt navigation bar'ı sunar.

## Özellikler {#features}

- 📱 Alt navigation
- 🖼️ İkon ve görsel desteği
- 🎨 Özelleştirilebilir style
- 📏 Safe area yönetimi
- 🔗 Telefon/URL bağlantısı

## Temel Kullanım {#basic-usage}

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

## Görsellerle {#with-images}

```tsx
const menuItems: BottomMenuItemModel[] = [
  {
    icon: { name: 'HOME' },
    title: 'Home',
    onPress: () => {},
  },
  {
    image: { name: 'QR_BUTTON', width: 56, height: 56 },
    containerStyle: { top: -24 }, // Yükseltilmiş buton
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

## Props {#props}

| Prop | Tip | Açıklama |
|------|------|-------------|
| `menuItems` | `BottomMenuItemModel[]` | Menü öğeleri |

### BottomMenuItemModel {#bottommenuitemmodel}

| Prop | Tip | Açıklama |
|------|------|-------------|
| `icon` | `IconProps` | Öğe ikonu |
| `image` | `ImageProps` | Öğe görseli |
| `title` | `string` | Öğe başlığı |
| `onPress` | `() => void` | Basma handler'ı |
| `containerStyle` | `ViewStyle` | Container style'ı |
| `phone` | `string` | Aranacak telefon numarası |
| `url` | `string` | Açılacak URL |

## Örnekler {#examples}

### Tab Navigation {#tab-navigation}

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

### Yükseltilmiş Orta Butonla {#with-elevated-center-button}

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

### Telefon Bağlantısıyla {#with-phone-link}

```tsx
const menuItems = [
  {
    icon: { name: 'PHONE' },
    title: 'Call Support',
    phone: '+1234567890',
  },
];
```
