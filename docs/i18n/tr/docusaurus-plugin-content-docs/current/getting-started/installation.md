---
sidebar_position: 1
title: Kurulum
description: Rott UI ve bağımlılıklarını yükleyin
---

# Kurulum

Bu rehber, React Native projenize Rott UI ve gerekli tüm bağımlılıkları kurmanıza yardımcı olacaktır.

## Ön Koşullar

Rott UI kurmadan önce şunların yüklü olduğundan emin olun:

- **Node.js** 18.0 veya üzeri
- **React Native** 0.70 veya üzeri
- **React** 18.0 veya üzeri
- Bir React Native projesi (Expo veya React Native CLI ile)

## Rott UI Kurulumu

Tercih ettiğiniz paket yöneticisi ile Rott UI paketini yükleyin:

```bash npm2yarn
npm install @tansuk/rott-ui
```

## Peer Bağımlılıkları

Rott UI tam işlevsellik için birçok peer bağımlılığı gerektirir. Hepsini tek seferde yükleyin:

```bash npm2yarn
npm install react react-native react-intl date-fns \
  @shopify/flash-list react-native-reanimated \
  react-native-safe-area-context react-native-svg \
  react-native-linear-gradient react-native-mask-input \
  react-native-device-info react-native-tab-view \
  react-native-toast-notifications react-native-keyboard-controller \
  react-native-edge-to-edge react-native-worklets \
  react-native-select-contact @react-native-community/netinfo
```

### Temel Bağımlılıklar

| Paket                          | Amaç                             | Sürüm   | Tip                     |
| ------------------------------ | -------------------------------- | ------- | ----------------------- |
| `@shopify/flash-list`          | Yüksek performanslı listeler     | ≥1.8.0  | peer                    |
| `react-native-reanimated`      | Akıcı animasyonlar               | 4.0.1   | peer                    |
| `react-native-safe-area-context` | Güvenli alan desteği           | ≥5.4.1  | peer                    |
| `react-native-svg`             | SVG ikon desteği                 | ≥15.12.0| peer                    |
| `react-intl`                   | Uluslararasılaştırma             | ≥7.1.0  | peer                    |
| `date-fns`                     | Tarih biçimlendirme              | ≥4.0.0  | peer                    |
| `react-native-svg-transformer`  | SVG → React bileşeni dönüşümü    | ≥5.0.0  | devDependency           |
| `babel-plugin-module-resolver` | rott.config.ts runtime alias     | ≥5.0.0  | devDependency (isteğe bağlı) |

## Platform Kurulumu

### iOS

Bağımlılıkları yükledikten sonra iOS pod'larını kurun:

```bash
cd ios && pod install && cd ..
```

### Android

`android/build.gradle` dosyanızda minimum SDK sürümünün şu değerlerde olduğundan emin olun:

```gradle
buildscript {
    ext {
        minSdkVersion = 21
        compileSdkVersion = 34
        targetSdkVersion = 34
    }
}
```

## SVG İkon Desteğini Yapılandırın

Rott UI'nin yerleşik ikonları ve özel SVG ikonları React bileşenleri olarak yüklenir. React Native varsayılan olarak SVG importlarını desteklemez; bu yüzden `react-native-svg-transformer` kurup Metro yapılandırmasını güncellemeniz gerekir.

### react-native-svg-transformer Kurulumu

```bash npm2yarn
npm install react-native-svg-transformer --save-dev
```

### Metro Yapılandırmasını Güncelleyin

SVG transformer kullanmak için `metro.config.js` oluşturun veya güncelleyin:

```js title="metro.config.js"
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config')
const {withRottAssets} = require('@tansuk/rott-ui/metro')

const defaultConfig = getDefaultConfig(__dirname)
const {assetExts, sourceExts} = defaultConfig.resolver

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
}

module.exports = withRottAssets(mergeConfig(defaultConfig, config), {
  projectRoot: __dirname,
})
```

:::tip Varlık Otomatik Keşfi
`withRottAssets()` sarmalayıcısı **Varlık Otomatik Keşfi**ni etkinleştirir: `src/assets/images/` içindeki görseller ve `src/assets/icons/svg/` içindeki ikonlar otomatik taranır ve dosya adıyla kullanılabilir. Bkz. [rott.config.ts - Varlık Otomatik Keşfi](/docs/theming/rott-config#asset-auto-discovery).
:::

:::info SVG transformer neden gerekli?
Varsayılan olarak Metro `.svg` dosyalarını statik varlık (görsel gibi) olarak işler. `svg`'yi `assetExts`'ten `sourceExts`'e taşımak, SVG transformer'ın `.svg` dosyalarını bundle sırasında React bileşenlerine dönüştürmesini sağlar. Bu kurulum olmadan, SVG ikon render eden herhangi bir bileşen (Icon, Header, Input, ikonlu Button vb.) render hatası verir.
:::

## Babel Eklentilerini Yapılandırın

`babel.config.js` dosyanıza gerekli Babel eklentilerini ekleyin:

```js title="babel.config.js"
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets/plugin',
    'react-native-reanimated/plugin', // En sonda olmalı!
  ],
}
```

:::warning Eklenti Sırası
`react-native-reanimated/plugin` **her zaman** plugins dizisinin **son öğesi** olmalıdır. Diğer tüm eklentiler (worklets, module-resolver vb.) ondan önce gelmelidir.
:::

### İsteğe Bağlı: rott.config.ts Runtime Çözümlemesi {#babel-module-resolver}

[`rott.config.ts`](/docs/theming/rott-config) ile tip güvenli temalandırma kullanıyorsanız, `tsconfig.json` path eşlemesi yalnızca derleme zamanında çalışır. Metro/Babel'in modülü **runtime**'da çözümlemesi için `babel-plugin-module-resolver` da gerekir:

```bash npm2yarn
npm install babel-plugin-module-resolver --save-dev
```

Ardından `babel.config.js` dosyanızı güncelleyin:

```js title="babel.config.js"
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets/plugin',
    [
      'module-resolver',
      {
        alias: {
          'rott.config': './rott.config.ts',
        },
        extensions: ['.ts', '.tsx', '.js', '.json'],
      },
    ],
    'react-native-reanimated/plugin', // En sonda olmalı!
  ],
}
```

:::tip
`rott.config.ts` kullanmıyorsanız bu adımı atlayabilirsiniz. Tam kurulum için [rott.config.ts](/docs/theming/rott-config) sayfasına bakın.
:::

## Kurulumu Doğrulayın

Her şeyin doğru kurulduğunu test etmek için basit bir dosya oluşturun:

```tsx title="App.tsx"
import React from 'react'

import {Button, RottProvider} from '@tansuk/rott-ui'

export default function App() {
  return (
    <RottProvider>
      <Button variant='primary' onPress={() => console.log('Çalışıyor!')}>
        Test Butonu
      </Button>
    </RottProvider>
  )
}
```

## Sonraki Adımlar

Rott UI kuruldu. Şimdi:

1. **[Hızlı Başlangıç](/docs/getting-started/quick-start)** - İlk ekranınızı oluşturun
2. **[Bileşenler](/docs/components/overview)** - Tüm bileşenleri keşfedin

## Yardım

- [GitHub Issues](https://github.com/Tans-uk/rott-ui/issues)
- [Discussions](https://github.com/Tans-uk/rott-ui/discussions)
