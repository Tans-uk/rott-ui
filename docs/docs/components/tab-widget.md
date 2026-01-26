---
sidebar_position: 4
title: TabWidget
description: Complete tab navigation with swipeable content
---

# TabWidget

TabWidget provides a complete tab navigation system with swipeable tab content.

## Features

- 📱 Swipeable tabs
- 🎯 Multiple tab support
- 🎨 Customizable styling
- 🔒 Disable option
- 📏 Default index

## Basic Usage

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

## With Default Index

```tsx
<TabWidget
  titles={['Home', 'Search', 'Profile']}
  defaultIndex={1} // Start on Search tab
  tabs={[
    <HomeScreen />,
    <SearchScreen />,
    <ProfileScreen />,
  ]}
/>
```

## Disable Swipe

```tsx
<TabWidget
  titles={['Tab 1', 'Tab 2']}
  swipeEnabled={false}
  tabs={[<Content1 />, <Content2 />]}
/>
```

## With Callback

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

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `titles` | `string[]` | **Required** | Tab titles |
| `tabs` | `JSX.Element[]` | **Required** | Tab content |
| `defaultIndex` | `number` | `0` | Initial tab |
| `onTabChange` | `(index: number) => void` | - | Tab change callback |
| `swipeEnabled` | `boolean` | `true` | Enable swipe |
| `disabled` | `boolean` | `false` | Disable tabs |

## Examples

### Product Details

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
      {/* Reviews list */}
    </Content>,
  ]}
/>
```

### Settings Tabs

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
