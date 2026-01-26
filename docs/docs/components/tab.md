---
sidebar_position: 3
title: Tab
description: Tab button component
---

# Tab

Tab is a button component for tab navigation systems.

## Features

- 🎯 Selection state
- 🎨 Customizable styling
- 📏 Layout callbacks
- ♿ Accessibility

## Basic Usage

```tsx
import { Tab } from '@tansuk/rott-ui';

<Tab
  title="Home"
  isSelected={selectedTab === 'home'}
  onPress={() => setSelectedTab('home')}
/>
```

## Multiple Tabs

```tsx
import { useState } from 'react';

function TabExample() {
  const [selected, setSelected] = useState('home');

  return (
    <Item row>
      <Tab
        title="Home"
        isSelected={selected === 'home'}
        onPress={() => setSelected('home')}
      />
      <Tab
        title="Search"
        isSelected={selected === 'search'}
        onPress={() => setSelected('search')}
      />
      <Tab
        title="Profile"
        isSelected={selected === 'profile'}
        onPress={() => setSelected('profile')}
      />
    </Item>
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Tab title |
| `isSelected` | `boolean` | Selection state |
| `onPress` | `() => void` | Press handler |
| `onLayout` | `(event) => void` | Layout callback |

## With TabWidget

For complete tab navigation with swipeable content, use [TabWidget](/docs/components/navigation/tab-widget):

```tsx
import { TabWidget } from '@tansuk/rott-ui';

<TabWidget
  titles={['Home', 'Search', 'Profile']}
  tabs={[
    <HomeContent />,
    <SearchContent />,
    <ProfileContent />,
  ]}
/>
```

## Examples

### Simple Tabs

```tsx
const tabs = ['All', 'Active', 'Completed'];
const [activeTab, setActiveTab] = useState('All');

<Item row marginBottom={16}>
  {tabs.map((tab) => (
    <Tab
      key={tab}
      title={tab}
      isSelected={activeTab === tab}
      onPress={() => setActiveTab(tab)}
    />
  ))}
</Item>
```

### With Content

```tsx
function TabScreen() {
  const [tab, setTab] = useState('overview');

  return (
    <>
      <Item row backgroundColor="white" paddingHorizontal={16}>
        <Tab title="Overview" isSelected={tab === 'overview'} onPress={() => setTab('overview')} />
        <Tab title="Details" isSelected={tab === 'details'} onPress={() => setTab('details')} />
        <Tab title="Reviews" isSelected={tab === 'reviews'} onPress={() => setTab('reviews')} />
      </Item>

      <Content flex={1}>
        {tab === 'overview' && <OverviewContent />}
        {tab === 'details' && <DetailsContent />}
        {tab === 'reviews' && <ReviewsContent />}
      </Content>
    </>
  );
}
```
