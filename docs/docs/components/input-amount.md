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

## With Currency Symbol

```tsx
<Input name='price' type='amount' label='Price' placeholder='$0.00' />
```

## Props

- `type`: 'amount'
- Numeric keyboard
- Decimal support
- Auto-formatting

## Related

- **[Numeric Input](/docs/components/input-numeric)**
