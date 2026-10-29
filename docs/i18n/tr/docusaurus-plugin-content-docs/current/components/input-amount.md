---
title: Amount Input
description: Biçimlendirmeli para birimi ve sayısal tutar input'u
---

# Amount Input

Para birimi ve tutarlar için otomatik biçimlendirmeli sayısal input.

## Temel Kullanım {#basic-usage}

```tsx
<Input name='amount' type='amount' placeholder='0.00' value={amount} onChangeText={setAmount} />
```

## Para Birimi {#currency}

Sağdaki para birimi ikonu `currencyType`'ı takip eder: `'TL'` (default), `'USD'` ya da
`'EUR'`. Gizlemek için `null` verin.

```tsx
<Input name='price' type='amount' label='Price' currencyType='USD' />
```

## Değer Formatı {#value-format}

`onChangeText` tutarı, iki ondalıklı, nokta ondalıklı bir string olarak alır; örneğin
`"1234.50"`.

### Value Verme {#passing-a-value}

`value`, input mount olduğunda okunur; boş bir değer, `'0'` ya da `'0.00'` alanı boş
bırakır ve hiçbir şey bildirmez. Mount'tan sonra input yalnızca `value`'nun boş, `'0'`
ya da `'0.00'` olmasına tepki verir: bu durumda iki alanı da temizler ve `onChangeText`
üzerinden `"0.00"` bildirir. `value`'daki diğer tüm değişiklikler yok sayılır. Sonradan
gelen bir değer — örneğin verisini asenkron yükleyen bir edit formu — remount gerektirir:
input'u veri geldikten sonra mount edin ya da `key`'ini değiştirin.

```tsx
const [amount, setAmount] = useState('1234.50')

// `amount` alanı yalnızca mount olduğunda seed eder; yazılan değer ona `onChangeText` ile ulaşır.
<Input name='amount' type='amount' value={amount} onChangeText={setAmount} />
```

Input şu formatları kabul eder:

| Format | Örnekler | Okunan değer |
|-------|----------|---------|
| Nokta ondalık | `"1234.50"`, `"1234.5"`, `"0.5"`, `"1234.5000"` | 1234.50, 1234.50, 0.50, 1234.50 |
| Türkçe format: noktalar binlikleri gruplayabilir, virgül kuruşları başlatabilir | `"1.234,50"`, `"1.234"`, `"1234"` | 1234.50, 1234.00, 1234.00 |
| Virgülle gruplanmış binlikler ve opsiyonel nokta ondalık | `"1,234.50"`, `"1,234"` | 1234.50, 1234.00 |

Değerin etrafındaki boşluklar yok sayılır; ikinci ondalıktan sonrası yuvarlanmaz,
kesilir (`"1234.567"` 1234.56'dır). Tüm noktaları üçlü rakam gruplarını ayıran bir değer
(`"1.234"`, `"123.456"`) ondalık olarak değil, Türkçe binlik olarak okunur. İşaret ya da
harf içeren gibi diğer tüm formatlar alanı boş bırakır.

## Props {#props}

| Prop | Tip | Default | Açıklama |
|------|------|---------|-------------|
| `type` | `'amount'` | - | **Zorunlu** |
| `value` | `string` | - | Başlangıç tutarı, input mount olduğunda okunur; bkz. [Value Verme](#passing-a-value) |
| `onChangeText` | `(amount: string) => void` | - | `"<integer>.<two decimals>"` alır |
| `currencyType` | `'TL' \| 'USD' \| 'EUR' \| null` | `'TL'` | Para birimi ikonu; `null` gizler |

## İlgili Sayfalar {#related}

- **[Numeric Input](/docs/components/input-numeric)**
