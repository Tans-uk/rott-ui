# Input Left/Right Icon Yapısı — Tasarım

> **Tarih:** 2026-07-15
> **Paket:** `@tansuk/rott-ui`
> **Tetikleyen:** VetAsist login handoff (`HANDOFF_ROTT_UI_INPUT.md`) + sol/sağ ikon ihtiyacı
> **Hedef sürüm:** `0.8.0` (breaking: `icon` prop kaldırılıyor)

---

## Amaç

Button'daki `leftIcon`/`rightIcon` modelini **tüm Input ailesine** taşımak: sol ve/veya sağ ikon
**varsa** render edilir, **yoksa** render edilmez; içerik ikonların varlığına göre akışkan
şekilde genişler/daralır (hiç ikon yoksa full). Aynı işte, handoff'ta raporlanan iki layout
bug'ı da kalıcı olarak düzeltilir.

## Kapsam

Tüm input tipleri kapsamdadır. Bir tipin sadece modal/iç içeriği (ör. select modal listesi,
date picker spinner) bu işin dışındadır; yalnızca **tetikleyici alanın** (field) sol/sağ ikon
yapısı ele alınır.

İlgisiz refactor'lar kapsam dışı (docs `CommonItemContainer` uyumsuzluğu, Pressable `row` vb.) — YAGNI.

---

## Mevcut durum (doğrulanmış)

- Ortak taban bileşen **yok**. Her tip kendi `<TextInput>`/`<MaskInput>`/`<Pressable>`'ını bağımsız
  render edip `InputStyles(...).defaultTextInputStyle` paylaşıyor; layout'lar farklı.
- `DefaultInput`, `StatementInput` ve `DateInput`, `...props`'u `InputStyles`'a geçiriyor →
  `commonUiStyleProperties` margin/padding'i **stil**e yazıyor (**Bug #1**).
- `DefaultInput`'ta ikon ↔ metin arası gap yok; `PasswordInput`'ta absolute `left:10` +
  sabit `paddingLeft:34` → ~2px gap (**Bug #2**).
- Fonksiyonel trailing elemanı olan tipler kendi elemanlarını `absolute right={0}
  bottom={icon.paddingBottom}` gibi eski (underline varsayan) desenlerle konumluyor:
  `password` (göz), `phone` (rehber), `iban` (temizle/QR), `amount` (para birimi),
  `date` (takvim), `select`/`multiSelect` (chevron).
- `IbanInput`'ta zaten bir `rightIcon` prop'u mevcut (ad-hoc temizle/QR semantiği).
- `checkbox` ve `toggle` metin alanı içermez: kendi bespoke satır düzenleri var
  (kutu + label / label + switch).

---

## Mimari

### Ortak `InputField` bileşeni (metin-tabanlı tipler)

Tek sorumluluğu **layout** olan sunum bileşeni (SOLID/SRP):

```
<Item row alignItemsCenter>
  {leftIcon  && <IconSlot marginRight={gap} .../>}
  <View flex:1>{children /* asıl TextInput / MaskInput / Pressable-text / amount ikili alanı */}</View>
  {rightIcon && <IconSlot marginLeft={gap} .../>}
</Item>
```

- İkon slotları, gap, hizalama ve akışkan `flex:1` genişleme/daralmayı **tek yerde** yönetir.
- Asıl içerik `children` olarak geçer → her tip kendi domain mantığını (keyboard, mask, format,
  fonksiyonel trailing davranış) korur (DDD).
- Eski `absolute + bottom` trailing deseni kaldırılır → çerçeveli kutuda doğru hizalama.
- Gap ikon üstünde `marginRight`/`marginLeft` olarak uygulanır (Button ile aynı yöntem; RN
  `gap` sürüm uyum riskinden kaçınmak için).

### `IconSlot` davranışı

- `onPress` verilirse ikon `Pressable`'a sarılır; verilmezse düz `Icon`.
- İkon ölçüsü verilmezse `InputStyleNormalizer({size}).icon` fallback'i (md=24).

### Gap util (paylaşımlı)

Size-based gap tek bir util'de: **xs/sm=4, md=8, lg/xl/xxl/full=12** (4'ün katları, mevcut
normalizer gruplamasıyla uyumlu). Hem `InputField` hem checkbox/toggle bunu kullanır (DRY).

