---
id: release-notes
title: Release Notes
description: Yayımlanan her @tansuk/rott-ui release'inde neler değişti.
---

# Release Notes

`@tansuk/rott-ui` paketinin yayımlanan tüm release'leri, en yeniden en eskiye.

Sürümler [semantic versioning](https://semver.org) kurallarına uyar. Kütüphane
`0.x` aşamasındayken bir **minor** artış breaking change içerebilir; bir **patch**
artışı ise asla içermez. Breaking change'ler her zaman en başta, yanlarında
migration adımıyla birlikte listelenir.

## 0.10.0 {#0100}

**Correctness fix'leri.** 0.9.0'ın bir review'unda bulunan crash'ler, para ile ilgili
bug'lar ve birkaç sessiz hata. Her fix bir regression test ile gelir ve test setup'ı
artık crash'leri gizleyen `React.useContext` mock'unu yapmıyor. Bazı fix'ler bir
uygulamanın güvendiği davranışı değiştirdiği için bu bir minor release'tir.

### Breaking change'ler {#breaking-changes}

- **Bildirimler artık uygulamayı bloklamıyor.** Bir toast görünürken uygulamadaki her
  touch yok sayılıyordu. Uygulama artık default olarak etkileşimli kalıyor. Eski
  davranışı korumak için `RottProvider`'a `blockTouchesWhileNotificationVisible` verin.
  Default modda toast artık touch'a tepki verir: dokunmak onu kapatır ve `onPress`'ini
  çalıştırır, yana kaydırmak kapatır. Önceden ona dokunulamıyordu.
- **Loading durumundaki `Button` basmaları yok sayar.** `isLoading` iken bir butona
  basmak artık `onPress`'i çağırmıyor; böylece yavaş bir request iki kez gönderilemez.
  Görünüşü aynı. Loading durumundaki bir buton aynı zamanda iptal kontrolü olarak
  kullanılıyorsa, bunun için ayrı bir kontrol render edin.
- **`EmailInput` `value` prop'unu takip eder.** `value` verdiğinizde alan onu gösterir,
  dolayısıyla form reset'leri çalışır. `onChangeText` olmadan verilen bir `value`, her
  controlled React input'unda olduğu gibi alanı artık read-only yapar. `value`'yu yalnızca
  initial value olarak verip `onChangeText` ile başka bir state'i güncelleyen bir
  uygulamada alan artık yazmayı kabul etmez. Yazılan metni `value` üzerinden geri
  besleyin ya da `value`'yu set etmeyin. `value`'yu tekrar `undefined` yapmak alanı
  temizler.
- **Eksik bir `rott.config` default asset'leri korur.** `rott.config` runtime'da
  çözümlenemediğinde built-in ikonlar ve görseller kaybolmak yerine kullanılır.
  Açıkça boş bırakılmış bir config ise hâlâ yalnızca consumer'ın taranan asset'leri
  anlamına gelir.
- **`AmountInput` artık para birimi ikonunu gösteriyor.** 0.9.0'da ikon, büyük harfli
  para birimi koduyla (`'TL'`) aranıyordu; bu hiçbir built-in ikonla eşleşmediği için
  glif çizilmiyordu. Artık built-in `tl`, `usd` ve `euro` key'leriyle aranıyor; böylece
  bir `AmountInput` glifini gösterir: default olarak `TL`, ya da `currencyType` ile `USD`
  veya `EUR`. Uygulamanızın para birimi koduyla (`TL`) kaydettiği bir ikon hâlâ öncelikli.
  `rott.config`'i built-in ikonları dışarıda bırakan ve böyle bir ikon kaydetmeyen bir
  uygulamada glif gösterilmez. Glifi gizlemek için `currencyType={null}` verin.
- **`AmountInput` değersiz mount olduğunda hiçbir şey bildirmez.** Kullanıcı bir şey
  yazmadan önce `onChangeText` üzerinden `"0.00"` bildiriyordu. Form'unuz bu bildirime
  güveniyorsa, initial tutarı kendiniz set edin.
- **`Header` geri basıldığında `goBackFunction`'ı çağırır.** Önceden `goBackFunction`
  yok sayılıyor ve her zaman theme'in `goBack`'i çalışıyordu. Artık `goBackFunction`
  verildiğinde theme'in `goBack`'i yerine o çalışır. Theme navigasyonunu korumak için
  prop'u kaldırın ya da fonksiyonun içinden navigate edin.
- **`formatMessage` dil değiştiğinde çağıranını artık yeniden render etmez.** Aktif dili
  çağrıldığı anda okur. Kütüphanenin kendi component'leri runtime dil değişikliğini
  hâlâ takip eder, ancak component'lerinizde `formatMessage` ile render ettiğiniz metin,
  o component başka bir nedenle yeniden render edilene kadar eski dilde kalır. Runtime
  dil değişikliğini takip etmesi gereken component'ler `useTranslator` kullanmalı.

### Eklenenler {#added}

- **`Footer` paket root'undan export ediliyor.** Bir ekranın alt aksiyonları için, bir
  `Content` render eden container'dır; bu yüzden her `Content` prop'unu alır.
  Hepsi override edilebilen default'ları `minHeight` 128, `paddingTop` 24, `gap` 16 ve
  cihazın alt safe-area inset'ini ayıran `useBottomInset` açık. Kendi arka planı yoktur.
  Bkz. [Footer](./components/footer.md) sayfası.

### Düzeltmeler {#fixed}

- CVC bilgi butonu ve `DateInput`'un her `modal-*` modu "Invalid hook call" ile
  crash oluyordu. `formatMessage` artık bir hook değil ve her yerde çalışır.
- `AmountInput`, kendi ürettiği bir değerle mount olduğunda değerini 100 ile çarpıyordu
  (`"1234.50"` `"123450.00"` oluyordu). Artık herhangi sayıda ondalığa sahip nokta
  ondalığı (`"1234.5000"` 1234.50'dir; ikinci ondalıktan sonrası kesilir), Türkçe formatı
  (`"1.234,50"`), virgülle gruplanmış binlikleri (`"1,234.50"`) ve etrafında boşluk olan
  değerleri okuyor. Okuyamadığı bir değer başka bir tutara dönüşmek yerine alanı boş
  bırakır.
- Bir `AmountInput`'u temizlemek `"0.00"`'ı güncel `onChangeText` üzerinden bildirir;
  önceden ilk render'daki handler'ı kullanıyordu.
- Bir ekrandaki iki `DateInput` artık birbirinin tarihini ezmiyor.
- Mount olduktan sonra `value`'su değişen bir `DateInput` yeni değeri onaylar; kaydırmadan
  onaylamak mount anındaki tarihi commit ediyordu.
- `"2026-01-10"` gibi yalnızca tarih içeren bir `DateInput` değeri her saat diliminde
  o takvim günüdür. UTC'nin gerisinde bir önceki güne dönüşüyordu ve input mount'ta o
  günü bildiriyordu.
- `viewType="button"` olan disabled bir `DateInput` artık picker'ı açmıyor.
- `value`'su tekrar `undefined` olan bir `EmailInput` temizlenir; eski metni
  gösteriyordu.
- `Notification.hideAll()` toast'ları gizler; önceden hiçbir şey yapmıyordu.
- `Notification` çağrıları bir component'in ilk mount effect'inden çalışır; önceden
  `TypeError` fırlatıyordu. `blockTouchesWhileNotificationVisible` ile engelleme ekrandaki
  toast'ları takip eder; böylece hiç görünmeyen ya da iki kez kapanan bir toast artık
  uygulamayı bloklu bırakmaz ya da başka bir toast görünürken blokajı kaldırmaz.
- `Notification.success`, `warning`, `danger` ve `info`'ya, ya da bu variant'lardan
  biriyle `Notification.show`'a verilen `onPress`, toast'a dokunulduğunda çalışır.
- `Button` `fontFamily` prop'unu uygular.
- `Image` local `require()` source'larını ve source dizilerini render eder. Remote bir
  source'un set ettiği `cache` policy'sini korur ve `file://` ya da `data:` uri'lerine
  artık `cache: 'reload'` eklemez.
- `List`, `isLoading` kesirli bir `estimatedItemSize` ile set edildiğinde artık
  `RangeError` fırlatmıyor.
- `TabWidget` tab içeriğini yeniden render'lar boyunca mount'lu tutar.
- `RottProvider config` ile eklenen renkler variant olarak çözümlenir. `config`'i
  değiştirmek ya da kaldırmak artık önceki config'in değerlerini geçerli bırakmaz.
- Kütüphanenin `Array` ve `String` helper'ları artık enumerable değil; böylece
  array'leriniz ve string'leriniz üzerindeki `for...in` onları listelemeyi bırakır.

### Dokümantasyon {#documentation}

- Notification sayfası var olmayan `Notification.error` ve `Notification.custom`'ı
  belgeliyordu; artık gerçek method'ları listeliyor. Pakette gelen Notification
  README'si de `error` ve `custom`'ı listeliyordu ve düzeltildi.
- Container sayfası `showStatusBar`'ın default'unu `true` olarak listeliyordu; status
  bar, siz set etmedikçe gizlidir.
- Internationalization guide'ı `const { t } = useTranslator()` gösteriyordu; hook
  `translator` döndürür.
- Button, Amount input, Email input, Image, Header, Configuration, Installation,
  Notification ve rott.config sayfaları yukarıdaki davranışı anlatıyor.

### Tooling {#tooling}

- `publish` script'i artık `release:npm`. npm, bir paketin `publish` script'ini her
  `npm publish`'ten sonra, `--dry-run` dahil, çalıştırır; bu yüzden eski ad ikinci,
  iç içe bir publish başlatıyordu.

## 0.9.0 {#090}

**Button prop sözleşmesi.** Public yüzeyde tanımlı olduğu halde renderer'ın yok
saydığı iki prop ve iddia ettiği boyutta olmayan bir boyut token'ı. Her iki hata
da sessizdi: kod type-check'ten geçiyor, render ediliyor ve hiçbir uyarı
vermiyordu, ama yanlış style üretiyordu.

### Breaking change'ler {#breaking-changes-1}

**`size="full"` artık sabit bir genişlik değil, container'ına göre belirleniyor.**

Daha önce 390pt'lik bir referans cihazdan ölçeklenen sabit bir `342px` değerine
çözümleniyordu ve bu hesabın hiçbir aşamasında parent genişliği yer almıyordu —
dolayısıyla container'ı değil ekranı takip ediyor ve referans içerik kutusundan dar
olan her parent'tan taşıyordu. Artık parent genişliğinin `100%` değerine çözümleniyor.

Tam genişlikteki bir sayfada ikisi aynı piksel değerine karşılık gelir, bu yüzden
sayfa seviyesindeki butonlar değişmez. Yalnızca iç içe kullanımlar değişir — zaten
bozuk olanlar da bunlardı.

```tsx
// Önceden: sabit 342, kartın padding'inden taşıyordu.
// Şimdi: kartın içerik kutusunu dolduruyor.
<Item paddingHorizontal={24}>
  <Button size="full">Continue</Button>
</Item>
```

Bir call site `full` değerinin sabit bir genişlik olmasına bilerek dayanıyorsa,
genişliği açıkça verin:

```tsx
<Button size="full" width={342}>Continue</Button>
```

**`xl` ve `xxl` birbirinden ayrı boyutlardır.**

Daha önce `full` ve default ile aynı branch'i paylaşıyorlardı; bu da dördünü
birbirinden ayırt edilemez hale getiriyordu. Artık genişliklerini, diğer tüm
component'lerin kullandığı tablo olan `sizeToPercentage` üzerinden çözümlüyor ve
kendi yüksekliklerini taşıyorlar.

| Boyut | Genişlik | Yükseklik |
|------|-------|--------|
| `xs` | 85.5 | 36 |
| `sm` | 114 | 40 |
| `md` | 171 | 48 |
| `lg` | 228 | 56 |
| `xl` | parent'ın %85'i | 64 |
| `xxl` | parent'ın %92.5'i | 72 |
| `full` | parent'ın %100'ü | 56 |

`xs` ile `lg` arasındaki boyutlar sabit genişlik olarak kalır; 390pt'lik bir referans
cihaza göre ifade edilir ve gerçek ekran genişliğine ölçeklenir.

:::note
Yüzdelik genişlikler, genişliği çözümlenmiş bir parent gerektirir. Boyutunu
içeriğine göre alan bir parent içinde — örneğin `alignItems: center` olan ve
genişliği verilmemiş bir sütunda — yüzde değeri o küçülmüş kutuya göre çözümlenir.
Eski sabit genişlik bundan etkilenmiyordu; yenisi etkileniyor.
:::

**`size` prop'u verilmeyen bir buton artık tam genişliktedir.**

Default değer `{height: 'lg'}` olup daha önce aynı sabit `342px` değerine
düşüyordu. Artık parent genişliğinin `100%` değerine çözümleniyor; yükseklik ise
değişmeden `56` olarak kalıyor.

### Düzeltmeler {#fixed-1}

- **`borderWidth` ve `borderColor` her variant'ta dikkate alınır.**
  ([#8](https://github.com/Tans-uk/rott-ui/issues/8))
  Her iki prop da public yüzeyde tanımlıydı ama hiç okunmuyordu — border yalnızca
  variant adından türetiliyordu, bu yüzden bunları veren çağıran taraf ne bir uyarı
  alıyor ne de bir etki görüyordu. Artık açıkça verilen prop'lar kazanıyor; ikisi de
  verilmediğinde `*-outline` border'ı fallback olarak korunuyor.

  Bu, dolgu rengi bir marka kılavuzuyla sabitlenmiş kontroller için önemlidir. Bu
  durumda kontrolü sayfadan ayıran tek şey border'dır ve
  [WCAG 2.1 SC 1.4.11](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast)
  bu sınırda en az 3:1 kontrast ister. Beyaza yakın bir sayfadaki beyaz bir buton
  daha önce hiç border olmadan yayına çıkıyordu.

  ```tsx
  <Button backgroundColor="#FFFFFF" color="#1F1F1F" borderWidth={1} borderColor="#747775">
    Sign in with Google
  </Button>
  ```

- **Outline olmayan variant'lar artık hardcoded beyaz bir border rengi taşımıyor.**
  ([#8](https://github.com/Tans-uk/rott-ui/issues/8))
  `borderColor`, outline olmayan her variant'ta default olarak `'white'` değerini
  alıyordu. Yalnızca `borderWidth` tesadüfen undefined olduğu için görünmüyordu ve
  çağıran tarafın verdiği her rengi sessizce eziyordu. Artık default bir değer atanmıyor.

  Yalnızca `borderWidth` vererek o beyaz kenara güveniyorsanız,
  `borderColor="white"` değerini açıkça verin — değer atanmamış bir renk React
  Native'in default rengi olan siyahla render edilir.

- **`size="full"` artık padding'li parent'lardan taşmıyor.**
  ([#9](https://github.com/Tans-uk/rott-ui/issues/9))
  Yukarıdaki breaking change notuna bakın.

### Dokümantasyon {#documentation-1}

- Button sayfası border prop'larını, eksiksiz boyut tablosunu ve hangi
  genişliklerin sabit, hangilerinin parent'a göreli olduğunu belgeliyor.
- Düzeltildi: props tablosu `size` için default değeri `'md'` olarak veriyordu;
  doğrusu `{height: 'lg'}`. `xxl` ise belgelenen boyutlar arasında hiç yer almıyordu.
- Bu release notes sayfası.

### Hâlâ açık olanlar {#still-open}

Her iki issue da bu release ile **kapatılmamış** daha geniş eksiklikleri ortaya koyuyor:

- `commonUiStyleProperties` yalnızca beş `border*Radius` prop'unu eşliyor.
  `CommonUiProps` üzerinde tanımlı kalan 14 border prop'unun — genişlikler ve
  renkler — Button dışındaki component'lerde hâlâ bir style'a ulaşan yolu yok.
- Sabit `342` referans cihaz genişliği `Notification`, `ActionMenu`,
  `ActionMenuHeader` ve `ToggleInput` içinde hâlâ hardcoded durumda.

## Önceki release'ler {#earlier-releases}

`0.8.0` dahil olmak üzere o sürüme kadarki release'ler bu sayfadan önceye aittir
ve yalnızca `v0.6.0`, `v0.5.2` ve `v0.4.1` git tag'i taşır — `0.7.0` ve `0.8.0`
npm'e tag'siz publish edildi, bu yüzden onlar için bağlantı verilecek bir commit
aralığı yok. Yayımlanan tüm sürümler
[npm](https://www.npmjs.com/package/@tansuk/rott-ui?activeTab=versions) üzerinde listelenir.

Her sürüm artışını taşıyan commit'lerden özetlenmiştir:

- **`0.8.0`** — tüm input tiplerinde (`amountInput`, `ibanInput`, `dateInput`,
  `selectInput`, `checkBoxInput`, `toggleInput`) `leftIcon` / `rightIcon`
  slot'ları; opsiyonel callback guard'ları sayesinde `DateInput`, `SelectInput` ve
  `ToggleInput` artık handler'ları verilmediğinde hata fırlatmıyor.
- **`0.7.0`** — `rott.config` ve `Icon` runtime çözümleme düzeltmeleri;
  `RottProvider` config'i her render'da deterministik olarak `themeConfig` ile merge ediyor.
- **`0.6.0` ve öncesi** — [tag'lere](https://github.com/Tans-uk/rott-ui/tags)
  bakın.

Tag'leme bu release ile yeniden başlıyor.
