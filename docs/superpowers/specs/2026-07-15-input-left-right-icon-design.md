# Input Left/Right Icon Yapısı — Tasarım

> **Tarih:** 2026-07-15
> **Paket:** `@tansuk/rott-ui`
> **Tetikleyen:** VetAsist login handoff (`HANDOFF_ROTT_UI_INPUT.md`) + sol/sağ ikon ihtiyacı
> **Hedef sürüm:** `0.8.0` (breaking: `icon` prop kaldırılıyor)

---

## Amaç

Button'daki `leftIcon`/`rightIcon` modelini Input ailesine taşımak: sol ve/veya sağ ikon
**varsa** render edilir, **yoksa** render edilmez; TextInput ikonların varlığına göre akışkan
şekilde genişler/daralır (hiç ikon yoksa full). Aynı işte, handoff'ta raporlanan iki layout
bug'ı da kalıcı olarak düzeltilir.

## Kapsam dışı (YAGNI)

- Tier 3 tipleri: `amount` (çift alan + para birimi), `date`, `select`, `multiSelect`,
  `checkbox`, `toggle`. Bunlar yapısal olarak farklı; bu işte dokunulmaz.
- İlgisiz refactor'lar (docs `CommonItemContainer` uyumsuzluğu, Pressable `row` vb.).

---

## Mevcut durum (doğrulanmış)

- Ortak taban bileşen **yok**. Her tip kendi `<TextInput>`/`<MaskInput>`'ini bağımsız render
  edip `InputStyles(...).defaultTextInputStyle` paylaşıyor; layout'lar farklı.
