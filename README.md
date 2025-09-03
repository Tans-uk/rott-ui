# @tansuk/rott-ui

A comprehensive, property-based React Native UI Kit designed for rapid development with type-safe theming and extensive customization options.

[![npm version](https://badge.fury.io/js/@tansuk%2Frott-ui.svg)](https://badge.fury.io/js/@tansuk%2Frott-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎨 **29 Production-Ready Components** - From basic buttons to complex modals and input fields
- 🎯 **Type-Safe Theming** - Configure colors, fonts, and styles with full TypeScript support
- 📱 **React Native First** - Optimized for mobile development with platform-specific adaptations
- 🔧 **Highly Customizable** - Every component accepts extensive styling and behavior props
- 🌍 **Internationalization Ready** - Built-in i18n support with React Intl integration
- ♿ **Accessibility Focused** - Comprehensive accessibility features and testing
- 🚀 **Performance Optimized** - Leverages FlashList, Reanimated, and other performance libraries

## 📦 Installation

```bash
npm install @tansuk/rott-ui
# or
yarn add @tansuk/rott-ui
```

### Peer Dependencies

Install the required peer dependencies for full functionality:

```bash
npm install react react-native react-intl date-fns \
  @shopify/flash-list react-native-reanimated \
  react-native-safe-area-context react-native-svg \
  react-native-linear-gradient react-native-mask-input \
  react-native-device-info react-native-tab-view \
  react-native-toast-notifications react-native-keyboard-controller \
  react-native-edge-to-edge react-native-worklets \
  react-native-select-contact @react-native-community/netinfo
```

#### Key Dependencies & Links

| Package                          | Version   | Repository                                                                             |
| -------------------------------- | --------- | -------------------------------------------------------------------------------------- |
| `@shopify/flash-list`            | >=1.8.0   | [GitHub](https://github.com/Shopify/flash-list)                                        |
| `react-native-reanimated`        | 4.0.1     | [GitHub](https://github.com/software-mansion/react-native-reanimated)                  |
| `react-native-safe-area-context` | >=5.4.1   | [GitHub](https://github.com/th3rdwave/react-native-safe-area-context)                  |
| `react-native-svg`               | >=15.12.0 | [GitHub](https://github.com/software-mansion/react-native-svg)                         |
| `react-native-linear-gradient`   | 2.8.3     | [GitHub](https://github.com/react-native-linear-gradient/react-native-linear-gradient) |
| `react-intl`                     | >=7.1.0   | [GitHub](https://github.com/formatjs/formatjs)                                         |
| `date-fns`                       | >=4.0.0   | [GitHub](https://github.com/date-fns/date-fns)                                         |

## 🚀 Quick Start

### 1. Wrap your app with RottProvider

```tsx
import React from 'react'

import {RottProvider} from '@tansuk/rott-ui'

function App() {
  return (
    <RottProvider
      config={{
        options: {
          language: 'en',
          hasNotch: false,
          hasDynamicIsland: false,
        },
      }}>
      {/* Your app content */}
    </RottProvider>
  )
}
```

### 2. Use components in your screens

```tsx
import React from 'react'

import {Button, Container, Content, Header, Icon, Input, Label, Modal} from '@tansuk/rott-ui'

export default function MyScreen() {
  return (
    <Container noPadding>
      <Header
        height={40}
        logo='MY_LOGO'
        leftElement={<Icon name='MENU' height={24} width={24} />}
      />

      <Content flex={1} justifyContentCenter alignItemsCenter>
        <Input name='email' type='email' placeholder='Enter your email' />

        <Button
          size='full'
          variant='primary'
          fontSize='xl'
          marginTop={16}
          onPress={() => console.log('Button pressed!')}>
          Get Started
        </Button>

        <Label fontSize='lg' variant='secondary' marginTop={8}>
          Welcome to Rott UI
        </Label>
      </Content>
    </Container>
  )
}
```

## 🎨 Type-Safe Theming

Create a `rott.config.ts` file in your project root for type-safe theming:

```typescript
import {defineRottConfig} from '@tansuk/rott-ui'

export const config = defineRottConfig({
  colors: {
    brandPrimary: '#123456',
    brandAccent: '#ff00aa',
    customButton: '#00ff00',
  },
} as const)
```

Add the path mapping to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "rott.config": ["./rott.config.ts"]
    }
  }
}
```

Now your custom colors are available with full autocomplete:

```tsx
<Button variant="brandPrimary">Primary Button</Button>
<Button variant="customButton">Custom Button</Button>
```

## 🧩 Available Components

### Layout & Structure

- **Container** - Main wrapper with safe area handling
- **Content** - Scrollable content areas with keyboard handling
- **Header** - Navigation headers with logo and action buttons
- **Item** - Flexible layout container
- **Separator** - Visual dividers and spacers

### Navigation & Actions

- **Button** - Primary action buttons with icons and images
- **Pressable** - Custom touchable areas
- **Tab** - Tab navigation items
- **TabWidget** - Complete tab navigation system
- **BottomMenu** - Bottom navigation with custom items

### Data Display

- **Label** - Text display with theming support
- **Icon** - SVG icon system with 117+ icons
- **Image** - Optimized image component
- **ImageBackground** - Background image containers
- **List** - High-performance lists with FlashList
- **EmptyState** - Empty state illustrations
- **Skeleton** - Loading state placeholders

### Input & Forms

- **Input** - Comprehensive input system supporting:
  - Text, Email, Password, Number inputs
  - Date/DateTime pickers
  - Masked inputs (phone, credit card, etc.)
  - Search with autocomplete
  - Textarea with auto-resize
- **Toggle** - Switch/toggle components
- **FormContainer** - Form layout wrapper

### Feedback & Overlays

- **Modal** - Full-screen and partial modals
- **Alert** - Simple alert messages
- **AlertDialog** - Confirmation dialogs with actions
- **ActionMenu** - Context menus and action sheets
- **Notification** - Toast notifications
- **Result** - Success/error result pages
- **Timer** - Countdown and timer components

### Utilities

- **Common** - Shared UI patterns (CommonItem, CommonItemContainer)

## 📱 Real-World Example

Here's a complete example from our consumer app:

```tsx
import {
  BottomMenu,
  BottomMenuItemModel,
  Button,
  Container,
  Content,
  Header,
  Input,
  Modal,
} from '@tansuk/rott-ui'

export default function EntryScreen() {
  const menuItems: BottomMenuItemModel[] = [
    {
      icon: {name: 'FAST', noStroke: true, mode: 'fill'},
      title: 'Fast',
      onPress: () => {},
    },
    {
      icon: {name: 'LOCATION', noStroke: true},
      title: 'Near ATM',
      onPress: () => {},
    },
    {
      image: {name: 'QR_BUTTON', width: 56, height: 56},
      containerStyle: {top: -24},
      onPress: () => {},
    },
  ]

  return (
    <Container noPadding>
      <Header height={40} logo='COMPANY_LOGO' rightElement={<NotificationIcon />} />

      <Content flex={1} useBottomInset marginBottom={88}>
        <Input
          name='date'
          type='date'
          mode='datetime'
          value={new Date().toISOString()}
          onDateChange={(date) => console.log(date)}
        />

        <Button
          size='full'
          variant='primary'
          fontSize='xl'
          leftImage={{
            name: 'LOGO',
            absolute: true,
            width: 48,
            height: 48,
          }}
          rightIcon={{
            name: 'ARROW_RIGHT',
            variant: 'primary',
            mode: 'fill',
            absolute: true,
          }}
          onPress={() => {}}>
          Get Started
        </Button>
      </Content>

      <BottomMenu menuItems={menuItems} />
    </Container>
  )
}
```

## 🔧 Advanced Features

### Modal System

```tsx
Modal.showModal({
  id: 'settings',
  height: 70,
  slideToClose: true,
  backgroundColor: 'grey-900',
  header: {
    title: 'Settings',
    rightIcon: {
      name: 'CLOSE',
      onPress: () => Modal.hideModal('settings'),
    },
  },
  children: <SettingsContent />,
})
```

### Alert Dialogs

```tsx
AlertDialog.show({
  title: 'Confirm Action',
  text: 'Are you sure you want to continue?',
  buttons: [
    {
      variant: 'primary',
      size: 'full',
      onPress: () => console.log('Confirmed'),
    },
    {
      variant: 'secondary',
      size: 'full',
      onPress: () => AlertDialog.hide(),
    },
  ],
})
```

### Input Variants

```tsx
{
  /* Date Input */
}
;<Input type='date' mode='datetime' onDateChange={(date) => console.log(date)} />

{
  /* Masked Phone Input */
}
;<Input type='phone' mask='+1 ([000]) [000]-[0000]' onChangeText={(text) => console.log(text)} />

{
  /* Search with Autocomplete */
}
;<Input type='search' placeholder='Search...' onSearch={(query) => console.log(query)} />
```

## 🤝 Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## 📄 License

MIT

---

Made with ❤️ by [Doğukan Tansuk](https://github.com/Tans-uk/rott-ui)
