---
sidebar_position: 1
title: Kurulum
description: Rott UI'ı ve peer dependency'lerini kurun
---

# Kurulum

Bu rehber, Rott UI'ı ve gerekli tüm dependency'leri React Native projenize kurmanıza yardımcı olacak.

## Ön Koşullar {#prerequisites}

Rott UI'ı kurmadan önce şunlara sahip olduğunuzdan emin olun:

- **Node.js** 18.0 veya üzeri
- **React Native** 0.70 veya üzeri
- **React** 18.0 veya üzeri
- Bir React Native projesi (Expo ya da React Native CLI ile)

## Rott UI'ı Kurun {#install-rott-ui}

Rott UI package'ını tercih ettiğiniz package manager ile kurun:

```bash npm2yarn
npm install @tansuk/rott-ui
```

## Peer Dependency'leri Kurun {#install-peer-dependencies}

Rott UI'ın tüm işlevleriyle çalışması için birkaç peer dependency gerekir. Hepsini tek seferde kurun:

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

### Temel Dependency'ler {#key-dependencies}

| Package                          | Amaç                            | Sürüm    | Tip                      |
| -------------------------------- | ------------------------------- | -------- | ------------------------ |
| `@shopify/flash-list`            | Yüksek performanslı listeler    | ≥1.8.0   | peer                     |
| `react-native-reanimated`        | Akıcı animasyonlar              | 4.0.1    | peer                     |
| `react-native-safe-area-context` | Safe area yönetimi              | ≥5.4.1   | peer                     |
| `react-native-svg`               | SVG ikon desteği                | ≥15.12.0 | peer                     |
| `react-intl`                     | Internationalization            | ≥7.1.0   | peer                     |
| `date-fns`                       | Tarih biçimlendirme             | ≥4.0.0   | peer                     |
| `react-native-svg-transformer`   | SVG → React component dönüşümü  | ≥5.0.0   | devDependency            |
| `babel-plugin-module-resolver`   | rott.config.ts runtime alias'ı  | ≥5.0.0   | devDependency (isteğe bağlı) |

## Platform'a Özel Kurulum {#platform-specific-setup}

### iOS {#ios}

Dependency'leri kurduktan sonra iOS pod'larını kurun:

```bash
cd ios && pod install && cd ..
```

### Android {#android}

`android/build.gradle` dosyanızda aşağıdaki minimum SDK sürümlerinin tanımlı olduğundan emin olun:

```gradle
buildscript {
    ext {
        minSdkVersion = 21
        compileSdkVersion = 34
        targetSdkVersion = 34
    }
}
```

## SVG İkon Desteğini Ayarlayın {#configure-svg-icon-support}

Rott UI'ın built-in ikonları ve özel SVG ikonlarınız React component'i olarak yüklenir. React Native, SVG import'larını kendiliğinden desteklemez; bu yüzden `react-native-svg-transformer` package'ını kurmanız ve Metro config'inizi güncellemeniz gerekir.

### react-native-svg-transformer'ı Kurun {#install-react-native-svg-transformer}

```bash npm2yarn
npm install react-native-svg-transformer --save-dev
```

### Metro Config'ini Güncelleyin {#update-metro-configuration}

SVG transformer'ı kullanmak için `metro.config.js` dosyanızı oluşturun ya da güncelleyin:

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

:::tip Asset Auto-Discovery
`withRottAssets()` wrapper'ı **Asset Auto-Discovery** özelliğini etkinleştirir: `src/assets/images/` içindeki görseller ve `src/assets/icons/svg/` içindeki ikonlar otomatik olarak taranır ve dosya adlarıyla kullanılabilir hale gelir. Bkz. [rott.config.ts - Asset Auto-Discovery](/docs/theming/rott-config#asset-auto-discovery).
:::