### Tip katmanları

| Tier | Tipler | leftIcon | rightIcon |
| --- | --- | --- | --- |
| **1 — Nötr metin** | default, email, numeric, statement, creditCard, cvc, expireDate, plateNumber, pinPassword | Görünüm + `onPress` serbest | Görünüm + `onPress` serbest |
| **2 — Fonksiyonel trailing** | password (göz), phone (rehber), iban (temizle/QR), amount (para birimi), date (takvim), select/multiSelect (chevron) | Görünüm + `onPress` serbest | **Yalnızca görünüm**; `onPress` yok sayılır, yerleşik fonksiyon sabit |
| **3 — Kontrol (metin alanı yok)** | checkbox, toggle | Görünüm + `onPress` serbest | Görünüm + `onPress` serbest |

Tier 2'de yerleşik fonksiyon (toggle/rehber/temizle/picker/dropdown) bileşenin sorumluluğundadır;
`rightIcon` yalnızca ikonun *appearance*'ını (name/variant/size) özelleştirir. Örn. `PasswordInput`
göz ikonunu içeride `rightIcon={{name: isSecure?'eye-disable':'eye', onPress: toggle}}` olarak
inşa edip `InputField`'e verir — kullanıcının gördüğü davranış değişmez.

### Tier 3 — checkbox & toggle

Metin alanı olmadığı için `InputField` kullanılmaz; kendi bespoke satır düzenleri korunur, ama
sol/sağ ikon slotları eklenir ve gap util paylaşılır.