- `DefaultInput` ve `StatementInput`, `...props`'u `InputStyles`'a geçiriyor →
  `commonUiStyleProperties` margin/padding'i **TextInput style**'ına yazıyor (**Bug #1**).
- `DefaultInput`'ta ikon ↔ metin arası gap yok; `PasswordInput`'ta absolute `left:10` +
  sabit `paddingLeft:34` → ~2px gap (**Bug #2**).
- `PasswordInput` (göz toggle), `PhoneInput` (rehber), `IbanInput` (temizle/QR),
  `AmountInput` (para birimi) kendi trailing elemanlarını `absolute right={0}
  bottom={icon.paddingBottom}` gibi eski (underline varsayan) desenlerle konumluyor.
- `IbanInput`'ta zaten bir `rightIcon` prop'u mevcut (ad-hoc temizle/QR semantiği).

---

## Mimari

### Ortak `InputField` bileşeni

Tek sorumluluğu **layout** olan sunum bileşeni (SOLID/SRP):

```
<Item row alignItemsCenter>
  {leftIcon  && <IconSlot marginRight={gap} .../>}
  <View flex:1>{children /* asıl TextInput / MaskInput */}</View>
  {rightIcon && <IconSlot marginLeft={gap} .../>}
</Item>
```

- İkon slotları, gap, hizalama ve akışkan `flex:1` genişleme/daralmayı **tek yerde** yönetir.
- Asıl input `children` olarak geçer → her tip kendi domain mantığını (keyboard, mask, format,
  fonksiyonel trailing davranış) korur (DDD).
- Eski `absolute + bottom` trailing deseni kaldırılır → çerçeveli kutuda doğru hizalama.
- Gap ikon üstünde `marginRight`/`marginLeft` olarak uygulanır (Button ile aynı yöntem; RN
  `gap` sürüm uyum riskinden kaçınmak için).

### `IconSlot` davranışı

- `onPress` verilirse ikon `Pressable`'a sarılır; verilmezse düz `Icon`.
- İkon ölçüsü verilmezse `InputStyleNormalizer({size}).icon` fallback'i (md=24).

### Tip katmanları

| Tier | Tipler | leftIcon | rightIcon |
| --- | --- | --- | --- |
| **1 — Nötr** | default, email, numeric, statement, creditCard, cvc, expireDate, plateNumber, pinPassword | Görünüm + `onPress` serbest | Görünüm + `onPress` serbest |
| **2 — Fonksiyonel trailing** | password (göz), phone (rehber), iban (temizle/QR) | Görünüm + `onPress` serbest | **Yalnızca görünüm**; `onPress` yok sayılır, yerleşik fonksiyon sabit |
| **3 — Kapsam dışı** | amount, date, select, multiSelect, checkbox, toggle | — | — |

Tier 2'de yerleşik fonksiyon (toggle/rehber/temizle) bileşenin sorumluluğundadır; `rightIcon`
yalnızca ikonun *appearance*'ını (name/variant/size) özelleştirir. Örn. `PasswordInput`
göz ikonunu içeride `rightIcon={{name: isSecure?'eye-disable':'eye', onPress: toggle}}` olarak
inşa edip `InputField`'e verir — kullanıcının gördüğü davranış değişmez.

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

- `InputIconSlotsProps` **yalnızca Tier 1 & Tier 2** model arayüzlerine eklenir; `BaseInputProps`'a
  eklenmez → Tier 3 API'si temiz kalır.
- **Breaking:** `DefaultInputProps`/`PasswordInputProps`'taki `icon` prop'u kaldırılır → `leftIcon`.
- `IbanInput`'un mevcut `rightIcon`'u yeni sözleşmeye uyarlanır: temizle/QR fonksiyonu sabit,
  `rightIcon` yalnızca QR ikonunun görünümünü özelleştirir (isim çakışması tekilleşir).

---

## Layout & Bug Fix'ler

### Bug #2 — gap + akışkanlık

- `defaultTextInputStyle`: `width: '100%'` → **`flex: 1`**.
- `PasswordInputStyles.leadingIcon` / `showPasswordIcon` absolute stilleri kaldırılır; her iki
  slot `InputField`'ten geçer.
- Phone/Iban trailing elemanları `InputField` sağ slotuna taşınır.
- Gap size-based: **xs/sm=4, md=8, lg/xl/xxl/full=12** (4'ün katları, mevcut normalizer
  gruplamasıyla uyumlu).

### Bug #1 — spacing sızıntısı

1. `InputStyles(...)` çağrılarına `...props` **geçilmez** (`DefaultInput`, `StatementInput`);
   yalnızca `fontSize, theme, size, includeBorderRadius`.
2. `TextInput`'a giden `{...props}` daraltılır: `name, errorMessage, border, touched,
   renderSeparator, leftIcon, rightIcon` ve tüm `margin*/padding*` CommonUi prop'ları TextInput'a
   gitmez.
3. Dış spacing (`marginBottom` vb.) `Input.tsx` **kök `<Item>`'ında** uygulanır (border wrapper
   dışında). `Input.tsx` bu spacing prop'larını child field bileşenine spread etmez.

---

## Dokunulan dosyalar (öngörü)

**Yeni:**
- `components/InputField.tsx`
- `models/inputIconProps.interface.ts`
- `models/inputIconSlotsProps.interface.ts`

**Güncellenen:**
- `components/`: `DefaultInput`, `PasswordInput`, `EmailInput`, `NumericInput`, `StatementInput`,
  `PhoneInput`, `IbanInput`, `CreditCardInput`, `CVCInput`, `ExpireDateInput`, `PlateNumberInput`,
  `PinPasswordInput`, `Input.tsx`
- `styles/`: `Input.style.ts`, `PasswordInput.style.ts`
- `models/`: Tier 1 & Tier 2 model arayüzleri (`leftIcon`/`rightIcon` mixin), `defaultInputProps`,
  `passwordInputProps`

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

**Bug regresyon:**
- Bordered + `leftIcon` + `marginBottom={16}` → boşluk çerçeve dışında, kutu içi dikey ortalı
- `leftIcon` ↔ metin gap ≥ size değeri

**Güncellenecek:** `DefaultInput.test`, `PasswordInput.test`, `Input.test` + snapshot'lar.

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

- Geniş kapsam (12+ bileşen) → regresyon riski; TDD + snapshot ile azaltılır.
- Tier 2 fonksiyonel davranışların refactor sırasında korunması kritik (özellikle password state,
  phone permission akışı, iban clear/QR).
- `IbanInput`'un mevcut `rightIcon` semantiğinin sessizce değişmemesi için dikkatli göç.
