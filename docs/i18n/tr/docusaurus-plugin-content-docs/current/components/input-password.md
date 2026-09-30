---
title: Password Input
description: Göster/gizle toggle'ı olan şifre input'u
---

# Password Input

Göster/gizle toggle işlevine sahip güvenli şifre input'u.

## Özellikler {#features}

- 🔒 Güvenli metin girişi
- 👁️ Göster/gizle toggle'ı
- 🔤 Default olarak metin kabul eder, yalnızca rakam modu isteğe bağlıdır
- 🔐 Autocomplete desteği

## Temel Kullanım {#basic-usage}

```tsx
import {Input} from '@tansuk/rott-ui'

<Input
  name='password'
  type='password'
  placeholder='Enter password'
  value={password}
  onChangeText={setPassword}
/>
```

## Label ile {#with-label}

```tsx
<Input
  name='password'
  type='password'
  label='Password'
  placeholder='Min 8 characters'
  value={password}
  onChangeText={setPassword}
/>
```

## Validation ile {#with-validation}

```tsx
<Input
  name='password'
  type='password'
  label='Password'
  value={password}
  onChangeText={setPassword}
  errorMessage={errors.password}
  touched={touched.password}
/>
```

## Yalnızca Rakam (PIN tarzı) {#numeric-only-pin-style}

Default olarak şifre alanı her türlü metni kabul eder: harf, rakam ve sembol.
Girişi rakamlarla sınırlamak ve sayısal klavye kullanmak için `numericOnly`
verin (PIN tarzı):

```tsx
<Input
  name='pin'
  type='password'
  numericOnly
  placeholder='Enter PIN'
  value={pin}
  onChangeText={setPin}
/>
```

## Baştaki İkon ile {#with-a-leading-icon}

Alanın içinde baştaki bir ikon render etmek için `leftIcon` verin. Built-in
göster/gizle gözü `rightIcon` slot'unda kalır; kendi `rightIcon`'unuzu vererek
gözün görünümünü override edebilirsiniz (toggle işlevini değil):

```tsx
<Input
  name='password'
  type='password'
  leftIcon={{name: 'lock'}}
  placeholder='Enter password'
  value={password}
  onChangeText={setPassword}
/>
```

## Props {#props}

| Prop | Tip | Açıklama |
|------|------|-------------|
| `name` | `string` | **Zorunlu** - Input tanımlayıcısı |
| `type` | `'password'` | **Zorunlu** - 'password' olmalıdır |
| `value` | `string` | Mevcut değer |
| `onChangeText` | `(text: string) => void` | Değişiklik handler'ı |
| `placeholder` | `string` | Placeholder metni |
| `label` | `string \| InputLabelProps` | Input label'ı |
| `errorMessage` | `string` | Hata mesajı |
| `touched` | `boolean` | Validation touched state'i |
| `numericOnly` | `boolean` | Girişi rakamlarla sınırlar ve sayısal klavye kullanır (default: `false`) |
| `leftIcon` | `InputIconProps` | Alanın içinde render edilen, isteğe bağlı baştaki ikon |
| `rightIcon` | `InputIconProps` | Built-in göster/gizle gözünün görünümünü override eder (toggle işlevi korunur) |

## Özellikler {#features-1}

### Göster/Gizle Toggle'ı {#showhide-toggle}

Şifre görünürlüğünü açıp kapatmak için otomatik olarak bir göz ikonu içerir.

### Güvenlik {#security}

- Default olarak güvenli metin girişi
- Bazı platformlarda kopyala/yapıştır yok
- Autocomplete: 'password'

## Validation Örneği {#validation-example}

```tsx
import {Formik} from 'formik'
import * as Yup from 'yup'

const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Too short')
    .matches(/[A-Z]/, 'Need uppercase')
    .matches(/[0-9]/, 'Need number')
    .required('Required'),
})

<Formik
  initialValues={{password: ''}}
  validationSchema={PasswordSchema}
  onSubmit={handleSubmit}>
  {({handleChange, values, errors, touched}) => (
    <Input
      name='password'
      type='password'
      label='Password'
      placeholder='Min 8 characters'
      value={values.password}
      onChangeText={handleChange('password')}
      errorMessage={touched.password ? errors.password : ''}
      touched={touched.password}
    />
  )}
</Formik>
```

## Şifre Onayı {#confirm-password}

```tsx
<Input
  name='password'
  type='password'
  label='Password'
  value={password}
  onChangeText={setPassword}
/>

<Input
  name='confirmPassword'
  type='password'
  label='Confirm Password'
  value={confirmPassword}
  onChangeText={setConfirmPassword}
  errorMessage={password !== confirmPassword ? 'Passwords must match' : ''}
/>
```

## İlgili Sayfalar {#related}

- **[Input](/docs/components/input)** - Ana input dokümantasyonu
- **[Email Input](/docs/components/input-email)** - E-posta input'u
- **[PIN Input](/docs/components/input-pin)** - PIN/OTP input'u
