---
sidebar_position: 2
title: Quick Start
description: Build your first screen with Rott UI in 5 minutes
---

# Quick Start

This guide will help you build your first screen with Rott UI in just 5 minutes.

## Step 1: Wrap Your App with RottProvider

```tsx title="App.tsx"
import React from 'react';
import { RottProvider } from '@tansuk/rott-ui';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  return (
    <RottProvider
      config={{
        options: {
          language: 'en',
        },
      }}
    >
      <LoginScreen />
    </RottProvider>
  );
}
```

## Step 2: Create Your First Screen

```tsx title="screens/LoginScreen.tsx"
import React, { useState } from 'react';
import {
  Container,
  Header,
  Content,
  Button,
  Input,
  Label,
  Icon,
} from '@tansuk/rott-ui';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container noPadding>
      <Header
        height={40}
        logo="COMPANY_LOGO"
        leftElement={<Icon name="MENU" height={24} width={24} />}
      />
      
      <Content flex={1} paddingHorizontal={24} paddingTop={40}>
        <Label 
          text="Welcome Back" 
          fontSize="3xl" 
          fontWeight="bold"
          marginBottom={32}
        />
        
        <Input
          name="email"
          type="email"
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          marginBottom={16}
        />
        
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          marginBottom={24}
        />
        
        <Button
          size="full"
          variant="primary"
          fontSize="lg"
          onPress={() => console.log('Login')}
        >
          Sign In
        </Button>
      </Content>
    </Container>
  );
}
```

## Step 3: Run Your App

```bash
# iOS
npm run ios

# Android
npm run android
```

## What You've Learned

- ✅ Set up `RottProvider`
- ✅ Use layout components (`Container`, `Header`, `Content`)
- ✅ Display text with `Label`
- ✅ Create forms with `Input`
- ✅ Add buttons with `Button`

## Troubleshooting

If icons do not render or you see a component error, verify the following:

- [ ] `react-native-svg` is installed as a peer dependency
- [ ] `react-native-svg-transformer` is installed as a dev dependency
- [ ] Metro config moves `svg` from `assetExts` to `sourceExts` (see [Installation - SVG Icon Support](/docs/getting-started/installation#configure-svg-icon-support))
- [ ] Babel plugins are in the correct order with `reanimated/plugin` last (see [Installation - Babel Plugins](/docs/getting-started/installation#configure-babel-plugins))
- [ ] If using `rott.config.ts`: `babel-plugin-module-resolver` is installed and configured (see [Installation - Module Resolver](/docs/getting-started/installation#babel-module-resolver))
- [ ] Metro cache is cleared after config changes: `npx react-native start --reset-cache`

## Next Steps

- **[Components](/docs/components/overview)** - Explore all 29 components
- **[Theming](/docs/theming/overview)** - Customize colors and styles
