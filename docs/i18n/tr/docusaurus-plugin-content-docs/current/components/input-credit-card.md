---
title: Credit Card Input
description: Maskeleme ve validation destekli kredi kartı numarası input'u
---

# Credit Card Input

Otomatik biçimlendirme ve kart tipi algılama özellikli kredi kartı numarası input'u.

## Özellikler {#features}

- 💳 Otomatik biçimlendirme (XXXX XXXX XXXX XXXX)
- 🏦 Kart tipi algılama
- ✅ Luhn algoritması ile validation
- ⌨️ Sayısal klavye

## Temel Kullanım {#basic-usage}

```tsx
import {Input} from '@tansuk/rott-ui'

<Input
  name='cardNumber'
  type='creditCard'
  placeholder='0000 0000 0000 0000'
  value={cardNumber}
  onChangeText={setCardNumber}
/>
```

## Label ile {#with-label}

```tsx
<Input
  name='cardNumber'
  type='creditCard'
  label='Card Number'
  placeholder='1234 5678 9012 3456'
  value={cardNumber}
  onChangeText={setCardNumber}
/>
```

## Eksiksiz Kart Formu {#complete-card-form}

```tsx
import {Input, Item} from '@tansuk/rott-ui'

<>
  <Input
    name='cardNumber'
    type='creditCard'
    label='Card Number'
    placeholder='0000 0000 0000 0000'
    value={cardNumber}
    onChangeText={setCardNumber}
  />

  <Item row>
    <Input
      name='expireDate'
      type='expireDate'
      label='Expiry'
      placeholder='MM/YY'
      flex={1}
      marginRight={8}
    />
    <Input
      name='cvc'
      type='cvc'
      label='CVC'
      placeholder='123'
      flex={1}
      marginLeft={8}
    />
  </Item>
</>
```

## Props {#props}

| Prop | Tip | Açıklama |
|------|------|-------------|
| `name` | `string` | **Zorunlu** - Input tanımlayıcısı |
| `type` | `'creditCard'` | **Zorunlu** - 'creditCard' olmalıdır |
| `value` | `string` | Mevcut değer |
| `onChangeText` | `(text: string) => void` | Değişiklik handler'ı |
| `placeholder` | `string` | Placeholder metni |
| `label` | `string \| InputLabelProps` | Input label'ı |
| `errorMessage` | `string` | Hata mesajı |

## Biçimlendirme {#formatting}

- Her 4 rakamda bir otomatik olarak boşluk ekler
- 16 rakamla sınırlar (boşluklarla birlikte 19)
- Sayısal olmayan karakterleri kaldırır

## Kart Tipi Algılama {#card-type-detection}

Başlıca kart tiplerini algılar:
- Visa (4 ile başlar)
- Mastercard (51-55 ile başlar)
- American Express (34 veya 37 ile başlar)
- Discover (6011 veya 65 ile başlar)

## Validation Örneği {#validation-example}

```tsx
import {Formik} from 'formik'
import * as Yup from 'yup'

const validateCardNumber = (value) => {
  // Luhn algoritması
  const digits = value.replace(/\s/g, '')
  if (!/^\d{13,19}$/.test(digits)) return false
  
  let sum = 0
  let isEven = false
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i])
    if (isEven) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
    isEven = !isEven
  }
  
  return sum % 10 === 0
}

const CardSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .test('valid-card', 'Invalid card number', validateCardNumber)
    .required('Required'),
})
```

## İlgili Sayfalar {#related}

- **[Input](/docs/components/input)** - Ana input dokümantasyonu
- **[CVC Input](/docs/components/input-cvc)** - Kart güvenlik kodu
- **[Expire Date Input](/docs/components/input-expire-date)** - Kart son kullanma tarihi