- **checkbox** yerleşimi: `[leftIcon] [kutu] [label] [rightIcon]`.
- **toggle** yerleşimi: `[leftIcon] [label] … [rightIcon] [switch]` (rightIcon switch'ten hemen önce).
- Kök `Pressable`/label kendi `onPress`'ine sahip olduğundan, ikon slotlarının `onPress`'i
  `stopPropagation` ile sarılır → ikon tıklaması kutu/switch toggle'ını tetiklemez.

---

## API & Prop Sözleşmesi

```ts
// models/inputIconProps.interface.ts
export interface InputIconProps extends IconProps {
  onPress?: (event: GestureResponderEvent) => void
}

// models/inputIconSlotsProps.interface.ts
export interface InputIconSlotsProps {
  leftIcon?: InputIconProps
  rightIcon?: InputIconProps
}
```

- `InputIconSlotsProps` tüm input tiplerinin model arayüzlerine (Tier 1/2/3) eklenir; ancak
  modal-only iç prop'lara karışmaz.
- **Breaking:** `DefaultInputProps`/`PasswordInputProps`'taki `icon` prop'u kaldırılır → `leftIcon`.
- `IbanInput`'un mevcut `rightIcon`'u yeni sözleşmeye uyarlanır: temizle/QR fonksiyonu sabit,
  `rightIcon` yalnızca QR ikonunun görünümünü özelleştirir (isim çakışması tekilleşir).

---

## Layout & Bug Fix'ler

### Bug #2 — gap + akışkanlık

- `defaultTextInputStyle`: `width: '100%'` → **`flex: 1`**.
- `PasswordInputStyles.leadingIcon` / `showPasswordIcon` absolute stilleri kaldırılır; her iki
  slot `InputField`'ten geçer.
- Fonksiyonel trailing elemanları (phone/iban/amount/date/select) `InputField` sağ slotuna taşınır.
- Gap size-based (yukarıdaki gap util).

### Bug #1 — spacing sızıntısı

1. `InputStyles(...)` çağrılarına `...props` **geçilmez** (`DefaultInput`, `StatementInput`,
   `DateInput`); yalnızca `fontSize, theme, size, includeBorderRadius`.
2. İçerik input'una giden `{...props}` daraltılır: `name, errorMessage, border, touched,
   renderSeparator, leftIcon, rightIcon` ve tüm `margin*/padding*` CommonUi prop'ları içeriğe
   gitmez.
3. Dış spacing (`marginBottom` vb.) `Input.tsx` **kök `<Item>`'ında** uygulanır (border wrapper
   dışında). `Input.tsx` bu spacing prop'larını child field bileşenine spread etmez.

---

## Dokunulan dosyalar (öngörü)

**Yeni:**
- `components/InputField.tsx`
- `utils/inputIconGapNormalizer.ts` (size-based gap)
- `models/inputIconProps.interface.ts`
- `models/inputIconSlotsProps.interface.ts`

**Güncellenen (components):**
- Tier 1: `DefaultInput`, `EmailInput`, `NumericInput`, `StatementInput`, `CreditCardInput`,
  `CVCInput`, `ExpireDateInput`, `PlateNumberInput`, `PinPasswordInput`
- Tier 2: `PasswordInput`, `PhoneInput`, `IbanInput`, `AmountInput`, `DateInput`, `SelectInput`
- Tier 3: `CheckBoxInput`, `ToggleInput`
- Orkestrasyon: `Input.tsx`

**Güncellenen (styles):** `Input.style.ts`, `PasswordInput.style.ts` (+ gerekiyorsa amount/date
absolute stilleri)

**Güncellenen (models):** ilgili tip arayüzlerine `InputIconSlotsProps` mixin'i;
`defaultInputProps`, `passwordInputProps` `icon` → kaldırılır.

---

## Test Stratejisi (TDD — önce test)

**`InputField` birim testleri:**
- Yalnızca sol / yalnızca sağ / ikisi / hiçbiri → doğru render
- `onPress` verilince `Pressable` sarımı + tıklama tetikleme; verilmeyince düz `Icon`
- Gap değeri size'a göre (4/8/12)

**Tip-özel regresyon:**
- Password: göz toggle `secureTextEntry`'yi çeviriyor; `rightIcon` görünümü değiştirse de
  fonksiyon sabit
- Phone: rehber `onPress` çalışıyor
- Iban: temizle/QR davranışı korunuyor
- Amount: ikili alan + para birimi davranışı korunuyor
- Date: takvim picker açılıyor (`viewType='input'` ve `'button'`)
- Select/multiSelect: dropdown açılıyor, chevron/id-card doğru
- Checkbox: kutu toggle'ı çalışıyor; ikon tıklaması kutuyu tetiklemiyor (stopPropagation)
- Toggle: switch çalışıyor; ikon tıklaması switch'i tetiklemiyor

**Bug regresyon:**
- Bordered + `leftIcon` + `marginBottom={16}` → boşluk çerçeve dışında, kutu içi dikey ortalı
- `leftIcon` ↔ metin gap ≥ size değeri

**Güncellenecek:** `DefaultInput.test`, `PasswordInput.test`, `Input.test`,
`CheckBoxInput.test`, `SelectInput.test`, `DateInput.test`, `AmountInput.test`, `IbanInput.test`,
`PhoneInput.test` + snapshot'lar.

---

## Sürüm & Dokümantasyon

- **Sürüm:** `0.8.0` (breaking `icon` kaldırma + geniş refactor).
- **Docs (EN/TR senkron):** bordered input + leading/trailing icon örneği; "spacing Input
  kökünde, TextInput'ta değil" notu; `icon` → `leftIcon` göç notu (CHANGELOG + migration).

## VetAsist Takip (publish sonrası)

- `paddingLeft={12}` ve "margin dış Item" workaround'ları kaldırılır.
- `icon={{name:'MAIL'}}` → `leftIcon={{name:'MAIL'}}`.
- `marginBottom` doğrudan `<Input>`'a verilebilir.

---

## Riskler

- Geniş kapsam (16+ bileşen) → regresyon riski; TDD + snapshot ile azaltılır.
- Tier 2 fonksiyonel davranışların korunması kritik (password state, phone permission, iban
  clear/QR, amount ikili alan, date picker, select modal).
- Tier 3'te ikon `onPress` ↔ kök kontrol `onPress` çakışması → `stopPropagation` ile ele alınır.
- `IbanInput`'un mevcut `rightIcon` semantiğinin sessizce değişmemesi için dikkatli göç.
- `DateInput` `viewType='button'` zaten Button `leftIcon` kullanıyor; input/button modları arası
  tutarlılık korunmalı.
