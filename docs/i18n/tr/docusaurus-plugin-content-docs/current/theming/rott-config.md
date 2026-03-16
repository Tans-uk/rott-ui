---
sidebar_position: 4
title: rott.config.ts
description: Otomatik tamamlama ile tip güvenli tema yapılandırması
---

# rott.config.ts

`rott.config.ts` dosyası, özel temanız için tam TypeScript otomatik tamamlama desteğiyle Tailwind tarzı bir yapılandırma sistemi sağlar.

## Neden rott.config.ts?

- ✅ **Tip güvenli**: Tam TypeScript otomatik tamamlama
- ✅ **Merkezi**: Tek doğruluk kaynağı
- ✅ **Otomatik tamamlama**: Özel renkleriniz IDE'de görünür
- ✅ **Derleme zamanı**: Hataları çalışma zamanından önce yakalayın

## Kurulum

### Adım 1: rott.config.ts Oluşturun

Proje kök dizininizde bir `rott.config.ts` dosyası oluşturun:

```typescript title="rott.config.ts"
import { defineRottConfig } from '@tansuk/rott-ui';

export const config = defineRottConfig({
  colors: {
    brandPrimary: '#123456',
    brandSecondary: '#654321',
    brandAccent: '#ff00aa',
    customButton: '#00ff00',
    customBackground: '#f5f5f5',
  },
} as const);
```

### Adım 2: TypeScript Path Mapping Ekleyin

IDE'nin modülü çözümleyebilmesi için `tsconfig.json` dosyanıza path mapping ekleyin:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "paths": {
      "rott.config": ["./rott.config.ts"]
    }
  }
}
```

:::caution TypeScript path'leri yalnızca derleme zamanında geçerlidir
`tsconfig.json` path mapping'i IDE otomatik tamamlama ve tip kontrolü sağlar, ancak **çalışma zamanında** çalışmaz. Metro/Babel `rott.config`'i yalnızca `tsconfig.json` path'lerinden çözümleyemez. Aşağıdaki **Adım 2b**'yi de tamamlamanız gerekir.
:::

### Adım 2b: Babel Module Resolver Ekleyin (Çalışma Zamanı)

Metro'nun paketleme sırasında `rott.config`'i çözümleyebilmesi için `babel-plugin-module-resolver` yükleyin:

```bash npm2yarn
npm install babel-plugin-module-resolver --save-dev
```

`babel.config.js` dosyanıza alias ekleyin:

```js title="babel.config.js"
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
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
};
```

:::warning Eklenti Sırası
`react-native-reanimated/plugin` **her zaman** son eklenti olmalıdır. `module-resolver` ve diğer tüm eklentileri ondan önce yerleştirin. Tam eklenti sırası için [Kurulum - Babel Eklentileri](/docs/getting-started/installation#babel-module-resolver) bölümüne bakın.
:::

### Adım 3: Özel Temanızı Kullanın

Artık özel renkleriniz tam otomatik tamamlama desteğine sahip:

```tsx
import { Button, Label } from '@tansuk/rott-ui';

