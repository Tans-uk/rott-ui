---
sidebar_position: 1
title: Giriş
description: Rott UI'a hoş geldiniz - kapsamlı bir React Native UI Kit
---

# Rott UI'a Hoş Geldiniz

Rott UI; type-safe theming ve geniş özelleştirme seçenekleriyle hızlı geliştirme için tasarlanmış, kapsamlı ve property tabanlı bir React Native UI Kit'tir.

## Rott UI Nedir? {#what-is-rott-ui}

Rott UI, temel UI öğelerinden karmaşık etkileşimli component'lere kadar her şeyi kapsayan **29 production'a hazır component** sunar. TypeScript ile geliştirilen ve en iyi uygulamaları takip eden Rott UI, güzel React Native uygulamalarını daha hızlı geliştirmenize yardımcı olmak için tasarlandı.

## Temel Özellikler {#key-features}

### 🎨 29 Production'a Hazır Component {#-29-production-ready-components}
Temel butonlardan karmaşık modal'lara ve input alanlarına kadar - her component sahada denenmiş ve production'a hazırdır.

### 🎯 Type-Safe Theming {#-type-safe-theming}
Renkleri, fontları ve style'ları tam TypeScript desteğiyle tanımlayın. Özel theme'iniz her yerde autocomplete desteği alır.

### 📱 React Native Öncelikli {#-react-native-first}
Platform'a özel uyarlamalar ve performans optimizasyonlarıyla mobil geliştirme için optimize edilmiştir.

### 🔧 Yüksek Derecede Özelleştirilebilir {#-highly-customizable}
Her component kapsamlı style ve davranış prop'ları kabul eder. Kaynak koda dokunmadan özelleştirin.

### 🌍 Internationalization'a Hazır {#-internationalization-ready}
React Intl entegrasyonuyla built-in i18n desteği. Türkçe ve İngilizce hazır olarak gelir.

### ♿ Erişilebilirlik Odaklı {#-accessibility-focused}
Her component'e entegre, kapsamlı erişilebilirlik özellikleri ve test desteği.

### 🚀 Performans için Optimize Edildi {#-performance-optimized}
Akıcı deneyimler için FlashList, Reanimated ve diğer performans kütüphanelerinden yararlanır.

## Hızlı Örnek {#quick-example}

```tsx
import React from 'react';
import {
  Container,
  Header,
  Content,
  Button,
  Input,
} from '@tansuk/rott-ui';

export default function MyScreen() {
  return (
    <Container noPadding>
      <Header height={40} logo="MY_LOGO" />
      
      <Content flex={1} paddingHorizontal={24}>
        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
        />
        
        <Button
          size="full"
          variant="primary"
          marginTop={16}
          onPress={() => console.log('Button pressed!')}
        >
          Get Started
        </Button>
      </Content>
    </Container>
  );
}
```

## Component Kategorileri {#component-categories}

- **Layout** (5): Container, Content, Header, Footer, Item
- **Navigation** (5): Button, Pressable, Tab, TabWidget, BottomMenu
- **Input** (2): Input (14+ variant), Toggle
- **Görüntüleme** (5): Label, Icon, Image, EmptyState, Skeleton
- **Geri Bildirim** (7): Modal, Alert, AlertDialog, ActionMenu, Notification, Result, Timer
- **Veri** (1): List (FlashList ile)
- **Yardımcı** (4): Separator, FormContainer, ImageBackground, Common

## Başlarken {#getting-started}

Rott UI ile geliştirmeye hazır mısınız? Hadi kurulumu yapalım:

1. **[Kurulum](/docs/getting-started/installation)** - Rott UI'ı ve peer dependency'lerini kurun
2. **[Hızlı Başlangıç](/docs/getting-started/quick-start)** - İlk ekranınızı 5 dakikada oluşturun

## Topluluk ve Destek {#community--support}

- **GitHub**: [github.com/Tans-uk/rott-ui](https://github.com/Tans-uk/rott-ui)
- **npm**: [@tansuk/rott-ui](https://www.npmjs.com/package/@tansuk/rott-ui)
- **Issues**: [Hata bildirin veya özellik isteyin](https://github.com/Tans-uk/rott-ui/issues)

## Lisans {#license}

Rott UI, [MIT lisansı](https://github.com/Tans-uk/rott-ui/blob/main/LICENSE) ile lisanslanmıştır.
