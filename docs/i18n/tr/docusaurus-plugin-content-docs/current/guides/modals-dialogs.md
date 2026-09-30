---
sidebar_position: 2
title: Modal'lar ve Dialog'lar
description: Modal'lar, dialog'lar ve action menu'lerle çalışma
---

# Modal'lar ve Dialog'lar

Rott UI uygulamanızda modal'ları, dialog'ları ve action menu'leri etkili biçimde nasıl kullanacağınızı öğrenin.

## Modal {#modal}

Gesture destekli tam ekran ve kısmi modal'lar.

### Temel Modal {#basic-modal}

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

### Tam Ekran Modal {#full-screen-modal}

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

## AlertDialog {#alertdialog}

Basit onay dialog'ları.

### Onay {#confirmation}

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

### Başarı Dialog'u {#success-dialog}

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

## ActionMenu {#actionmenu}

Bottom sheet biçiminde action menu'ler.

### Temel Action Menu {#basic-action-menu}

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

## Modal Pattern'leri {#modal-patterns}

### Form Modal'ı {#form-modal}

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

### Filtre Modal'ı {#filter-modal}

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

### Görsel Görüntüleyici {#image-viewer}

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

## En İyi Uygulamalar {#best-practices}

### Yapılması Gerekenler ✅ {#dos-}

- Basit onaylar için AlertDialog kullanın
- Karmaşık içerik için Modal kullanın
- İşlem listeleri için ActionMenu kullanın
- Modal'ları kapatmak için her zaman bir yol sunun
- Form modal'larında klavyeyi doğru şekilde yönetin
- Async işlemler sırasında yükleme state'lerini gösterin

### Yapılmaması Gerekenler ❌ {#donts-}

- Modal'ları çok derin iç içe koymayın
- İşlemlerden sonra modal'ları gizlemeyi unutmayın
- Her etkileşim için modal kullanmayın
- Kullanıcıları kapatma seçeneği sunmadan engellemeyin

## İlgili Sayfalar {#related}

- [Modal component'i](/docs/components/modal)
- [AlertDialog component'i](/docs/components/alert-dialog)
- [ActionMenu component'i](/docs/components/action-menu)