<Button variant="brandPrimary">Primary Button</Button>
<Button variant="brandSecondary">Secondary Button</Button>
<Button variant="customButton">Custom Button</Button>
<Label variant="brandAccent">Accent Text</Label>
```

## Yapılandırma Seçenekleri

### Renkler

Varsayılan paleti genişleten özel renkler tanımlayın:

```typescript
export const config = defineRottConfig({
  colors: {
    // Marka renkleriniz
    brandPrimary: '#00a9ce',
    brandSecondary: '#ffc72c',
    brandAccent: '#3fb618',
    
    // Bileşene özel renkler
    buttonPrimary: '#0098b8',
    buttonSecondary: '#f5bb00',
    
    // Anlamsal renkler
    errorRed: '#f65353',
    successGreen: '#3fb618',
    warningOrange: '#ff7518',
    
    // Arka plan renkleri
    backgroundLight: '#ffffff',
    backgroundDark: '#1a1a1a',
    
    // Metin renkleri
    textPrimary: '#223f46',
    textSecondary: '#a1adaf',
  },
} as const);
```

### Görseller

Temanıza özel görseller ekleyin:

```typescript
export const config = defineRottConfig({
  colors: { /* ... */ },
  images: {
    logo: require('./assets/logo.png'),
    background: require('./assets/background.png'),
    placeholder: require('./assets/placeholder.png'),
  },
} as const);
```

Ardından bileşenlerde kullanın:

```tsx
<Image name="logo" width={100} height={100} />
<Header logo="logo" />
```

:::tip Sıfır yapılandırma alternatifi: Varlık Otomatik Keşfi
Görselleri ve ikonları manuel olarak tanımlamak yerine **Varlık Otomatik Keşfi** kullanabilirsiniz. Metro yapılandırmanıza `withRottAssets()` sarmalayıcısını ekleyin ve dosyaları `src/assets/images/` veya `src/assets/icons/svg/` klasörlerine bırakın. Otomatik olarak taranır ve dosya adıyla kullanılabilir olurlar (örn. `my-logo.png` → `name="my-logo"`). Aşağıdaki [Varlık Otomatik Keşfi](#asset-auto-discovery) bölümüne bakın.
:::

### İkonlar

Özel SVG ikonlar ekleyin:

:::warning SVG Dönüştürücü Gerekli
Özel SVG ikonlar için `react-native-svg-transformer` kurulu olmalı ve Metro yapılandırmanızda SVG kurulumu bulunmalıdır. Bunlar olmadan `require('./path/to/icon.svg')` çalışma zamanında başarısız olur. Kurulum talimatları için [Kurulum - SVG İkon Desteği](/docs/getting-started/installation#configure-svg-icon-support) bölümüne bakın.
:::

```typescript
export const config = defineRottConfig({
  colors: { /* ... */ },
  icons: {
    customIcon: require('./assets/icons/custom.svg'),
    brandIcon: require('./assets/icons/brand.svg'),
  },
} as const);
```

Yerleşik ikonlar gibi kullanın:

```tsx
<Icon name="customIcon" width={24} height={24} />
<Button leftIcon={{ name: 'brandIcon', width: 20, height: 20 }}>
  Button with Custom Icon
</Button>
```

## Varlık Otomatik Keşfi

Varlık Otomatik Keşfi, görselleri ve ikonları `rott.config.ts` içinde **manuel olarak tanımlamadan** kullanmanızı sağlar. Dosyaları doğru klasörlere ekleyin, otomatik olarak kaydedilirler.

### Kurulum

1. Metro yapılandırmanıza `withRottAssets()` sarmalayıcısını ekleyin:

```js title="metro.config.js"
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')
const { withRottAssets } = require('@tansuk/rott-ui/metro')

const defaultConfig = getDefaultConfig(__dirname)
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
}

module.exports = withRottAssets(mergeConfig(defaultConfig, config), {
  projectRoot: __dirname,
})
```

2. Görselleri `src/assets/images/` klasörüne ekleyin (`.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`)
3. İkonları `src/assets/icons/svg/` klasörüne ekleyin (`.svg`)
4. Metro'yu yeniden başlatın (`npx react-native start --reset-cache`)

### Kullanım

Varlıkları **uzantısız dosya adı** ile kullanın:

```tsx
<Image name="my-logo" />
<Icon name="arrow-right" />
```

### TypeScript Otomatik Tamamlama

Sarmalayıcı otomatik tamamlama için `.rott/consumer-assets.d.ts` dosyası oluşturur. `tsconfig.json` dosyanıza ekleyin:

```json
{
  "include": ["**/*.ts", "**/*.tsx", ".rott/**/*.d.ts"]
}
```

Varlıkları ekledikten sonra TypeScript sunucusunu yeniden başlatın (`Cmd+Shift+P` → "TypeScript: Restart TS Server").

### Varsayılan Dizinler

| Tür   | Yol                       |
| ------ | ------------------------- |
| Görseller | `src/assets/images/`      |
| İkonlar  | `src/assets/icons/svg/`   |

Seçeneklerle geçersiz kılın: `withRottAssets(config, { imagesDir: 'assets/img', iconsDir: 'assets/ico' })`

### Retina Varyantları

`@2x` ve `@3x` varyantları (örn. `logo@2x.png`) atlanır; yalnızca temel dosya kaydedilir.

---

## Boş Yapılandırma

Yalnızca tüketici tarafından taranan varlıkları (kütüphane varsayılanları olmadan) istediğinizde **boş yapılandırma** kullanabilirsiniz:

```typescript title="rott.config.ts"
import { defineRottConfig } from '@tansuk/rott-ui';

