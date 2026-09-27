---
title: Amount Input
description: Currency and numeric amount input with formatting
---

# Amount Input

Numeric input for currency and amounts with automatic formatting.

## Basic Usage

```tsx
<Input name='amount' type='amount' placeholder='0.00' value={amount} onChangeText={setAmount} />
```

## Currency

The currency icon on the right follows `currencyType`: `'TL'` (default), `'USD'` or
`'EUR'`. Pass `null` to hide it.

```tsx
<Input name='price' type='amount' label='Price' currencyType='USD' />
```

## Value Format

`onChangeText` receives the amount as a dot-decimal string with two decimals, such as
`"1234.50"`. You can pass that string straight back as `value`. The input also accepts
the Turkish-formatted text it displays, such as `"1.234,50"`.

```tsx
const [amount, setAmount] = useState('1234.50')

<Input name='amount' type='amount' value={amount} onChangeText={setAmount} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'amount'` | - | **Required** |
| `value` | `string` | - | `"1234.50"` or `"1.234,50"` |
| `onChangeText` | `(amount: string) => void` | - | Receives `"<integer>.<two decimals>"` |
| `currencyType` | `'TL' \| 'USD' \| 'EUR' \| null` | `'TL'` | Currency icon; `null` hides it |

## Related

- **[Numeric Input](/docs/components/input-numeric)**
