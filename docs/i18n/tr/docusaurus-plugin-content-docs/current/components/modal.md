---
sidebar_position: 1
title: Modal
description: Gesture destekli tam ekran ve kısmi modal'lar
---

# Modal

Modal component'i; tam ekran ve kısmi modal'ları, kaydırarak kapatma gesture'larını ve klavye yönetimini destekleyen esnek bir modal sistemi sunar.

## Özellikler {#features}

- 📱 Tam ekran ve kısmi modal'lar
- 👆 Kaydırarak kapatma gesture'ı
- ⌨️ Klavye yönetimi
- 🎨 Özelleştirilebilir arka planlar
- 📏 Ayarlanabilir yükseklik (%0-100)
- 🔒 Birden fazla modal'ı üst üste açabilme

## Temel Kullanım {#basic-usage}

```tsx
import { Modal } from '@tansuk/rott-ui';

// Modal'ı göster
Modal.showModal({
  id: 'my-modal',
  children: <MyModalContent />,
});

// Modal'ı gizle
Modal.hideModal('my-modal');
```

## Kısmi Modal {#partial-modal}

Bottom sheet tarzı modal:

```tsx
Modal.showModal({
  id: 'settings',
  height: 70, // Ekran yüksekliğinin %70'i
  slideToClose: true,
  children: <SettingsContent />,
});
```

## Header ile {#with-header}

```tsx
Modal.showModal({
  id: 'profile',
  height: 80,
  header: {
    title: 'Edit Profile',
    rightIcon: {
      name: 'CLOSE',
      onPress: () => Modal.hideModal('profile'),
    },
  },
  children: <ProfileForm />,
});
```

## Tam Ekran Modal {#full-screen-modal}

```tsx
Modal.showModal({
  id: 'fullscreen',
  fullScreen: true,
  header: {
    title: 'Details',
    closeButton: true,
  },
  children: <DetailsContent />,
});
```

## Props {#props}

| Prop | Tip | Default | Açıklama |
|------|------|---------|-------------|
| `id` | `number \| string` | **Zorunlu** | Modal ID'si |
| `children` | `ReactNode` | **Zorunlu** | Modal içeriği |
| `fullScreen` | `boolean` | `false` | Tam ekran |
| `height` | `number` | `100` | Yükseklik yüzdesi (0-100) |
| `header` | `ReactNode \| HeaderProps` | - | Header |
| `slideToClose` | `boolean` | `false` | Kaydırma gesture'ı |
| `backgroundColor` | `string \| Variant` | `'white'` | Arka plan |

## Örnekler {#examples}

### Onay Modal'ı {#confirmation-modal}

```tsx
Modal.showModal({
  id: 'confirm',
  height: 40,
  header: { title: 'Confirm Action' },
  children: (
    <Content paddingHorizontal={24}>
      <Label text="Are you sure?" marginBottom={24} />
      <Button variant="primary" size="full" onPress={handleConfirm}>
        Confirm
      </Button>
      <Button variant="secondary-outline" size="full" marginTop={12}>
        Cancel
      </Button>
    </Content>
  ),
});
```

### Filtre Modal'ı {#filter-modal}

```tsx
Modal.showModal({
  id: 'filters',
  height: 80,
  slideToClose: true,
  header: { title: 'Filters' },
  children: (
    <Content paddingHorizontal={24}>
      <Input name="minPrice" type="numeric" label="Min Price" />
      <Input name="maxPrice" type="numeric" label="Max Price" />
      <Button variant="primary" size="full" marginTop={24}>
        Apply Filters
      </Button>
    </Content>
  ),
});
```
