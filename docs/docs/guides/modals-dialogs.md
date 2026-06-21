---
sidebar_position: 2
title: Modals & Dialogs
description: Working with modals, dialogs, and action menus
---

# Modals & Dialogs

Learn how to use modals, dialogs, and action menus effectively in your Rott UI app.

## Modal

Full-screen and partial modals with gestures.

### Basic Modal

```tsx
import { Modal, Button, Content, Label } from '@tansuk/rott-ui';

const showSettings = () => {
  Modal.showModal({
    id: 'settings',
    height: 70,
    slideToClose: true,
    header: {
      title: 'Settings',
      closeButton: true,
    },
    children: (
      <Content paddingHorizontal={24}>
        <Label text="Settings content" />
      </Content>
    ),
  });
};

<Button onPress={showSettings}>Open Settings</Button>
```

### Full Screen Modal

```tsx
Modal.showModal({
  id: 'details',
  fullScreen: true,
  header: {
    title: 'Details',
    leftIcon: [{ name: 'ARROW_LEFT', onPress: () => Modal.hideModal('details') }],
  },
  children: <DetailsScreen />,
});
```

## AlertDialog

Simple confirmation dialogs.

### Confirmation

```tsx
import { AlertDialog } from '@tansuk/rott-ui';

const confirmDelete = () => {
  AlertDialog.show({
    title: 'Confirm Delete',
    text: 'Are you sure you want to delete this item? This action cannot be undone.',
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
        onPress: () => {
          handleDelete();
          AlertDialog.hide();
        },
      },
    ],
  });
};
```

### Success Dialog

```tsx
AlertDialog.show({
  title: 'Success',
  text: 'Your changes have been saved successfully',
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
      size: 'full',
      onPress: () => AlertDialog.hide(),
    },
  ],
});
```

## ActionMenu

Bottom sheet action menus.

### Basic Action Menu

```tsx
import { ActionMenu } from '@tansuk/rott-ui';

const showActions = () => {
  ActionMenu.showActionMenu({
    title: 'Choose Action',
    data: [
      {
        title: 'Edit',
        icon: { name: 'EDIT' },
        onPress: () => handleEdit(),
      },
      {
        title: 'Share',
        icon: { name: 'SHARE' },
        onPress: () => handleShare(),
      },
      {
        title: 'Delete',
        icon: { name: 'REMOVE', variant: 'danger' },
        onPress: () => confirmDelete(),
      },
    ],
  });
};
```

## Modal Patterns

### Form Modal

```tsx
const showEditProfile = () => {
  Modal.showModal({
    id: 'edit-profile',
    height: 80,
    sticksToKeyboard: true,
    header: {
      title: 'Edit Profile',
      rightIcon: {
        name: 'CHECK',
        onPress: handleSave,
      },
    },
    children: (
      <Content keyboardAvoidingView paddingHorizontal={24}>
        <Input name="name" type="default" label="Name" />
        <Input name="email" type="email" label="Email" />
        <Input name="phone" type="phone" label="Phone" />
      </Content>
    ),
  });
};
```

### Filter Modal

```tsx
const showFilters = () => {
  Modal.showModal({
    id: 'filters',
    height: 75,
    slideToClose: true,
    header: { title: 'Filters' },
    children: (
      <Content paddingHorizontal={24}>
        <Input 
          name="minPrice" 
          type="amount" 
          label="Min Price" 
          marginBottom={16}
        />
        <Input 
          name="maxPrice" 
          type="amount" 
          label="Max Price" 
          marginBottom={16}
        />
        <Input 
          name="category" 
          type="select" 
          label="Category"
          options={categories}
          marginBottom={24}
        />
        <Button variant="primary" size="full" onPress={applyFilters}>
          Apply Filters
        </Button>
      </Content>
    ),
  });
};
```

### Image Viewer

```tsx
const showImageViewer = (imageUrl) => {
  Modal.showModal({
    id: 'image-viewer',
    fullScreen: true,
    backgroundColor: 'black',
    header: {
      closeButton: true,
      backgroundColor: 'transparent',
    },
    children: (
      <Container center noPadding>
        <Image 
          source={{ uri: imageUrl }}
          resizeMode="contain"
          width="100%"
          height="100%"
        />
      </Container>
    ),
  });
};
```

## Best Practices

### Do's ✅

- Use AlertDialog for simple confirmations
- Use Modal for complex content
- Use ActionMenu for lists of actions
- Always provide a way to close modals
- Handle keyboard properly in form modals
- Show loading states during async operations

### Don'ts ❌

- Don't nest modals too deeply
- Don't forget to hide modals after actions
- Don't use modals for every interaction
- Don't block users without a close option

## Related

- [Modal Component](/docs/components/modal)
- [AlertDialog Component](/docs/components/alert-dialog)
- [ActionMenu Component](/docs/components/action-menu)
