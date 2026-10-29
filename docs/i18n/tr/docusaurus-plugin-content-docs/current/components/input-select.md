---
title: Select Input
description: Dropdown seçim input'u
---

# Select Input

Önceden tanımlanmış seçenekler arasından seçim yapmak için dropdown seçim input'u.

## Temel Kullanım {#basic-usage}

```tsx
<Input
  name='country'
  type='select'
  placeholder='Select country'
  options={[
    {label: 'United States', value: 'us'},
    {label: 'Turkey', value: 'tr'},
    {label: 'United Kingdom', value: 'uk'},
  ]}
  onSelect={setCountry}
/>
```

## Label ile {#with-label}

```tsx
<Input
  name='category'
  type='select'
  label='Category'
  options={categories}
  onSelect={handleSelect}
/>
```

## Props {#props}

| Prop | Tip | Açıklama |
|------|------|-------------|
| `options` | `Array<{label, value}>` | Seçenek listesi |
| `onSelect` | `(value) => void` | Seçim handler'ı |

## İlgili Sayfalar {#related}

- **[Input](/docs/components/input)**
