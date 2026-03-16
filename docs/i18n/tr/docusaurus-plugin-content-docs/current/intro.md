---
sidebar_position: 1
title: Giriş
description: Rott UI'ya hoş geldiniz
---

# Rott UI'ya Hoş Geldiniz

Rott UI, tip güvenli temalandırma ve kapsamlı özelleştirme seçenekleriyle hızlı geliştirme için tasarlanmış, kapsamlı ve özellik tabanlı bir React Native UI Kit'tir.

## Rott UI Nedir?

Rott UI, temel UI öğelerinden karmaşık etkileşimli bileşenlere kadar her şeyi kapsayan **29 üretim için hazır bileşen** sunar. TypeScript ile geliştirilmiş ve en iyi uygulamaları takip eden bu kütüphane, güzel React Native uygulamaları daha hızlı oluşturmanıza yardımcı olmak için tasarlanmıştır.

## Temel Özellikler

### 🎨 29 Üretim İçin Hazır Bileşen
Temel butonlardan karmaşık modal ve girdi alanlarına kadar - her bileşen savaşta test edilmiş ve üretim için hazırdır.

### 🎯 Tip Güvenli Temalandırma
Renkleri, fontları ve stilleri tam TypeScript desteğiyle yapılandırın. Özel temanız her yerde otomatik tamamlama alır.

### 📱 React Native Öncelikli
Platforma özel uyarlamalar ve performans optimizasyonlarıyla mobil geliştirme için optimize edilmiştir.

### 🔧 Yüksek Düzeyde Özelleştirilebilir
Her bileşen kapsamlı stil ve davranış prop'ları kabul eder. Kaynak koda dokunmadan özelleştirin.

### 🌍 Uluslararasılaştırmaya Hazır
React Intl entegrasyonuyla yerleşik i18n desteği. Türkçe ve İngilizce kutudan çıkar çıkmaz dahildir.

### ♿ Erişilebilirlik Odaklı
Her bileşende kapsamlı erişilebilirlik özellikleri ve test desteği yerleşiktir.

### 🚀 Performans Optimize Edilmiş
Akıcı deneyimler için FlashList, Reanimated ve diğer performans kütüphanelerinden yararlanır.

## Hızlı Örnek

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

## Bileşen Kategorileri

- **Yerleşim** (5): Container, Content, Header, Footer, Item
- **Gezinme** (5): Button, Pressable, Tab, TabWidget, BottomMenu
- **Girdi** (2): Input (14+ varyant), Toggle
- **Görüntüleme** (5): Label, Icon, Image, EmptyState, Skeleton
- **Geri Bildirim** (7): Modal, Alert, AlertDialog, ActionMenu, Notification, Result, Timer
- **Veri** (1): List (FlashList ile)
- **Yardımcı** (4): Separator, FormContainer, ImageBackground, Common

## Başlarken

Rott UI ile geliştirmeye hazır mısınız? Hemen kuruluma geçelim:

1. **[Kurulum](/docs/getting-started/installation)** - Rott UI ve bağımlılıklarını yükleyin
2. **[Hızlı Başlangıç](/docs/getting-started/quick-start)** - 5 dakikada ilk ekranınızı oluşturun

## Topluluk ve Destek

- **GitHub**: [github.com/Tans-uk/rott-ui](https://github.com/Tans-uk/rott-ui)
- **npm**: [@tansuk/rott-ui](https://www.npmjs.com/package/@tansuk/rott-ui)
- **Sorunlar**: [Hata bildirin veya özellik isteyin](https://github.com/Tans-uk/rott-ui/issues)

## Lisans

Rott UI [MIT lisanslıdır](https://github.com/Tans-uk/rott-ui/blob/main/LICENSE).
