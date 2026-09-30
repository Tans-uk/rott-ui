---
title: Checkbox Input
description: Checkbox input component'i
---

# Checkbox Input

Boolean değerler için checkbox.

## Temel Kullanım {#basic-usage}

```tsx
<Input name='agree' type='checkbox' value={agreed.toString()} onChangeText={(val) => setAgreed(val === 'true')} />
```

## Label ile {#with-label}

```tsx
<Item row alignItemsCenter>
  <Input name='terms' type='checkbox' value={agreed.toString()} onChangeText={(val) => setAgreed(val === 'true')} />
  <Label text='I agree to terms' marginLeft={8} />
</Item>
```

## İlgili Sayfalar {#related}

- **[Toggle](/docs/components/toggle)**
