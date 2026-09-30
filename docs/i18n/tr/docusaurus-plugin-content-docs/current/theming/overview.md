---
sidebar_position: 1
title: Theming'e Genel Bakış
description: Rott UI theming sistemini anlamak
---

# Theming'e Genel Bakış

Rott UI; renkleri, tipografiyi, spacing'i ve daha fazlasını tüm uygulamanız genelinde özelleştirmenizi sağlayan güçlü ve type-safe bir theming sistemi sunar.

## Theming Felsefesi {#theming-philosophy}

Rott UI'ın theming sistemi şu ilkeler üzerine kurulmuştur:

1. **Type-Safe**: Autocomplete ile tam TypeScript desteği
2. **Merkezi**: Bir kez tanımlayın, her yerde kullanın
3. **Esnek**: Gerektiğinde component seviyesinde override edin
4. **Responsive**: Ekran boyutuna göre otomatik ölçekleme
5. **Tutarlı**: Tüm component'lerde ortak design token'ları

## Theme Config'i {#theme-configuration}

Theme'inizi iki şekilde tanımlayabilirsiniz:

### 1. RottProvider Config'i (Runtime) {#1-rottprovider-config-runtime}

Config'i doğrudan `RottProvider`'a verin:

```tsx
import { RottProvider, defaultThemeConfig } from '@tansuk/rott-ui';

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

### 2. rott.config.ts (Compile-Time) {#2-rottconfigts-compile-time}

Autocomplete destekli, type-safe theming için bir `rott.config.ts` dosyası oluşturun:

```tsx title="rott.config.ts"
import { defineRottConfig } from '@tansuk/rott-ui';

export const config = defineRottConfig({
  colors: {
    brandPrimary: '#123456',
    brandAccent: '#ff00aa',
    customButton: '#00ff00',
  },
} as const);
```

Ardından özel renklerinizi tam autocomplete desteğiyle kullanın:

```tsx
<Button variant="brandPrimary">Primary Button</Button>
<Button variant="customButton">Custom Button</Button>
```

[rott.config.ts hakkında daha fazla bilgi →](/docs/theming/rott-config)

## Theme Yapısı {#theme-structure}

Theme config'i şunları içerir:

### Renkler {#colors}

Renk paletinizi semantik adlarla tanımlayın:

```typescript
colors: {
  // Marka renkleri
  primary: '#00a9ce',
  secondary: '#ffc72c',
  
  // Semantik renkler
  danger: '#f65353',
  success: '#3fb618',
  warning: '#ff7518',
  info: '#3fb6d2',
  
  // Nötr renkler
  'grey-900': '#223f46',
  'grey-800': '#3d585e',
  'grey-200': '#a1adaf',
  'grey-100': '#eaeff0',
  white: '#ffffff',
  black: '#111111',
  
  // Özel renkler
  brandPrimary: '#your-color',
}
```

[Renkler hakkında daha fazla bilgi →](/docs/theming/colors)

### Tipografi {#typography}

Fontları, boyutları ve kalınlıkları ayarlayın:

```typescript
fontSizes: {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 24,
  xxxl: 36,
}

fontFamilies: {
  regular: 'YourFont-Regular',
  bold: 'YourFont-Bold',
  medium: 'YourFont-Medium',
}
```

[Tipografi hakkında daha fazla bilgi →](/docs/theming/typography)

### Spacing {#spacing}

Referans cihaza dayalı responsive spacing:

```typescript
referenceDevice: {
  width: 390,
  height: 844,
}
```

Tüm spacing değerleri, gerçek cihaz boyutlarına göre otomatik olarak ölçeklenir.

[Spacing hakkında daha fazla bilgi →](/docs/theming/spacing)

## Theme Değerlerini Kullanma {#using-theme-values}

### Component'lerde {#in-components}

Tüm component'ler theme variant'larını kabul eder:

```tsx
<Button variant="primary">Primary</Button>
<Label variant="danger">Error</Label>
<Icon name="STAR" variant="warning" />
```

### Özel Renkler {#custom-colors}

Renkleri component seviyesinde override edin:

```tsx
<Button 
  backgroundColor="custom-color"
  color="text-color"
>
  Custom Button
</Button>
```

### Ortak UI Prop'ları {#common-ui-props}

Tüm component'ler ortak style prop'larını destekler:

```tsx
<Button
  marginTop={16}
  marginBottom={24}
  paddingHorizontal={32}
  borderRadius={12}
  backgroundColor="primary"
>
  Styled Button
</Button>
```

## Theme'e Erişim {#accessing-theme}

Theme'i kendi component'lerinizde kullanın:

```tsx
import { theme } from '@tansuk/rott-ui';

function MyComponent() {
  return (
    <View style={{ backgroundColor: theme.colors.primary }}>
      <Text style={{ fontSize: theme.fontSizes.lg }}>
        Custom Component
      </Text>
    </View>
  );
}
```

## En İyi Uygulamalar {#best-practices}

### Yapılması Gerekenler ✅ {#dos-}

- Semantik renk adları kullanın (danger, success, warning)
- Autocomplete için özel renkleri rott.config.ts içinde tanımlayın
- Tutarlılık için theme font boyutlarını kullanın
- Spacing için ortak UI prop'larından yararlanın

### Yapılmaması Gerekenler ❌ {#donts-}

- Component'lerde renkleri hardcode etmeyin
- Farklı spacing sistemlerini karıştırmayın
- Geçerli bir nedeniniz olmadan theme değerlerini override etmeyin
- Hem açık hem koyu modda test etmeyi unutmayın

## Sonraki Adımlar {#next-steps}

- **[Renkler](/docs/theming/colors)** - Kapsamlı renk sistemi rehberi
- **[Tipografi](/docs/theming/typography)** - Font config'i
- **[Spacing](/docs/theming/spacing)** - Responsive spacing sistemi
- **[rott.config.ts](/docs/theming/rott-config)** - Type-safe config
