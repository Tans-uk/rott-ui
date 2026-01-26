---
sidebar_position: 2
title: Toggle
description: Toggle switch component
---

# Toggle

Toggle provides an animated switch component for boolean values.

## Features

- 🎨 Smooth animations
- 🎯 Customizable colors
- 🔒 Disabled state
- ♿ Accessibility support

## Basic Usage

```tsx
import { Toggle } from '@tansuk/rott-ui';
import { useState } from 'react';

function Example() {
  const [isOn, setIsOn] = useState(false);

  return (
    <Toggle 
      isOn={isOn}
      onToggleChange={setIsOn}
    />
  );
}
```

## Disabled State

```tsx
<Toggle 
  isOn={true}
  disabled
  onToggleChange={() => {}}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOn` | `boolean` | **Required** | Toggle state |
| `onToggleChange` | `(value: boolean) => void` | **Required** | Change handler |
| `disabled` | `boolean` | `false` | Disabled state |

## Examples

### Settings Toggle

```tsx
import { Toggle, Item, Label } from '@tansuk/rott-ui';

function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <Item row justifyContentSpaceBetween paddingVertical={12}>
        <Label text="Enable Notifications" />
        <Toggle isOn={notifications} onToggleChange={setNotifications} />
      </Item>

      <Item row justifyContentSpaceBetween paddingVertical={12}>
        <Label text="Dark Mode" />
        <Toggle isOn={darkMode} onToggleChange={setDarkMode} />
      </Item>
    </>
  );
}
```

### Form Toggle

```tsx
<Item row alignItemsCenter marginBottom={16}>
  <Toggle 
    isOn={agreedToTerms}
    onToggleChange={setAgreedToTerms}
  />
  <Label 
    text="I agree to the terms and conditions"
    marginLeft={12}
  />
</Item>
```
