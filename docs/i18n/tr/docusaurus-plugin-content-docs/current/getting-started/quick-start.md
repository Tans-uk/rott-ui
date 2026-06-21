---
sidebar_position: 2
title: Hızlı Başlangıç
description: Rott UI ile 5 dakikada ilk ekranınızı oluşturun
---

# Hızlı Başlangıç

Bu rehber, Rott UI ile 5 dakikada ilk ekranınızı oluşturmanıza yardımcı olacaktır.

## Adım 1: Uygulamanızı RottProvider ile Sarın

```tsx title="App.tsx"
import React from 'react';
import { RottProvider } from '@tansuk/rott-ui';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  return (
    <RottProvider
      config={{
        options: {
          language: 'tr',
        },
      }}
    >
      <LoginScreen />
    </RottProvider>
  );
}
```

## Adım 2: İlk Ekranınızı Oluşturun

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
          text="Tekrar Hoş Geldiniz" 
          fontSize="3xl" 
          fontWeight="bold"
          marginBottom={32}
        />
        
        <Input
          name="email"
          type="email"
          placeholder="E-posta adresi"
          value={email}
          onChangeText={setEmail}
          marginBottom={16}
        />
        
        <Input
          name="password"
          type="password"
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          marginBottom={24}
        />
        
        <Button
          size="full"
          variant="primary"
          fontSize="lg"
          onPress={() => console.log('Giriş')}
        >
          Giriş Yap
        </Button>
      </Content>
    </Container>
  );
}
```

## Adım 3: Uygulamanızı Çalıştırın

```bash
# iOS
npm run ios

# Android
npm run android
```

## Öğrendikleriniz

- ✅ `RottProvider` kurulumu
- ✅ Layout bileşenleri (`Container`, `Header`, `Content`)
- ✅ `Label` ile metin gösterme
- ✅ `Input` ile form oluşturma
- ✅ `Button` ekleme

## Sorun Giderme

İkonlar görünmüyorsa veya bileşen hatası alıyorsanız şunları kontrol edin:

- [ ] `react-native-svg` peer bağımlılığı yüklü
- [ ] `react-native-svg-transformer` dev bağımlılığı yüklü
- [ ] Metro config'de `svg` `assetExts`'ten `sourceExts`'e taşınmış (bkz. [Kurulum - SVG İkon Desteği](/docs/getting-started/installation#configure-svg-icon-support))
- [ ] Babel eklentileri doğru sırada, `reanimated/plugin` en sonda (bkz. [Kurulum - Babel Eklentileri](/docs/getting-started/installation#configure-babel-plugins))
- [ ] `rott.config.ts` kullanıyorsanız: `babel-plugin-module-resolver` kurulu ve yapılandırılmış (bkz. [Kurulum - Module Resolver](/docs/getting-started/installation#babel-module-resolver))
- [ ] Config değişikliklerinden sonra Metro önbelleği temizlendi: `npx react-native start --reset-cache`

## Sonraki Adımlar

- **[Bileşenler](/docs/components/overview)** - 29 bileşeni keşfedin
- **[Temalandırma](/docs/theming/overview)** - Renkleri ve stilleri özelleştirin
