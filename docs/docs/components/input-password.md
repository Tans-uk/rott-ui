---
title: Password Input
description: Password input with show/hide toggle
---

# Password Input

Secure password input with show/hide toggle functionality.

## Features

- 🔒 Secure text entry
- 👁️ Show/hide toggle
- 🔤 Accepts text by default, numeric-only opt-in
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

## Numeric-only (PIN style)

By default the password field accepts any text — letters, numbers, and
symbols. Pass `numericOnly` to restrict input to digits and use a numeric
keyboard (PIN style):

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

## With a leading icon

Pass a `leftIcon` to render a leading icon inside the field. The built-in
show/hide eye stays in the `rightIcon` slot; you can override its appearance
(but not its toggle function) by passing your own `rightIcon`:

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
| `numericOnly` | `boolean` | Restrict input to digits and use a numeric keyboard (default: `false`) |
| `leftIcon` | `InputIconProps` | Optional leading icon rendered inside the field |
| `rightIcon` | `InputIconProps` | Overrides the built-in show/hide eye's appearance (toggle function stays) |

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
