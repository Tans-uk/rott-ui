---
sidebar_position: 4
title: rott.config.ts
description: Autocomplete destekli, type-safe theme config'i
---

# rott.config.ts

`rott.config.ts` dosyası, özel theme'iniz için tam TypeScript autocomplete desteğine sahip, Tailwind tarzı bir config sistemi sunar.

## Neden rott.config.ts? {#why-rottconfigts}

- ✅ **Type-safe**: Tam TypeScript autocomplete desteği
- ✅ **Merkezi**: Tek doğruluk kaynağı
- ✅ **Autocomplete**: Özel renkleriniz IDE'de görünür
- ✅ **Compile-time**: Hataları runtime'dan önce yakalayın

## Kurulum {#setup}

### Adım 1: rott.config.ts Oluşturun {#step-1-create-rottconfigts}

Proje kök dizininizde bir `rott.config.ts` dosyası oluşturun:

```typescript title="rott.config.ts"
import { defineRottConfig } from '@tansuk/rott-ui/config';

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

:::note
`defineRottConfig`'i package root'undan değil, `@tansuk/rott-ui/config`'den import edin.
Root entry'ye, initialization henüz bitmeden yeniden girilebilir (require cycle
`index → theme → require('rott.config') → index`); ayrı `/config`
subpath'i bunu önler.
:::

### Adım 2: TypeScript Path Mapping Ekleyin {#step-2-add-typescript-path-mapping}

IDE'nin modülü resolve edebilmesi için path mapping'i `tsconfig.json` dosyanıza ekleyin:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "paths": {
      "rott.config": ["./rott.config.ts"]
    }
  }
}
```

:::caution TypeScript path'leri yalnızca compile-time'da geçerlidir
`tsconfig.json` path mapping'i IDE autocomplete'i ve type checking sağlar, ancak runtime'da **çalışmaz**. Metro/Babel, `rott.config`'i yalnızca `tsconfig.json` path'lerine bakarak resolve edemez. Aşağıdaki **Adım 2b**'yi de tamamlamanız gerekir.
:::

### Adım 2b: Babel Module Resolver Ekleyin (Runtime) {#step-2b-add-babel-module-resolver-runtime}

Metro'nun `rott.config`'i bundle sırasında resolve edebilmesi için `babel-plugin-module-resolver`'ı kurun:

```bash npm2yarn
npm install babel-plugin-module-resolver --save-dev
```

Alias'ı `babel.config.js` dosyanıza ekleyin:

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
    'react-native-reanimated/plugin', // Mutlaka en sonda olmalı!
  ],
};
```

:::warning Plugin Sırası
`react-native-reanimated/plugin` **her zaman** son plugin olmalıdır. `module-resolver`'ı ve diğer tüm plugin'leri ondan önce yerleştirin. Tam plugin sırası için [Kurulum - Babel Plugin'leri](/docs/getting-started/installation#babel-module-resolver) bölümüne bakın.
:::

### Adım 3: Özel Theme'inizi Kullanın {#step-3-use-your-custom-theme}

Artık özel renkleriniz tam autocomplete desteğine sahip:

```tsx
import { Button, Label } from '@tansuk/rott-ui';

