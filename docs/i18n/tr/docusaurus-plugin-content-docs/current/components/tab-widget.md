---
sidebar_position: 4
title: TabWidget
description: Kaydırılabilir içerikli, eksiksiz tab navigation
---

# TabWidget

TabWidget, kaydırılabilir tab içeriğine sahip eksiksiz bir tab navigation sistemi sunar.

## Özellikler {#features}

- 📱 Kaydırılabilir tab'lar
- 🎯 Birden fazla tab desteği
- 🎨 Özelleştirilebilir style
- 🔒 Devre dışı bırakma seçeneği
- 📏 Default index

## Temel Kullanım {#basic-usage}

```tsx
import { TabWidget } from '@tansuk/rott-ui';

<TabWidget
  titles={['Tab 1', 'Tab 2', 'Tab 3']}
  tabs={[
    <Content><Label text="Content 1" /></Content>,
    <Content><Label text="Content 2" /></Content>,
    <Content><Label text="Content 3" /></Content>,
  ]}
/>
```

## Default Index ile {#with-default-index}

```tsx
<TabWidget
  titles={['Home', 'Search', 'Profile']}
  defaultIndex={1} // Search tab'ı ile başlar
  tabs={[
    <HomeScreen />,
    <SearchScreen />,
    <ProfileScreen />,
  ]}
/>
```

## Kaydırmayı Devre Dışı Bırakma {#disable-swipe}

```tsx
<TabWidget
  titles={['Tab 1', 'Tab 2']}
  swipeEnabled={false}
  tabs={[<Content1 />, <Content2 />]}
/>
```

## Callback ile {#with-callback}

```tsx
<TabWidget
  titles={['Overview', 'Details', 'Reviews']}
  onTabChange={(index) => console.log('Tab changed to:', index)}
  tabs={[
    <OverviewScreen />,
    <DetailsScreen />,
    <ReviewsScreen />,
  ]}
/>
```

## Props {#props}

| Prop | Tip | Default | Açıklama |
|------|------|---------|-------------|
| `titles` | `string[]` | **Zorunlu** | Tab başlıkları |
| `tabs` | `JSX.Element[]` | **Zorunlu** | Tab içeriği |
| `defaultIndex` | `number` | `0` | Başlangıç tab'ı |
| `onTabChange` | `(index: number) => void` | - | Tab değişim callback'i |
| `swipeEnabled` | `boolean` | `true` | Kaydırmayı etkinleştirir |
| `disabled` | `boolean` | `false` | Tab'ları devre dışı bırakır |

## Örnekler {#examples}

### Ürün Detayları {#product-details}

```tsx
<TabWidget
  titles={['Overview', 'Specifications', 'Reviews']}
  tabs={[
    <Content paddingHorizontal={16}>
      <Label text="Product Overview" fontSize="lg" fontWeight="bold" />
      <Label text="Description..." marginTop={8} />
    </Content>,
    
    <Content paddingHorizontal={16}>
      <Label text="Specifications" fontSize="lg" fontWeight="bold" />
      <Label text="Size: Large" marginTop={8} />
      <Label text="Color: Blue" marginTop={4} />
    </Content>,
    
    <Content paddingHorizontal={16}>
      <Label text="Customer Reviews" fontSize="lg" fontWeight="bold" />
      {/* Yorum listesi */}
    </Content>,
  ]}
/>
```

### Ayar Tab'ları {#settings-tabs}

```tsx
<TabWidget
  titles={['Account', 'Privacy', 'Notifications']}
  onTabChange={(index) => trackTabView(index)}
  tabs={[
    <AccountSettings />,
    <PrivacySettings />,
    <NotificationSettings />,
  ]}
/>
```
