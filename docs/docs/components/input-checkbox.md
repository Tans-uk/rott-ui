---
title: Checkbox Input
description: Checkbox input component
---

# Checkbox Input

Checkbox for boolean values.

## Basic Usage

```tsx
<Input name='agree' type='checkbox' value={agreed.toString()} onChangeText={(val) => setAgreed(val === 'true')} />
```

## With Label

```tsx
<Item row alignItemsCenter>
  <Input name='terms' type='checkbox' value={agreed.toString()} onChangeText={(val) => setAgreed(val === 'true')} />
  <Label text='I agree to terms' marginLeft={8} />
</Item>
```

## Related

- **[Toggle](/docs/components/toggle)**
