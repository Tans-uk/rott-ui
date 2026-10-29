---
sidebar_position: 3
title: Configuration
description: RottProvider'ı ayarlayın ve uygulamanızı özelleştirin
---

# Configuration

`RottProvider` component'ini kullanarak Rott UI'ı nasıl ayarlayacağınızı öğrenin.

## RottProvider {#rottprovider}

`RottProvider` component'i tüm uygulamanızı sarmalar ve theme config'i, cihaz algılama ve internationalization desteği sağlar.

## Temel Kurulum {#basic-setup}

```tsx title="App.tsx"
import React from 'react';
import { RottProvider } from '@tansuk/rott-ui';
import YourApp from './YourApp';

export default function App() {
  return (
    <RottProvider>
      <YourApp />
    </RottProvider>
  );
}
```

## Configuration Seçenekleri {#configuration-options}

### Dil {#language}

Uygulamanızın default dilini belirleyin:

```tsx
<RottProvider
  config={{
    options: {
      language: 'en', // 'en' veya 'tr'
    },
  }}
>
  <YourApp />
</RottProvider>
```

### Cihaz Özellikleri {#device-features}

Otomatik cihaz algılamayı override edin:

```tsx
<RottProvider
  config={{
    options: {
      hasNotch: true,
      hasDynamicIsland: false,
    },
  }}
>
  <YourApp />
</RottProvider>
```

### Özel Theme {#custom-theme}

Özel bir theme config'i verin:

```tsx
import { defaultThemeConfig } from '@tansuk/rott-ui';

<RottProvider
  config={{
    ...defaultThemeConfig,
    colors: {
      ...defaultThemeConfig.colors,
      primary: '#FF0000',
      secondary: '#00FF00',
    },
  }}
>
  <YourApp />
</RottProvider>
```

`RottProvider`'a verdiğiniz `config` (`colors`, `icons`, `images`, `fontSizes`
vb.) aktif theme ile merge edilir. [`rott.config.ts`](/docs/theming/rott-config) de kullanıyorsanız
**birincil kaynak `rott.config.ts`'tir ve key çakışmalarında her zaman o kazanır** —
`RottProvider config` üzerinden gelen değerler onu tamamlar, ancak orada zaten tanımlı
olan key'leri override etmez.

:::tip
**Stabil** bir `config` referansı verin — onu modül scope'unda tanımlayın ya da
`useMemo` ile memoize edin. Her render'da oluşturulan yeni bir inline obje (ör.
doğrudan JSX içinde yazılmış `config={{ ... }}`) theme'in her render'da yeniden
hesaplanmasına yol açar.
:::

## Tam Config {#complete-configuration}

```tsx
import React from 'react';
import { RottProvider, defaultThemeConfig } from '@tansuk/rott-ui';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';

export default function App() {
  return (
    <RottProvider
      config={{
        ...defaultThemeConfig,
        options: {
          language: 'en',
          hasNotch: true,
          hasDynamicIsland: false,
        },
        colors: {
          ...defaultThemeConfig.colors,
          // Özel renkler ekleyin
          brandPrimary: '#123456',
          brandSecondary: '#654321',
        },
        goBack: () => {
          // Özel geri navigation handler'ı
          console.log('Go back pressed');
        },
      }}
    >
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </RottProvider>
  );
}
```

## Config Seçenekleri {#config-options}

| Seçenek | Tip | Default | Açıklama |
|--------|------|---------|-------------|
| `options.language` | `string` | `'en'` | Uygulama dili |
| `options.hasNotch` | `boolean` | Otomatik algılanır | Cihazda notch olup olmadığı |
| `options.hasDynamicIsland` | `boolean` | Otomatik algılanır | Cihazda Dynamic Island olup olmadığı |
| `colors` | `Record<string, string>` | `defaultThemeConfig.colors` | Renk paleti |
| `images` | `Record<string, ImageSource>` | `defaultThemeConfig.images` | Görsel asset'leri |
| `icons` | `Record<string, ImageSource>` | `defaultThemeConfig.icons` | İkon asset'leri |
| `fontSizes` | `Record<string, number>` | `defaultThemeConfig.fontSizes` | Font boyutları |
| `goBack` | `() => void` | - | Özel geri handler'ı |

## Cihaz Algılama {#device-detection}

Rott UI, `react-native-device-info` kullanarak cihaz özelliklerini otomatik olarak algılar:

- **hasNotch**: Cihazda notch olup olmadığını algılar (iPhone X ve sonrası)
- **hasDynamicIsland**: Cihazda Dynamic Island olup olmadığını algılar (iPhone 14 Pro ve sonrası)

Bu değerlere uygulamanızın her yerinden `useRottContext` hook'u ile erişebilirsiniz:

```tsx
import { useRottContext } from '@tansuk/rott-ui';

function MyComponent() {
  const { hasNotch, hasDynamicIsland, language } = useRottContext();
  
  return (
    <View>
      <Text>Has Notch: {hasNotch ? 'Yes' : 'No'}</Text>
      <Text>Has Dynamic Island: {hasDynamicIsland ? 'Yes' : 'No'}</Text>
      <Text>Language: {language.name}</Text>
    </View>
  );
}
```

## Sonraki Adımlar {#next-steps}

- **[Theming](/docs/theming/overview)** - Theming sistemini öğrenin
- **[rott.config.ts](/docs/theming/rott-config)** - Type-safe theme config'i
- **[Component'ler](/docs/components/overview)** - Tüm component'leri keşfedin
