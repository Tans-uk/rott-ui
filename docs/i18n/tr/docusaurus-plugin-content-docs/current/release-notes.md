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

## 0.9.0 {#090}

**Button prop sözleşmesi.** Public yüzeyde tanımlı olduğu halde renderer'ın yok
saydığı iki prop ve iddia ettiği boyutta olmayan bir boyut token'ı. Her iki hata
da sessizdi: kod type-check'ten geçiyor, render ediliyor ve hiçbir uyarı
vermiyordu, ama yanlış style üretiyordu.

### Breaking change'ler {#breaking-changes}

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

### Düzeltmeler {#fixed}

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

### Dokümantasyon {#documentation}

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
