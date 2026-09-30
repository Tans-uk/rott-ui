---
sidebar_position: 1
title: Component'lere Genel Bakış
description: Rott UI'daki 29 component'in tamamını keşfedin
---

# Component'lere Genel Bakış

Rott UI, mantıksal kategorilere ayrılmış, production'a hazır 29 component sunar.

## Tüm Component'ler (Alfabetik) {#all-components-alphabetical}

Tüm component'lere sidebar'da alfabetik sırayla göz atın ya da aşağıda kategoriye göre keşfedin:

## Layout Component'leri {#layout-components}

Ekranlarınızın yapısını kurmak için temel component'ler.

- **[Container](/docs/components/container)** - Safe area'yı yöneten root wrapper
- **[Content](/docs/components/content)** - Klavyeyi yöneten, kaydırılabilir içerik container'ı
- **[Header](/docs/components/header)** - Logo ve aksiyonlar içeren navigation header'ı
- **[Footer](/docs/components/footer)** - Footer container'ı
- **[Item](/docs/components/item)** - Esnek layout container'ı

## Navigation Component'leri {#navigation-components}

Kullanıcı navigation'ı ve aksiyonları için etkileşimli component'ler.

- **[Button](/docs/components/button)** - Variant, boyut ve ikon destekli etkileşimli buton
- **[Pressable](/docs/components/pressable)** - Özel dokunulabilir alanlar
- **[Tab](/docs/components/tab)** - Tab navigation öğeleri
- **[TabWidget](/docs/components/tab-widget)** - Eksiksiz tab navigation sistemi
- **[BottomMenu](/docs/components/bottom-menu)** - Alt navigation bar'ı

## Input Component'leri {#input-components}

Validation ve maskeleme destekli form input'ları.

- **[Input](/docs/components/input)** - Temel input component'i (genel bakış)
  - **[Amount](/docs/components/input-amount)** - Para birimi input'u
  - **[Checkbox](/docs/components/input-checkbox)** - Checkbox
  - **[Credit Card](/docs/components/input-credit-card)** - Kart numarası
  - **[CVC](/docs/components/input-cvc)** - Kart güvenlik kodu
  - **[Date](/docs/components/input-date)** - Tarih seçici
  - **[Email](/docs/components/input-email)** - E-posta validation'ı
  - **[Expire Date](/docs/components/input-expire-date)** - Kart son kullanma tarihi
  - **[IBAN](/docs/components/input-iban)** - IBAN formatlama
  - **[Numeric](/docs/components/input-numeric)** - Yalnızca sayı
  - **[Password](/docs/components/input-password)** - Göster/gizle destekli şifre
  - **[Phone](/docs/components/input-phone)** - Telefon maskeleme
  - **[PIN](/docs/components/input-pin)** - PIN/OTP
  - **[Search](/docs/components/input-search)** - Arama input'u
  - **[Select](/docs/components/input-select)** - Dropdown
- **[Toggle](/docs/components/toggle)** - Toggle switch component'i

## Görüntüleme Component'leri {#display-components}

İçerik görüntülemek için component'ler.

- **[Label](/docs/components/label)** - Theming destekli metin görüntüleme
- **[Icon](/docs/components/icon)** - SVG ikonlar (117+ built-in)
- **[Image](/docs/components/image)** - Görsel görüntüleme component'i
- **[EmptyState](/docs/components/empty-state)** - Empty state illüstrasyonları
- **[Skeleton](/docs/components/skeleton)** - Yükleme placeholder'ları

## Geri Bildirim Component'leri {#feedback-components}

Kullanıcıya geri bildirim ve overlay'ler için component'ler.

- **[Modal](/docs/components/modal)** - Tam ekran ve kısmi modal'lar
- **[Alert](/docs/components/alert)** - Uyarı banner'ları
- **[AlertDialog](/docs/components/alert-dialog)** - Onay dialog'ları
- **[ActionMenu](/docs/components/action-menu)** - Action sheet menüleri
- **[Notification](/docs/components/notification)** - Toast bildirimleri
- **[Result](/docs/components/result)** - Sonuç/onay ekranları
- **[Timer](/docs/components/timer)** - Zamanlayıcı ve geri sayım component'leri

## Veri Component'leri {#data-components}

Liste ve veri görüntülemek için component'ler.

- **[List](/docs/components/list)** - FlashList ile yüksek performanslı listeler

## Yardımcı Component'ler {#utility-components}

Sık kullanılan pattern'ler için yardımcı component'ler.

- **[Separator](/docs/components/separator)** - Görsel ayırıcılar
- **[FormContainer](/docs/components/form-container)** - Form wrapper'ı
- **[ImageBackground](/docs/components/image-background)** - Arka plan görseli container'ı
- **[Common](/docs/components/common)** - Yaygın UI pattern'leri (CommonItem, CommonItemContainer)

## Başlarken {#getting-started}

Yüksek öncelikli component'lerle başlayın:

1. **[Button](/docs/components/button)** - En sık kullanılan
2. **[Input](/docs/components/input)** - Karmaşık formlar (14+ tip)
3. **[Container & Content](/docs/components/container)** - Uygulama yapısı
4. **[Modal](/docs/components/modal)** - Overlay'ler ve dialog'lar

## Component Özellikleri {#component-features}

Tüm Rott UI component'leri şu özellikleri paylaşır:

- ✅ Tam TypeScript desteği
- ✅ Theme renk variant'ları
- ✅ Ortak UI prop'ları (margin, padding, flex vb.)
- ✅ Erişilebilirlik desteği
- ✅ Kapsamlı test
- ✅ Ayrıntılı dokümantasyon
