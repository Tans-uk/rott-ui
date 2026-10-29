---
sidebar_position: 1
title: Input
description: 14+ variant'a sahip kapsamlı input component'i
---

# Input

Input component'i; metin, e-posta, şifre, tarih, telefon, IBAN, kredi kartı ve daha fazlası dahil 14+ farklı input tipini destekler.

## Özellikler {#features}

- 📝 14+ input tipi
- ✅ Validation desteği
- 🎭 Input maskeleme
- 📅 Date/DateTime picker'ları
- 🔍 Autocomplete destekli arama
- 💰 Tutar input'u
- ☑️ Checkbox variant'ı
- 🎨 Light/dark theme'ler
- 🖼️ Baştaki/sondaki ikon slot'ları (`leftIcon` / `rightIcon`)

## Temel Kullanım {#basic-usage}

```tsx
import {Input} from '@tansuk/rott-ui'

<Input
  name='email'
  type='email'
  placeholder='Enter your email'
  value={email}
  onChangeText={setEmail}
/>
```

## Input Tipleri {#input-types}

Her input tipinin kendine özgü prop'ları, örnekleri ve en iyi uygulamaları içeren ayrı bir sayfası vardır:

- **[Amount](/docs/components/input-amount)** - Biçimlendirmeli para birimi ve sayısal input
- **[Checkbox](/docs/components/input-checkbox)** - Checkbox input'u
- **[Credit Card](/docs/components/input-credit-card)** - Maskelemeli kredi kartı numarası
- **[CVC](/docs/components/input-cvc)** - Kart güvenlik kodu
- **[Date](/docs/components/input-date)** - Tarih ve tarih-saat picker'ı
- **[Email](/docs/components/input-email)** - Validation destekli e-posta input'u
- **[Expire Date](/docs/components/input-expire-date)** - Kart son kullanma tarihi
- **[IBAN](/docs/components/input-iban)** - Biçimlendirmeli IBAN
- **[Numeric](/docs/components/input-numeric)** - Yalnızca rakamlar
- **[Password](/docs/components/input-password)** - Göster/gizle özellikli şifre
- **[Phone](/docs/components/input-phone)** - Maskelemeli telefon numarası
- **[PIN](/docs/components/input-pin)** - PIN/OTP input'u
- **[Search](/docs/components/input-search)** - Autocomplete destekli arama
- **[Select](/docs/components/input-select)** - Dropdown seçim

## Label ile {#with-labels}

```tsx
<Input
  name="email"
  type="email"
  label="Email Address"
  placeholder="Enter your email"
/>
```

## Validation {#validation}

```tsx
<Input
  name="email"
  type="email"
  placeholder="Email"
  value={email}
  onChangeText={setEmail}
  errorMessage={errors.email}
  touched={touched.email}
/>
```

## Props {#props}

| Prop | Tip | Default | Açıklama |
|------|------|---------|-------------|
| `name` | `string` | **Zorunlu** | Input tanımlayıcısı |
| `type` | `InputType` | `'default'` | Input tipi |
| `value` | `string` | - | Input değeri |
| `onChangeText` | `(text: string) => void` | - | Değişiklik handler'ı |
| `placeholder` | `string` | - | Placeholder metni |
| `label` | `string \| InputLabelProps` | - | Input label'ı |
| `errorMessage` | `string` | - | Hata mesajı |
| `touched` | `boolean` | `false` | Touched state'i |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme |
| `disabled` | `boolean` | `false` | Devre dışı state'i |
| `leftIcon` | `InputIconProps` | - | Baştaki ikon slot'u (yalnızca verildiğinde render edilir) |
| `rightIcon` | `InputIconProps` | - | Sondaki ikon slot'u (yalnızca verildiğinde render edilir) |

### `InputIconProps` {#inputiconprops}

`leftIcon` ve `rightIcon`, `IconProps`'u extend eder (yani `name`, `variant`, `color`,
`width`, `height`, `mode`, … hepsi geçerlidir) ve buna ek olarak isteğe bağlı bir `onPress` handler'ı alır:

