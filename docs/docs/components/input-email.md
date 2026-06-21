---
title: Email Input
description: Email input with validation and formatting
---

# Email Input

Email input with automatic validation and keyboard optimization.

## Features

- ✅ Email validation
- ⌨️ Email keyboard type
- 🔤 Lowercase auto-conversion
- 📧 Auto-complete support

## Basic Usage

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

## With Label

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

## With Validation

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

## Props

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | **Required** - Input identifier |
| `type` | `'email'` | **Required** - Must be 'email' |
| `value` | `string` | Current value |
| `onChangeText` | `(text: string) => void` | Change handler |
| `placeholder` | `string` | Placeholder text |
| `label` | `string \| InputLabelProps` | Input label |
| `errorMessage` | `string` | Error message |
| `touched` | `boolean` | Validation touched state |

## Keyboard Type

Automatically sets:
- `keyboardType`: 'email-address'
- `autoCapitalize`: 'none'
- `autoComplete`: 'email'
- `autoCorrect`: false

## Validation Example

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

## Related

- **[Input](/docs/components/input)** - Main input documentation
- **[Password Input](/docs/components/input-password)** - Password input
- **[Forms Guide](/docs/guides/forms)** - Complete form examples
