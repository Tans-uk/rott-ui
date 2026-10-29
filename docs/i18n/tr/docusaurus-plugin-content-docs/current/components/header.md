---
sidebar_position: 3
title: Header
description: Logo ve aksiyon butonları içeren navigation header'ı
---

# Header

Header component'i; logo, başlık ve aksiyon butonları içeren bir navigation bar sağlar.

## Özellikler {#features}

- 🎨 Logo desteği
- 📝 Başlık gösterimi
- 🔘 Sol/sağ aksiyonlar
- 🔙 Geri butonu
- ❌ Kapatma butonu
- 📏 Özel yükseklik

## Temel Kullanım {#basic-usage}

```tsx
import { Header } from '@tansuk/rott-ui';

<Header title="My Screen" />
```

## Logo ile {#with-logo}

```tsx
<Header height={40} logo="COMPANY_LOGO" />
```

## Aksiyonlarla {#with-actions}

```tsx
<Header
  title="Settings"
  leftElement={<Icon name="MENU" width={24} height={24} />}
  rightElement={<Icon name="SETTINGS" width={24} height={24} />}
/>
```

## Birden Fazla İkon {#multiple-icons}

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

## Kapatma Butonu {#close-button}

```tsx
<Header
  title="Modal Title"
  closeButton
  onClose={() => navigation.goBack()}
/>
```

## Props {#props}

| Prop | Tip | Default | Açıklama |
|------|------|---------|-------------|
| `title` | `string` | - | Header başlığı |
| `height` | `number` | `56` | Header yüksekliği |
| `logo` | `string` | - | Logo adı |
| `leftElement` | `ReactNode` | - | Sol element |
| `rightElement` | `ReactNode` | - | Sağ element |
| `leftIcon` | `HeaderIconProps[]` | - | Sol ikonlar |
| `rightIcon` | `HeaderIconProps[]` | - | Sağ ikonlar |
| `closeButton` | `boolean` | `false` | Kapatma butonunu gösterir |

## Örnekler {#examples}

### Navigation Header'ı {#navigation-header}

```tsx
<Header
  title="Home"
  leftIcon={[{ name: 'MENU', onPress: () => navigation.openDrawer() }]}
  rightIcon={[{ name: 'NOTIFICATION', onPress: () => {} }]}
/>
```

### Modal Header'ı {#modal-header}

```tsx
<Header
  title="Edit Profile"
  closeButton
  onClose={() => Modal.hideModal('edit-profile')}
  rightIcon={[{ name: 'CHECK', onPress: handleSave }]}
/>
```
