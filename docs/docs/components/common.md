---
sidebar_position: 4
title: Common
description: Common UI patterns (CommonItem, CommonItemContainer)
---

# Common

Common provides reusable UI patterns like CommonItem and CommonItemContainer.

## CommonItem

A versatile list item with icon, title, subtitle, and actions.

### Features

- 🖼️ Left/right icons
- 📝 Title, subtitle, description
- ☑️ Selection states
- ⭐ Favorite support
- 💀 Skeleton support

### Basic Usage

```tsx
import { CommonItem } from '@tansuk/rott-ui';

<CommonItem
  title="Item Title"
  subTitle="Item subtitle"
  leftIcon="USER"
  rightIcon="CHEVRON_RIGHT"
  onPress={() => {}}
/>
```

### With Selection

```tsx
<CommonItem
  title="Option 1"
  showSelected
  selected={selectedOption === 'option1'}
  selectedIconType="check"
  onPress={() => setSelectedOption('option1')}
/>
```

### With Favorite

```tsx
<CommonItem
  title="Favorite Item"
  favorite={isFavorite}
  onFavoritePress={() => setIsFavorite(!isFavorite)}
/>
```

## CommonItemContainer

Container for multiple CommonItem components.

### Basic Usage

```tsx
import { CommonItemContainer } from '@tansuk/rott-ui';

<CommonItemContainer>
  <CommonItem title="Item 1" />
  <CommonItem title="Item 2" />
  <CommonItem title="Item 3" />
</CommonItemContainer>
```

## Props

### CommonItem Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string \| LabelProps \| ReactNode` | Item title |
| `subTitle` | `string \| LabelProps \| ReactNode` | Subtitle |
| `description` | `string \| LabelProps \| ReactNode` | Description |
| `leftIcon` | `IconKeys \| IconProps \| ReactNode` | Left icon |
| `rightIcon` | `IconKeys \| IconProps \| ReactNode` | Right icon |
| `showSelected` | `boolean` | Show selection |
| `selected` | `boolean` | Selected state |
| `selectedIconType` | `'check' \| 'radio'` | Selection icon |
| `favorite` | `boolean` | Favorite state |
| `onPress` | `() => void` | Press handler |

## Examples

### Settings List

```tsx
<CommonItemContainer>
  <CommonItem
    title="Account"
    subTitle="Manage your account"
    leftIcon="USER"
    rightIcon="CHEVRON_RIGHT"
    onPress={() => navigation.navigate('Account')}
  />
  <CommonItem
    title="Privacy"
    subTitle="Privacy settings"
    leftIcon="LOCK"
    rightIcon="CHEVRON_RIGHT"
    onPress={() => navigation.navigate('Privacy')}
  />
  <CommonItem
    title="Notifications"
    subTitle="Notification preferences"
    leftIcon="NOTIFICATION"
    rightIcon="CHEVRON_RIGHT"
    onPress={() => navigation.navigate('Notifications')}
  />
</CommonItemContainer>
```

### Selection List

```tsx
const [selected, setSelected] = useState('option1');

<CommonItemContainer>
  {options.map((option) => (
    <CommonItem
      key={option.id}
      title={option.title}
      subTitle={option.description}
      showSelected
      selected={selected === option.id}
      selectedIconType="radio"
      onPress={() => setSelected(option.id)}
    />
  ))}
</CommonItemContainer>
```
