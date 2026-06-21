---
sidebar_position: 1
title: Modal
description: Full-screen and partial modals with gestures
---

# Modal

The Modal component provides a flexible modal system with support for full-screen and partial modals, slide-to-close gestures, and keyboard handling.

## Features

- 📱 Full-screen and partial modals
- 👆 Slide-to-close gesture
- ⌨️ Keyboard handling
- 🎨 Customizable backgrounds
- 📏 Adjustable height (0-100%)
- 🔒 Multiple modal stacking

## Basic Usage

```tsx
import { Modal } from '@tansuk/rott-ui';

// Show modal
Modal.showModal({
  id: 'my-modal',
  children: <MyModalContent />,
});

// Hide modal
Modal.hideModal('my-modal');
```

## Partial Modal

Bottom sheet style modal:

```tsx
Modal.showModal({
  id: 'settings',
  height: 70, // 70% of screen height
  slideToClose: true,
  children: <SettingsContent />,
});
```

## With Header

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

## Full Screen Modal

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

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `number \| string` | **Required** | Modal ID |
| `children` | `ReactNode` | **Required** | Modal content |
| `fullScreen` | `boolean` | `false` | Full screen |
| `height` | `number` | `100` | Height % (0-100) |
| `header` | `ReactNode \| HeaderProps` | - | Header |
| `slideToClose` | `boolean` | `false` | Slide gesture |
| `backgroundColor` | `string \| Variant` | `'white'` | Background |

## Examples

### Confirmation Modal

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

### Filter Modal

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
