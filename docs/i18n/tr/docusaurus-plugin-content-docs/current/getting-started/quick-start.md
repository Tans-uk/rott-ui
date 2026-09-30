---
sidebar_position: 2
title: Hızlı Başlangıç
description: Rott UI ile ilk ekranınızı 5 dakikada oluşturun
---

# Hızlı Başlangıç

Bu rehber, Rott UI ile ilk ekranınızı yalnızca 5 dakikada oluşturmanıza yardımcı olacak.

## Adım 1: Uygulamanızı RottProvider ile Sarmalayın {#step-1-wrap-your-app-with-rottprovider}

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

## Adım 2: İlk Ekranınızı Oluşturun {#step-2-create-your-first-screen}

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

## Adım 3: Uygulamanızı Çalıştırın {#step-3-run-your-app}

```bash
# iOS
npm run ios

# Android
npm run android
```

## Neler Öğrendiniz {#what-youve-learned}

- ✅ `RottProvider` kurulumunu yapmak
- ✅ Layout component'lerini kullanmak (`Container`, `Header`, `Content`)
- ✅ `Label` ile metin göstermek
- ✅ `Input` ile form oluşturmak
- ✅ `Button` ile buton eklemek

## Sorun Giderme {#troubleshooting}

İkonlar render edilmiyorsa ya da bir component hatası görüyorsanız şunları kontrol edin:

- [ ] `react-native-svg` peer dependency olarak kurulu
- [ ] `react-native-svg-transformer` dev dependency olarak kurulu
- [ ] Metro config'i `svg` uzantısını `assetExts` listesinden `sourceExts` listesine taşıyor (bkz. [Kurulum - SVG İkon Desteği](/docs/getting-started/installation#configure-svg-icon-support))
- [ ] Babel plugin'leri doğru sırada ve `reanimated/plugin` en sonda (bkz. [Kurulum - Babel Plugin'leri](/docs/getting-started/installation#configure-babel-plugins))
- [ ] `rott.config.ts` kullanıyorsanız: `babel-plugin-module-resolver` kurulu ve ayarlanmış (bkz. [Kurulum - Module Resolver](/docs/getting-started/installation#babel-module-resolver))
- [ ] Config değişikliklerinden sonra Metro cache'i temizlenmiş: `npx react-native start --reset-cache`

## Sonraki Adımlar {#next-steps}

- **[Component'ler](/docs/components/overview)** - 29 component'in tamamını keşfedin
- **[Theming](/docs/theming/overview)** - Renkleri ve style'ları özelleştirin
