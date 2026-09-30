---
sidebar_position: 4
title: EmptyState
description: Empty state illüstrasyonları ve mesajları
---

# EmptyState

EmptyState; başlık, açıklama ve aksiyon butonlarıyla birlikte empty state illüstrasyonları gösterir.

## Temel Kullanım {#basic-usage}

```tsx
import { EmptyState } from '@tansuk/rott-ui';

<EmptyState
  icon={{ name: 'SEARCH', width: 64, height: 64 }}
  title="No Results Found"
  description="Try adjusting your search criteria"
/>
```

## Aksiyonlarla {#with-actions}

```tsx
<EmptyState
  icon={{ name: 'EMPTY_BOX', width: 80, height: 80 }}
  title="No Items"
  description="You haven't added any items yet"
  actions={[
    {
      text: 'Add Item',
      variant: 'primary',
      onPress: () => navigation.navigate('AddItem'),
    },
  ]}
/>
```

## Props {#props}

| Prop | Tip | Açıklama |
|------|------|-------------|
| `icon` | `IconProps` | Empty state ikonu |
| `title` | `string \| JSX.Element` | Başlık |
| `description` | `string \| JSX.Element` | Açıklama |
| `actions` | `ButtonProps[]` | Aksiyon butonları |

## Örnekler {#examples}

### Arama Sonucu Yok {#no-search-results}

```tsx
<EmptyState
  icon={{ name: 'SEARCH', width: 64, height: 64, variant: 'grey-800' }}
  title="No Results"
  description="We couldn't find any matches for your search"
  actions={[
    { text: 'Clear Search', variant: 'primary-outline', onPress: clearSearch },
  ]}
/>
```

### Boş Liste {#empty-list}

```tsx
<EmptyState
  icon={{ name: 'LIST', width: 64, height: 64 }}
  title="No Items Yet"
  description="Start by adding your first item"
  actions={[
    { text: 'Add Item', variant: 'primary', onPress: addItem },
  ]}
/>
```

### İnternet Yok {#no-internet}

```tsx
<EmptyState
  icon={{ name: 'WIFI_OFF', width: 64, height: 64, variant: 'danger' }}
  title="No Connection"
  description="Please check your internet connection"
  actions={[
    { text: 'Retry', variant: 'primary', onPress: retry },
  ]}
/>
```
