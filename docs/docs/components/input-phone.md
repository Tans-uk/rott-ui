---
title: Phone Input
description: Phone number input with masking
---

# Phone Input

Phone number input with customizable masking and formatting.

## Features

- 📱 Phone number masking
- 🌍 International format support
- ⌨️ Numeric keyboard
- 🎭 Custom mask patterns

## Basic Usage

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

## With Label

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

## Custom Masks

### US Format
```tsx
<Input
  name='phone'
  type='phone'
  mask='+1 ([000]) [000]-[0000]'
  placeholder='+1 (555) 123-4567'
/>
```

### Turkish Format
```tsx
<Input
  name='phone'
  type='phone'
  mask='+90 ([000]) [000] [00] [00]'
  placeholder='+90 (555) 123 45 67'
/>
```

### UK Format
```tsx
<Input
  name='phone'
  type='phone'
  mask='+44 [0000] [000000]'
  placeholder='+44 7700 900123'
/>
```

### Simple Format
```tsx
<Input
  name='phone'
  type='phone'
  mask='([000]) [000]-[0000]'
  placeholder='(555) 123-4567'
/>
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | **Required** - Input identifier |
| `type` | `'phone'` | **Required** - Must be 'phone' |
| `mask` | `string` | **Required** - Phone mask pattern |
| `value` | `string` | Current value |
| `onChangeText` | `(text: string) => void` | Change handler |
| `placeholder` | `string` | Placeholder text |
| `label` | `string \| InputLabelProps` | Input label |

## Mask Pattern

Use these characters in your mask:
- `[0]` - Single digit (0-9)
- `[000]` - Three digits
- `()`, `-`, ` `, `+` - Literal characters

## Validation Example

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

## Related

- **[Input](/docs/components/input)** - Main input documentation
- **[IBAN Input](/docs/components/input-iban)** - IBAN masking
- **[Credit Card Input](/docs/components/input-credit-card)** - Card masking