| Prop | Tip | Default | Açıklama |
|------|------|---------|-------------|
| `name` | `IconKeys` | **Zorunlu** | Render edilecek ikon |
| `variant` | `Variant` | - | Theme variant'ı ile renklendirme |
| `color` | `string` | - | Ham renk değeri ile renklendirme (`variant`'a göre önceliklidir) |
| `onPress` | `(event) => void` | - | İkonu basılabilir yapar |

## Hızlı Örnek {#quick-example}

```tsx
import {Input} from '@tansuk/rott-ui'

// Temel metin input'u
<Input name='username' type='default' placeholder='Username' />

// Validation destekli e-posta
<Input name='email' type='email' label='Email' />

// Göster/gizle özellikli şifre
<Input name='password' type='password' label='Password' />

// Maskelemeli telefon
<Input name='phone' type='phone' mask='+1 ([000]) [000]-[0000]' />
```

### Border'lı input'lar {#bordered-inputs}

`border` verdiğinizde kutu şeklinde bir border çizilir ve alttaki alt çizgi
`Separator`'ı otomatik olarak gizlenir (kutu ve alt çizgi birbirini dışlar). Alt
çizgiyi de korumak için `renderSeparator` prop'unu açıkça verin:

```tsx
<Input name='boxed' border={{width: 1, radius: 8, variant: 'grey-200'}} />
<Input name='boxed-with-line' border={{width: 1}} renderSeparator />
```

### Baştaki ve sondaki ikonlar {#leading--trailing-icons}

Her input tipi `leftIcon` ve `rightIcon` kabul eder. Bir slot **yalnızca ilgili
prop verildiğinde** render edilir ve alan, ikonlar arasındaki boşluğu dolduracak
şekilde esner; böylece metin alanı, hangi ikonların bulunduğuna göre otomatik
olarak büyür veya küçülür:

```tsx
// Yalnızca baştaki ikon — metin kalan genişliği doldurur
<Input name='email' type='email' leftIcon={{name: 'mail'}} />

// İki slot da dolu — metin iki ikonun arasında durur
<Input
  name='search'
  leftIcon={{name: 'search'}}
  rightIcon={{name: 'close', onPress: clear}}
/>

// İkon yok — metin tüm genişliği kaplar
<Input name='plain' />
```

İkon ile metin arasındaki boşluk spacing'e duyarlıdır (4'ün katıdır ve `size`'a
göre ölçeklenir).

#### Renklendirme {#tinting}

İkonlar, prop'larla renklendirilebilmeleri için `variant` ve `color` kabul eder
(rengi SVG'nin içine gömmeniz gerekmez). `color`, `variant`'a göre önceliklidir:

```tsx
<Input name='email' leftIcon={{name: 'mail', variant: 'primary'}} />
<Input name='locked' leftIcon={{name: 'lock', color: '#FF6B6B'}} />
```

#### Basılabilir ikonlar {#pressable-icons}

Bir slot'u etkileşimli yapmak için `onPress` verin (erişilebilir bir buton olarak render edilir):

```tsx
<Input name='amount' rightIcon={{name: 'info', onPress: showHelp}} />
```

#### Built-in sondaki ikonlar {#built-in-trailing-icons}

İşlevsel tipler built-in sondaki davranışlarını korur, ancak **görünümü**
`rightIcon` ile override etmenize izin verir. İşlev kilitli kalır:

- `password` → göster/gizle gözü (açıp kapatma her zaman gözün işidir)
- `phone` → rehberden kişi seçici
- `iban` → temizle / QR
- `amount` → para birimi göstergesi
- `date` → takvim (picker'ı açar)
- `select` / `multiSelect` → chevron (veya salt okunur `id-card`)

```tsx
// Gözün görünümünü değiştirin, göster/gizle işlevini koruyun
<Input name='password' type='password' rightIcon={{name: 'eye-alt'}} />
```

#### Kontrol tipleri {#control-types}

`checkbox` ve `toggle`, `leftIcon`/`rightIcon` ikonlarını içeriklerinin (kutu veya
switch) etrafına yerleştirir. İkon slot'ları basma izolasyonu kullanır; bu yüzden
basılabilir bir ikona dokunmak kontrolü **açıp kapatmaz**.

:::note `icon` prop'undan geçiş
Eski `icon` prop'u kaldırıldı. `icon={{…}}` yerine `leftIcon={{…}}` kullanın
(aynı yapı). `Input`'a verdiğiniz margin/padding, alanın dış container'ına
uygulanır; artık içteki `TextInput`'a sızmaz.
:::

## İlgili Sayfalar {#related}

- **[Formlar Rehberi](/docs/guides/forms)** - Validation içeren eksiksiz form örnekleri
- **[Toggle](/docs/components/toggle)** - Toggle switch component'i
