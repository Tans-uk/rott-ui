---
title: Email Input
description: Validation ve biçimlendirme destekli e-posta input'u
---

# Email Input

Otomatik validation ve klavye optimizasyonu sunan e-posta input'u.

## Özellikler {#features}

- ✅ E-posta validation'ı
- ⌨️ E-posta klavye tipi
- 🔤 Otomatik küçük harfe dönüştürme
- 📧 Autocomplete desteği

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

## Label ile {#with-label}

```tsx
<Input
  name='email'
  type='email'
  label='Email Address'
  placeholder='you@example.com'
  value={email}
  onChangeText={setEmail}
/>
```

## Validation ile {#with-validation}

```tsx
<Input
  name='email'
  type='email'
  label='Email'
  value={email}
  onChangeText={setEmail}
  errorMessage={errors.email}
  touched={touched.email}
/>
```

## Props {#props}

| Prop | Tip | Açıklama |
|------|------|-------------|
| `name` | `string` | **Zorunlu** - Input tanımlayıcısı |
| `type` | `'email'` | **Zorunlu** - 'email' olmalıdır |
| `value` | `string` | Mevcut değer |
| `onChangeText` | `(text: string) => void` | Değişiklik handler'ı |
| `placeholder` | `string` | Placeholder metni |
| `label` | `string \| InputLabelProps` | Input label'ı |
| `errorMessage` | `string` | Hata mesajı |
| `touched` | `boolean` | Validation touched state'i |

## Klavye Tipi {#keyboard-type}

Otomatik olarak şunları ayarlar:
- `keyboardType`: 'email-address'
- `autoCapitalize`: 'none'
- `autoComplete`: 'email'
- `autoCorrect`: false

## Validation Örneği {#validation-example}

```tsx
import {Formik} from 'formik'
import * as Yup from 'yup'

const EmailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
})

<Formik
  initialValues={{email: ''}}
  validationSchema={EmailSchema}
  onSubmit={handleSubmit}>
  {({handleChange, values, errors, touched}) => (
    <Input
      name='email'
      type='email'
      label='Email'
      value={values.email}
      onChangeText={handleChange('email')}
      errorMessage={touched.email ? errors.email : ''}
      touched={touched.email}
    />
  )}
</Formik>
```

## İlgili Sayfalar {#related}

- **[Input](/docs/components/input)** - Ana input dokümantasyonu
- **[Password Input](/docs/components/input-password)** - Şifre input'u
- **[Formlar Rehberi](/docs/guides/forms)** - Eksiksiz form örnekleri
