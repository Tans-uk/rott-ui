---
title: Password Input
description: Password input with show/hide toggle
---

# Password Input

Secure password input with show/hide toggle functionality.

## Features

- 🔒 Secure text entry
- 👁️ Show/hide toggle
- ⌨️ Optimized keyboard
- 🔐 Auto-complete support

## Basic Usage

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

## With Label

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

## With Validation

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

## Props

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | **Required** - Input identifier |
| `type` | `'password'` | **Required** - Must be 'password' |
| `value` | `string` | Current value |
| `onChangeText` | `(text: string) => void` | Change handler |
| `placeholder` | `string` | Placeholder text |
| `label` | `string \| InputLabelProps` | Input label |
| `errorMessage` | `string` | Error message |
| `touched` | `boolean` | Validation touched state |

## Features

### Show/Hide Toggle

Automatically includes an eye icon to toggle password visibility.

### Security

- Secure text entry by default
- No copy/paste on some platforms
- Auto-complete: 'password'

## Validation Example

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

## Confirm Password

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

## Related

- **[Input](/docs/components/input)** - Main input documentation
- **[Email Input](/docs/components/input-email)** - Email input
- **[PIN Input](/docs/components/input-pin)** - PIN/OTP input
