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
`"1234.50"`.

### Passing a Value

`value` is read when the input mounts; an empty value, `'0'` or `'0.00'` leaves the field
blank and reports nothing. After mount, the input reacts only to `value` becoming empty,
`'0'` or `'0.00'`: that clears both fields and reports `"0.00"` through `onChangeText`.
Any other change to `value` is ignored. A value that arrives later, such as an edit form
that loads its data asynchronously, needs a remount: mount the input after the data
arrives, or change its `key`.

```tsx
const [amount, setAmount] = useState('1234.50')

// `amount` only seeds the field when it mounts; typing reaches it through `onChangeText`.
<Input name='amount' type='amount' value={amount} onChangeText={setAmount} />
```

The input accepts these shapes:

| Shape | Examples | Read as |
|-------|----------|---------|
| Dot decimal | `"1234.50"`, `"1234.5"`, `"0.5"`, `"1234.5000"` | 1234.50, 1234.50, 0.50, 1234.50 |
| Turkish format: dots may group thousands, a comma may start the cents | `"1.234,50"`, `"1.234"`, `"1234"` | 1234.50, 1234.00, 1234.00 |
| Comma-grouped thousands with an optional dot decimal | `"1,234.50"`, `"1,234"` | 1234.50, 1234.00 |

Spaces around the value are ignored, and decimals beyond the second are cut, not rounded
(`"1234.567"` is 1234.56). A value whose dots all separate groups of three digits
(`"1.234"`, `"123.456"`) is read as Turkish thousands, not as decimals. Any other shape,
such as a sign or letters, leaves the field empty.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'amount'` | - | **Required** |
| `value` | `string` | - | Initial amount, read when the input mounts; see [Passing a Value](#passing-a-value) |
| `onChangeText` | `(amount: string) => void` | - | Receives `"<integer>.<two decimals>"` |
| `currencyType` | `'TL' \| 'USD' \| 'EUR' \| null` | `'TL'` | Currency icon; `null` hides it |

## Related

- **[Numeric Input](/docs/components/input-numeric)**
