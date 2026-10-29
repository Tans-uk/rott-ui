---
sidebar_position: 6
title: Erişilebilirlik
description: Rott UI ile erişilebilir uygulamalar geliştirme
---

# Erişilebilirlik

Rott UI component'leri, WCAG 2.1 yönergelerine uygun olarak erişilebilirlik gözetilerek geliştirilmiştir.

## Erişilebilirlik Özellikleri {#accessibility-features}

Tüm Rott UI component'lerinde şunlar bulunur:

- ✅ Doğru erişilebilirlik rolleri
- ✅ Erişilebilirlik etiketleri ve ipuçları
- ✅ Klavye navigation desteği
- ✅ Ekran okuyucu uyumluluğu
- ✅ Yeterli renk kontrastı
- ✅ Minimum dokunma alanları (44x44)

## Button Erişilebilirliği {#button-accessibility}

```tsx
<Button
  variant='primary'
  accessibilityLabel='Submit form'
  accessibilityHint='Submits the registration form'
  accessibilityRole='button'
  onPress={handleSubmit}>
  Submit
</Button>
```

### Yalnızca Icon İçeren Button'lar {#icon-only-buttons}

Yalnızca ikon içeren butonlara her zaman etiket ekleyin:

```tsx
<Button
  circle
  leftIcon={{name: 'CLOSE', width: 24, height: 24}}
  accessibilityLabel='Close modal'
  accessibilityRole='button'
  onPress={handleClose}
/>
```

## Input Erişilebilirliği {#input-accessibility}

```tsx
<Input
  name='email'
  type='email'
  label='Email Address'
  placeholder='Enter your email'
  accessibilityLabel='Email address input field'
  accessibilityHint='Enter your email address to sign in'
/>
```

## Label Erişilebilirliği {#label-accessibility}

```tsx
<Label
  text='Important Message'
  accessibilityRole='header'
  accessibilityLabel='Important notification message'
/>
```

## Etkileşimli Öğeler {#interactive-elements}

### Pressable {#pressable}

```tsx
<Pressable
  accessibilityLabel='View details'
  accessibilityRole='button'
  accessibilityHint='Opens detailed information'
  onPress={openDetails}>
  <Label text='View Details' />
</Pressable>
```

### Toggle {#toggle}

```tsx
<Item row alignItemsCenter>
  <Toggle
    isOn={enabled}
    onToggleChange={setEnabled}
    accessibilityLabel='Enable notifications'
    accessibilityRole='switch'
    accessibilityState={{checked: enabled}}
  />
  <Label text='Notifications' marginLeft={12} />
</Item>
```

## Renk Kontrastı {#color-contrast}

Rott UI'ın default renkleri WCAG AA standartlarını karşılar:

- Beyaz üzerinde Primary: 4.5:1 ✅
- Beyaz üzerinde Danger: 4.5:1 ✅
- Beyaz üzerinde Success: 4.5:1 ✅
- Beyaz üzerinde Grey-900: 7:1 ✅

### Kontrastı Test Etme {#testing-contrast}

Özel renklerinizi test edin:

```tsx
// İyi kontrast
<Label text="Readable" variant="grey-900" />

// Zayıf kontrast (kaçının)
<Label text="Hard to read" variant="grey-200" />
```

## Dokunma Alanları {#touch-targets}

Dokunma alanlarının en az 44x44 olmasını sağlayın:

```tsx
// İyi
<Button width={44} height={44} circle>
  <Icon name="STAR" />
</Button>

// Çok küçük (kaçının)
<Pressable width={20} height={20}>
  <Icon name="STAR" />
</Pressable>
```

## Ekran Okuyucu Desteği {#screen-reader-support}

### İçeriği Gruplama {#grouping-content}

```tsx
<Item accessibilityRole='group'>
  <Label text='User Profile' accessibilityRole='header' />
  <Label text='John Doe' />
  <Label text='john@example.com' />
</Item>
```

### Live Region'lar {#live-regions}

Dinamik içeriği duyurun:

```tsx
<Label text={statusMessage} accessibilityLiveRegion='polite' accessibilityRole='alert' />
```

## Erişilebilirliği Test Etme {#testing-accessibility}

```tsx
import {render} from '@testing-library/react-native'

it('has proper accessibility labels', () => {
  const {getByLabelText} = render(<Button accessibilityLabel='Submit form'>Submit</Button>)

  expect(getByLabelText('Submit form')).toBeTruthy()
})

it('has proper accessibility role', () => {
  const {getByRole} = render(<Button accessibilityRole='button'>Submit</Button>)

  expect(getByRole('button')).toBeTruthy()
})
```

## En İyi Uygulamalar {#best-practices}

### Yapılması Gerekenler ✅ {#dos-}

- Anlamlı erişilebilirlik etiketleri verin
- Anlamsal roller kullanın (button, header, link)
- Yeterli renk kontrastı sağlayın
- Dokunma alanlarını en az 44x44 yapın
- Ekran okuyucularla test edin (VoiceOver/TalkBack)
- Karmaşık etkileşimler için ipuçları verin

### Yapılmaması Gerekenler ❌ {#donts-}

- Bilgi aktarmak için yalnızca renge güvenmeyin
- Yalnızca ikon içeren butonlarda etiketleri unutmayın
- Dokunma alanlarını çok küçük yapmayın
- "Buraya tıklayın" gibi belirsiz etiketler kullanmayın
- Yardımcı teknolojilerle test etmeyi unutmayın

## Test Araçları {#testing-tools}

### iOS VoiceOver {#ios-voiceover}

iOS'ta VoiceOver'ı açın:
Ayarlar → Erişilebilirlik → VoiceOver

### Android TalkBack {#android-talkback}

Android'de TalkBack'i açın:
Ayarlar → Erişilebilirlik → TalkBack

## WCAG Uyumluluğu {#wcag-compliance}

Rott UI, WCAG 2.1 AA seviyesini karşılamanıza yardımcı olur:

- ✅ Algılanabilir: Yeterli kontrast, metin alternatifleri
- ✅ Kullanılabilir: Klavyeyle erişilebilir, yeterli süre
- ✅ Anlaşılabilir: Okunabilir, öngörülebilir
- ✅ Sağlam: Yardımcı teknolojilerle uyumlu

## İlgili Sayfalar {#related}

- [Test Rehberi](/docs/guides/testing)
- [Button component'i](/docs/components/button)
- [Input component'i](/docs/components/input)
