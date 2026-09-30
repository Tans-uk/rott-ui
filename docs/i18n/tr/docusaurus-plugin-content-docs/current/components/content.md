---
sidebar_position: 2
title: Content
description: Klavyeyi yöneten, kaydırılabilir içerik container'ı
---

# Content

Content component'i, ana içeriğiniz için kaydırılabilir bir container'dır; otomatik keyboard avoidance ve pull-to-refresh desteği sunar.

## Özellikler {#features}

- 📜 Otomatik kaydırma
- ⌨️ Keyboard avoidance
- 🔄 Pull-to-refresh
- 📏 Esnek layout
- 📱 Alt menü boşluğu

## Temel Kullanım {#basic-usage}

```tsx
import { Content } from '@tansuk/rott-ui';

<Content flex={1}>
  {/* Kaydırılabilir içeriğiniz */}
</Content>
```

## Keyboard Avoidance {#keyboard-avoidance}

```tsx
<Content 
  flex={1}
  keyboardAvoidingView
  keyboardVerticalOffset={100}
>
  <Input name="email" type="email" />
  <Input name="password" type="password" />
</Content>
```

## Pull to Refresh {#pull-to-refresh}

```tsx
import { useState } from 'react';

function MyScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <Content
      flex={1}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* İçerik */}
    </Content>
  );
}
```

## Yatay Layout {#horizontal-layout}

```tsx
<Content row scrollEnabled>
  <Item width={200} height={200} />
  <Item width={200} height={200} />
</Content>
```

## Props {#props}

| Prop | Tip | Default | Açıklama |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | İçerik |
| `flex` | `number` | - | Flex değeri |
| `row` | `boolean` | `false` | Yatay layout |
| `noPadding` | `boolean` | `false` | Padding'i kaldırır |
| `keyboardAvoidingView` | `boolean` | `false` | Keyboard avoidance |
| `scrollEnabled` | `boolean` | `true` | Kaydırmayı etkinleştirir |
| `refreshControl` | `ReactElement` | - | Pull-to-refresh |
| `hasBottomMenu` | `boolean` | `false` | Alt menü boşluğu |

## Örnek {#example}

```tsx
<Content 
  flex={1}
  keyboardAvoidingView
  paddingHorizontal={24}
>
  <Input name="name" type="default" label="Name" />
  <Input name="email" type="email" label="Email" />
  <Button variant="primary" marginTop={24}>Submit</Button>
</Content>
```
