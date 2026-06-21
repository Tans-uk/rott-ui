---
sidebar_position: 1
title: Input
description: Comprehensive input component with 14+ variants
---

# Input

The Input component supports 14+ different input types including text, email, password, date, phone, IBAN, credit card, and more.

## Features

- 📝 14+ input types
- ✅ Validation support
- 🎭 Input masking
- 📅 Date/DateTime pickers
- 🔍 Search with autocomplete
- 💰 Amount input
- ☑️ Checkbox variant
- 🎨 Light/dark themes

## Basic Usage

```tsx
import {Input} from '@tansuk/rott-ui'

<Input
  name='email'
  type='email'
  placeholder='Enter your email'
  value={email}
  onChangeText={setEmail}
/>
```

## Input Types

Each input type has its own dedicated page with specific props, examples, and best practices:

- **[Amount](/docs/components/input-amount)** - Currency and numeric input with formatting
- **[Checkbox](/docs/components/input-checkbox)** - Checkbox input
- **[Credit Card](/docs/components/input-credit-card)** - Credit card number with masking
- **[CVC](/docs/components/input-cvc)** - Card security code
- **[Date](/docs/components/input-date)** - Date and datetime picker
- **[Email](/docs/components/input-email)** - Email input with validation
- **[Expire Date](/docs/components/input-expire-date)** - Card expiration date
- **[IBAN](/docs/components/input-iban)** - IBAN with formatting
- **[Numeric](/docs/components/input-numeric)** - Numbers only
- **[Password](/docs/components/input-password)** - Password with show/hide
- **[Phone](/docs/components/input-phone)** - Phone number with masking
- **[PIN](/docs/components/input-pin)** - PIN/OTP input
- **[Search](/docs/components/input-search)** - Search with autocomplete
- **[Select](/docs/components/input-select)** - Dropdown select

## With Labels

```tsx
<Input
  name="email"
  type="email"
  label="Email Address"
  placeholder="Enter your email"
/>
```

## Validation

```tsx
<Input
  name="email"
  type="email"
  placeholder="Email"
  value={email}
  onChangeText={setEmail}
  errorMessage={errors.email}
  touched={touched.email}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | **Required** | Input identifier |
| `type` | `InputType` | `'default'` | Input type |
| `value` | `string` | - | Input value |
| `onChangeText` | `(text: string) => void` | - | Change handler |
| `placeholder` | `string` | - | Placeholder text |
| `label` | `string \| InputLabelProps` | - | Input label |
| `errorMessage` | `string` | - | Error message |
| `touched` | `boolean` | `false` | Touched state |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme |
| `disabled` | `boolean` | `false` | Disabled state |

## Quick Example

```tsx
import {Input} from '@tansuk/rott-ui'

// Basic text input
<Input name='username' type='default' placeholder='Username' />

// Email with validation
<Input name='email' type='email' label='Email' />

// Password with show/hide
<Input name='password' type='password' label='Password' />

// Phone with masking
<Input name='phone' type='phone' mask='+1 ([000]) [000]-[0000]' />
```

## Related

- **[Forms Guide](/docs/guides/forms)** - Complete form examples with validation
- **[Toggle](/docs/components/toggle)** - Toggle switch component