export const config = defineRottConfig({} as const);
```

Boş yapılandırma ile:

- **Görseller & İkonlar**: Yalnızca `src/assets/` taramanızdan gelen varlıklar (varsayılan kütüphane varlıkları yok)
- **Renkler, fontlar vb.**: Varsayılan tema değerleri yine kullanılır
- **Otomatik tamamlama**: Yalnızca tüketici varlık adlarınız `Image` ve `Icon` için görünür

Kütüphane varsayılanları artı özel varlıklarınızı istediğinizde `...defaultThemeConfig` kullanın:

```typescript
import { defaultThemeConfig, defineRottConfig } from '@tansuk/rott-ui';

export const config = defineRottConfig({
  ...defaultThemeConfig,
  colors: { brandPrimary: '#123456' },
} as const);
```

---

## Gelişmiş Yapılandırma

### Font Özelleştirme

```typescript
export const config = defineRottConfig({
  colors: { /* ... */ },
  fontFamilies: {
    regular: 'YourFont-Regular',
    bold: 'YourFont-Bold',
    medium: 'YourFont-Medium',
  },
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 28,
    xxxl: 40,
  },
} as const);
```

### Referans Cihaz

Duyarlı ölçeklendirme için referans cihazı özelleştirin:

```typescript
export const config = defineRottConfig({
  referenceDevice: {
    width: 375,  // iPhone SE genişliği
    height: 667, // iPhone SE yüksekliği
  },
  colors: { /* ... */ },
} as const);
```

## Tam Örnek

```typescript title="rott.config.ts"
import { defineRottConfig } from '@tansuk/rott-ui';

export const config = defineRottConfig({
  referenceDevice: {
    width: 390,
    height: 844,
  },
  options: {
    language: 'en',
  },
  colors: {
    // Marka renkleri
    brandPrimary: '#00a9ce',
    brandSecondary: '#ffc72c',
    brandAccent: '#3fb618',
    
    // UI renkleri
    uiBackground: '#ffffff',
    uiSurface: '#f5f5f5',
    uiBorder: '#e0e0e0',
    
    // Metin renkleri
    textPrimary: '#223f46',
    textSecondary: '#a1adaf',
    textDisabled: '#cccccc',
    
    // Anlamsal renkler
    errorRed: '#f65353',
    successGreen: '#3fb618',
    warningOrange: '#ff7518',
    infoBlue: '#3fb6d2',
  },
  images: {
    logo: require('./assets/images/logo.png'),
    logoWhite: require('./assets/images/logo-white.png'),
    splash: require('./assets/images/splash.png'),
  },
  icons: {
    customHome: require('./assets/icons/home.svg'),
    customProfile: require('./assets/icons/profile.svg'),
  },
  fontFamilies: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    bold: 'Inter-Bold',
  },
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 24,
    xxxl: 36,
  },
  goBack: () => {
    // Custom navigation logic
    console.log('Navigate back');
  },
} as const);
```

## TypeScript Avantajları

`rott.config.ts` ile şunları elde edersiniz:

1. **Otomatik tamamlama**: Özel renk adlarınız IDE'de görünür
2. **Tip güvenliği**: Yazım hatalarını derleme zamanında yakalayın
3. **Yeniden düzenleme**: Renkleri uygulamanız genelinde güvenle yeniden adlandırın
4. **Belgeleme**: Kendi kendini belgeleyen renk paleti

## Çalışma Zamanı Yapılandırmasından Geçiş

Şu anda çalışma zamanı yapılandırması kullanıyorsanız:

```tsx
// Eski yöntem (çalışma zamanı)
<RottProvider
  config={{
    colors: { brandPrimary: '#123456' }
  }}
>
```

Şu şekilde geçirin:

```typescript
// Yeni yöntem (derleme zamanı)
// rott.config.ts
export const config = defineRottConfig({
  colors: { brandPrimary: '#123456' },
} as const);

// App.tsx
<RottProvider>
  <YourApp />
</RottProvider>
```

## Sonraki Adımlar

- **[Renkler](/docs/theming/colors)** - Tam renk sistemi
- **[Tipografi](/docs/theming/typography)** - Font yapılandırması
- **[Yapılandırma](/docs/getting-started/configuration)** - RottProvider kurulumu
