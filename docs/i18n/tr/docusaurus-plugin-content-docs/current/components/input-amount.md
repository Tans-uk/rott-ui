---
title: Amount Input
description: Biçimlendirmeli para birimi ve sayısal tutar input'u
---

# Amount Input

Para birimi ve tutarlar için otomatik biçimlendirmeli sayısal input.

## Temel Kullanım {#basic-usage}

```tsx
<Input name='amount' type='amount' placeholder='0.00' value={amount} onChangeText={setAmount} />
```

## Para Birimi Simgesi ile {#with-currency-symbol}

```tsx
<Input name='price' type='amount' label='Price' placeholder='$0.00' />
```

## Props {#props}

- `type`: 'amount'
- Sayısal klavye
- Ondalık desteği
- Otomatik biçimlendirme

## İlgili Sayfalar {#related}

- **[Numeric Input](/docs/components/input-numeric)**