<Button variant="brandPrimary">Primary Button</Button>
<Button variant="brandSecondary">Secondary Button</Button>
<Button variant="customButton">Custom Button</Button>
<Label variant="brandAccent">Accent Text</Label>
```

## Config Seçenekleri {#configuration-options}

### Renkler {#colors}

Default paleti genişleten özel renkler tanımlayın:

```typescript
export const config = defineRottConfig({
  colors: {
    // Marka renkleriniz
    brandPrimary: '#00a9ce',
    brandSecondary: '#ffc72c',
    brandAccent: '#3fb618',
    
    // Component'e özel renkler
    buttonPrimary: '#0098b8',
    buttonSecondary: '#f5bb00',
    
    // Semantik renkler
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

### Görseller {#images}

Theme'inize özel görseller ekleyin:

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

Ardından bunları component'lerde kullanın:

```tsx
<Image name="logo" width={100} height={100} />
<Header logo="logo" />
```

:::tip Sıfır config alternatifi: Asset Auto-Discovery
Görselleri ve ikonları elle tanımlamak yerine **Asset Auto-Discovery** kullanabilirsiniz. `withRottAssets()` wrapper'ını Metro config'inize ekleyin ve dosyaları `src/assets/images/` veya `src/assets/icons/svg/` klasörüne bırakın. Dosyalar otomatik olarak taranır ve dosya adlarıyla kullanılabilir hale gelir (örn. `my-logo.png` → `name="my-logo"`). Aşağıdaki [Asset Auto-Discovery](#asset-auto-discovery) bölümüne bakın.
:::

### İkonlar {#icons}

Özel SVG ikonları ekleyin:

:::warning SVG Transformer Gerekli
Özel SVG ikonları için `react-native-svg-transformer`'ın kurulu olması ve Metro config'inizin SVG ayarlarını içermesi gerekir. Bu olmadan `require('./path/to/icon.svg')` runtime'da hata verir. Kurulum adımları için [Kurulum - SVG Icon Desteği](/docs/getting-started/installation#configure-svg-icon-support) bölümüne bakın.
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

Bunları built-in ikonlar gibi kullanın:

```tsx
<Icon name="customIcon" width={24} height={24} />
<Button leftIcon={{ name: 'brandIcon', width: 20, height: 20 }}>
  Button with Custom Icon
</Button>
```

## Asset Auto-Discovery {#asset-auto-discovery}

Asset Auto-Discovery, görselleri ve ikonları `rott.config.ts` içinde **elle tanımlamadan** kullanmanızı sağlar. Dosyaları doğru klasörlere ekleyin; otomatik olarak kaydedilirler.

### Kurulum {#setup-1}

1. `withRottAssets()` wrapper'ını Metro config'inize ekleyin:

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

### Kullanım {#usage}

Asset'leri **uzantısız dosya adıyla** kullanın:

```tsx
<Image name="my-logo" />
<Icon name="arrow-right" />
```

### TypeScript Autocomplete {#typescript-autocomplete}

Wrapper, autocomplete için `.rott/consumer-assets.d.ts` dosyasını üretir. Bunu `tsconfig.json` dosyanıza ekleyin:

```json
{
  "include": ["**/*.ts", "**/*.tsx", ".rott/**/*.d.ts"]
}
```

Asset ekledikten sonra TypeScript server'ını yeniden başlatın (`Cmd+Shift+P` → "TypeScript: Restart TS Server").

### Default Dizinler {#default-directories}

| Tip       | Yol                       |
| --------- | ------------------------- |
| Görseller | `src/assets/images/`      |
| İkonlar   | `src/assets/icons/svg/`   |

Seçeneklerle override edebilirsiniz: `withRottAssets(config, { imagesDir: 'assets/img', iconsDir: 'assets/ico' })`

### Retina Variant'ları {#retina-variants}

`@2x` ve `@3x` variant'ları (örn. `logo@2x.png`) atlanır; yalnızca ana dosya kaydedilir.

---

## Boş Config {#empty-config}

Yalnızca kendi projenizden taranan asset'leri (kütüphane default'ları olmadan) istiyorsanız **boş config** kullanabilirsiniz:

```typescript title="rott.config.ts"
import { defineRottConfig } from '@tansuk/rott-ui/config';

export const config = defineRottConfig({} as const);
```

Boş config ile:

- **Görseller ve İkonlar**: Yalnızca `src/assets/` taramanızdan gelen asset'ler (kütüphanenin default asset'leri olmadan)
- **Renkler, fontlar vb.**: Default theme değerleri kullanılmaya devam eder
- **Autocomplete**: `Image` ve `Icon` için yalnızca kendi asset adlarınız görünür

Kütüphane default'larına ek olarak kendi asset'lerinizi de istiyorsanız `...defaultThemeConfig` kullanın:

```typescript
import { defaultThemeConfig } from '@tansuk/rott-ui';
import { defineRottConfig } from '@tansuk/rott-ui/config';

export const config = defineRottConfig({
  ...defaultThemeConfig,
  colors: { brandPrimary: '#123456' },
} as const);
```

---

## İleri Düzey Config {#advanced-configuration}

### Font Özelleştirme {#font-customization}

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

### Referans Cihaz {#reference-device}

Responsive ölçekleme için referans cihazı özelleştirin:

```typescript
export const config = defineRottConfig({
  referenceDevice: {
    width: 375,  // iPhone SE genişliği
    height: 667, // iPhone SE yüksekliği
  },
  colors: { /* ... */ },
} as const);
```

## Tam Örnek {#complete-example}

```typescript title="rott.config.ts"
import { defineRottConfig } from '@tansuk/rott-ui/config';

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
    
    // Semantik renkler
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
    // Özel navigation mantığı
    console.log('Navigate back');
  },
} as const);
```

## TypeScript Avantajları {#typescript-benefits}

`rott.config.ts` ile şunları elde edersiniz:

1. **Autocomplete**: Özel renk adlarınız IDE'de görünür
2. **Type Safety**: Yazım hatalarını compile-time'da yakalayın
3. **Refactoring**: Renkleri uygulamanızın genelinde güvenle yeniden adlandırın
4. **Dokümantasyon**: Kendi kendini belgeleyen renk paleti

## Runtime Config'den Geçiş {#migration-from-runtime-config}

Şu anda runtime config kullanıyorsanız:

```tsx
// Eski yöntem (runtime)
<RottProvider
  config={{
    colors: { brandPrimary: '#123456' }
  }}
>
```

Şuna geçin:

```typescript
// Yeni yöntem (compile-time)
// rott.config.ts
export const config = defineRottConfig({
  colors: { brandPrimary: '#123456' },
} as const);

// App.tsx
<RottProvider>
  <YourApp />
</RottProvider>
```

## Sonraki Adımlar {#next-steps}

- **[Renkler](/docs/theming/colors)** - Kapsamlı renk sistemi
- **[Tipografi](/docs/theming/typography)** - Font config'i
- **[Configuration](/docs/getting-started/configuration)** - RottProvider kurulumu
