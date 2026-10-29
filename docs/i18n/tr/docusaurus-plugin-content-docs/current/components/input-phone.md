---
title: Phone Input
description: Maskelemeli telefon numarası input'u
---

# Phone Input

Özelleştirilebilir maskeleme ve biçimlendirme sunan telefon numarası input'u.

## Özellikler {#features}

- 📱 Telefon numarası maskeleme
- 🌍 Uluslararası format desteği
- ⌨️ Sayısal klavye
- 🎭 Özel maske pattern'leri

## Temel Kullanım {#basic-usage}

```tsx
import {Input} from '@tansuk/rott-ui'

<Input
  name='phone'
  type='phone'
  mask='+1 ([000]) [000]-[0000]'
  value={phone}
  onChangeText={setPhone}
/>
```

## Label ile {#with-label}

```tsx
<Input
  name='phone'
  type='phone'
  label='Phone Number'
  mask='+1 ([000]) [000]-[0000]'
  placeholder='+1 (555) 123-4567'
  value={phone}
  onChangeText={setPhone}
/>
```

## Özel Maskeler {#custom-masks}

### ABD Formatı {#us-format}
```tsx
<Input
  name='phone'
  type='phone'
  mask='+1 ([000]) [000]-[0000]'
  placeholder='+1 (555) 123-4567'
/>
```

### Türkiye Formatı {#turkish-format}
```tsx
<Input
  name='phone'
  type='phone'
  mask='+90 ([000]) [000] [00] [00]'
  placeholder='+90 (555) 123 45 67'
/>
```

### Birleşik Krallık Formatı {#uk-format}
```tsx
<Input
  name='phone'
  type='phone'
  mask='+44 [0000] [000000]'
  placeholder='+44 7700 900123'
/>
```

### Basit Format {#simple-format}
```tsx
<Input
  name='phone'
  type='phone'
  mask='([000]) [000]-[0000]'
  placeholder='(555) 123-4567'
/>
```

## Props {#props}

| Prop | Tip | Açıklama |
|------|------|-------------|
| `name` | `string` | **Zorunlu** - Input tanımlayıcısı |
| `type` | `'phone'` | **Zorunlu** - 'phone' olmalıdır |
| `mask` | `string` | **Zorunlu** - Telefon maske pattern'i |
| `value` | `string` | Mevcut değer |
| `onChangeText` | `(text: string) => void` | Değişiklik handler'ı |
| `placeholder` | `string` | Placeholder metni |
| `label` | `string \| InputLabelProps` | Input label'ı |

## Maske Pattern'i {#mask-pattern}

Maskenizde şu karakterleri kullanın:
- `[0]` - Tek rakam (0-9)
- `[000]` - Üç rakam
- `()`, `-`, ` `, `+` - Sabit karakterler

## Validation Örneği {#validation-example}

```tsx
import {Formik} from 'formik'
import * as Yup from 'yup'

const PhoneSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone')
    .required('Required'),
})

<Formik
  initialValues={{phone: ''}}
  validationSchema={PhoneSchema}
  onSubmit={handleSubmit}>
  {({handleChange, values, errors, touched}) => (
    <Input
      name='phone'
      type='phone'
      mask='+1 ([000]) [000]-[0000]'
      label='Phone'
      value={values.phone}
      onChangeText={handleChange('phone')}
      errorMessage={touched.phone ? errors.phone : ''}
      touched={touched.phone}
    />
  )}
</Formik>
```

## İlgili Sayfalar {#related}

- **[Input](/docs/components/input)** - Ana input dokümantasyonu
- **[IBAN Input](/docs/components/input-iban)** - IBAN maskeleme
- **[Credit Card Input](/docs/components/input-credit-card)** - Kart maskeleme
