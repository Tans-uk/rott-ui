---
sidebar_position: 2
title: Toggle
description: Toggle switch component'i
---

# Toggle

Toggle, boolean değerler için animasyonlu bir switch component'i sunar.

## Özellikler {#features}

- 🎨 Akıcı animasyonlar
- 🎯 Özelleştirilebilir renkler
- 🔒 Devre dışı state'i
- ♿ Erişilebilirlik desteği

## Temel Kullanım {#basic-usage}

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

## Devre Dışı State'i {#disabled-state}

```tsx
<Toggle 
  isOn={true}
  disabled
  onToggleChange={() => {}}
/>
```

## Props {#props}

| Prop | Tip | Default | Açıklama |
|------|------|---------|-------------|
| `isOn` | `boolean` | **Zorunlu** | Toggle state'i |
| `onToggleChange` | `(value: boolean) => void` | **Zorunlu** | Değişim handler'ı |
| `disabled` | `boolean` | `false` | Devre dışı state'i |

## Örnekler {#examples}

### Ayarlar Toggle'ı {#settings-toggle}

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

### Form Toggle'ı {#form-toggle}

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
