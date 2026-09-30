---
sidebar_position: 3
title: Tab
description: Tab butonu component'i
---

# Tab

Tab, tab navigation sistemleri için bir buton component'idir.

## Özellikler {#features}

- 🎯 Seçim state'i
- 🎨 Özelleştirilebilir style
- 📏 Layout callback'leri
- ♿ Erişilebilirlik

## Temel Kullanım {#basic-usage}

```tsx
import { Tab } from '@tansuk/rott-ui';

<Tab
  title="Home"
  isSelected={selectedTab === 'home'}
  onPress={() => setSelectedTab('home')}
/>
```

## Birden Fazla Tab {#multiple-tabs}

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

## Props {#props}

| Prop | Tip | Açıklama |
|------|------|-------------|
| `title` | `string` | Tab başlığı |
| `isSelected` | `boolean` | Seçim state'i |
| `onPress` | `() => void` | Basma handler'ı |
| `onLayout` | `(event) => void` | Layout callback'i |

## TabWidget ile {#with-tabwidget}

Kaydırılabilir içerikli, eksiksiz bir tab navigation için [TabWidget](/docs/components/tab-widget) kullanın:

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

## Örnekler {#examples}

### Basit Tab'lar {#simple-tabs}

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

### İçerik ile {#with-content}

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