:::info SVG transformer neden gerekli?
Metro, default olarak `.svg` dosyalarını (görseller gibi) statik asset olarak ele alır. `svg` uzantısını `assetExts` listesinden çıkarıp `sourceExts` listesine taşımak, SVG transformer'ın `.svg` dosyalarını bundle sırasında React component'lerine dönüştürmesini sağlar. Bu ayar yapılmazsa SVG ikon render eden her component (Icon, Header, Input, ikonlu Button vb.) render hatası fırlatır.
:::

## Babel Plugin'lerini Ayarlayın {#configure-babel-plugins}

Gerekli Babel plugin'lerini `babel.config.js` dosyanıza ekleyin:

```js title="babel.config.js"
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets/plugin',
    'react-native-reanimated/plugin', // En sonda olmalı!
  ],
}
```

:::warning Plugin Sırası
`react-native-reanimated/plugin`, plugins array'inin **her zaman** **son öğesi** olmalıdır. Diğer tüm plugin'ler (worklets, module-resolver vb.) ondan önce gelmelidir.
:::

### İsteğe Bağlı: rott.config.ts Runtime Çözümlemesi {#babel-module-resolver}

Type-safe theming için [`rott.config.ts`](/docs/theming/rott-config) kullanıyorsanız, `tsconfig.json` path mapping'i yalnızca derleme zamanında çalışır. Metro/Babel'ın modülü **runtime**'da çözümleyebilmesi için `babel-plugin-module-resolver` package'ına da ihtiyacınız var:

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
`rott.config.ts` kullanmıyorsanız bu adımı atlayabilirsiniz. Kurulum talimatlarının tamamı için [rott.config.ts](/docs/theming/rott-config) sayfasına bakın.
:::

#### Expo (babel-preset-expo) {#expo-babel-preset-expo}

Expo altında `babel-preset-expo`, projenin babel plugin'lerini (`module-resolver` dahil) `node_modules` içindeki dosyalara **uygulamaz**. Bu yüzden `@tansuk/rott-ui` içine derlenmiş olan `require('rott.config')` hiçbir zaman yeniden yazılmaz ve runtime'da çözümlenemez — rott-ui sessizce default theme'e fallback yapar.

Expo için `rott.config` modülünü bunun yerine Metro üzerinden, `metro.config.js` içinde çözümleyin:

```js title="metro.config.js"
const path = require('path')

// ...mevcut config kurulumunuz...

const defaultResolveRequest = config.resolver.resolveRequest
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'rott.config') {
    return {type: 'sourceFile', filePath: path.resolve(__dirname, 'rott.config.ts')}
  }
  return (defaultResolveRequest ?? context.resolveRequest)(context, moduleName, platform)
}
```

:::warning
Özel theme'iniz Expo altında uygulanmıyorsa (renkler rott-ui default'larıyla render ediliyorsa), bunun olağan nedeni bu eksik Metro `resolveRequest` ayarıdır. Development sırasında ayrıca `[rott-ui] 'rott.config' could not be resolved at runtime` uyarısını da görürsünüz.
:::

## Kurulumu Doğrulayın {#verify-installation}

Her şeyin doğru kurulduğunu doğrulamak için basit bir test dosyası oluşturun:

```tsx title="App.tsx"
import React from 'react'

import {Button, RottProvider} from '@tansuk/rott-ui'

export default function App() {
  return (
    <RottProvider>
      <Button variant='primary' onPress={() => console.log('Works!')}>
        Test Button
      </Button>
    </RottProvider>
  )
}
```

## Sonraki Adımlar {#next-steps}

Rott UI kurulduğuna göre artık şunlara hazırsınız:

1. **[Hızlı Başlangıç](/docs/getting-started/quick-start)** - İlk ekranınızı oluşturun
2. **[Component'ler](/docs/components/overview)** - Tüm component'leri keşfedin

## Yardıma mı İhtiyacınız Var? {#need-help}

- [GitHub Issues](https://github.com/Tans-uk/rott-ui/issues) sayfasına göz atın
- [Discussions](https://github.com/Tans-uk/rott-ui/discussions) bölümüne katılın
