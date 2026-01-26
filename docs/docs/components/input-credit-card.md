---
title: Credit Card Input
description: Credit card number input with masking and validation
---

# Credit Card Input

Credit card number input with automatic formatting and card type detection.

## Features

- 💳 Auto-formatting (XXXX XXXX XXXX XXXX)
- 🏦 Card type detection
- ✅ Luhn algorithm validation
- ⌨️ Numeric keyboard

## Basic Usage

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

## With Label

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

## Complete Card Form

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

## Props

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | **Required** - Input identifier |
| `type` | `'creditCard'` | **Required** - Must be 'creditCard' |
| `value` | `string` | Current value |
| `onChangeText` | `(text: string) => void` | Change handler |
| `placeholder` | `string` | Placeholder text |
| `label` | `string \| InputLabelProps` | Input label |
| `errorMessage` | `string` | Error message |

## Formatting

- Automatically adds spaces every 4 digits
- Limits to 16 digits (19 with spaces)
- Removes non-numeric characters

## Card Type Detection

Detects major card types:
- Visa (starts with 4)
- Mastercard (starts with 51-55)
- American Express (starts with 34 or 37)
- Discover (starts with 6011 or 65)

## Validation Example

```tsx
import {Formik} from 'formik'
import * as Yup from 'yup'

const validateCardNumber = (value) => {
  // Luhn algorithm
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

## Related

- **[Input](/docs/components/input)** - Main input documentation
- **[CVC Input](/docs/components/input-cvc)** - Card security code
- **[Expire Date Input](/docs/components/input-expire-date)** - Card expiry
