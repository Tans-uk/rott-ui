---
title: Select Input
description: Dropdown select input
---

# Select Input

Dropdown select input for choosing from predefined options.

## Basic Usage

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

## With Label

```tsx
<Input
  name='category'
  type='select'
  label='Category'
  options={categories}
  onSelect={handleSelect}
/>
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `options` | `Array<{label, value}>` | Select options |
| `onSelect` | `(value) => void` | Selection handler |

## Related

- **[Input](/docs/components/input)**
