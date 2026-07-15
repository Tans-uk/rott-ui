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
- 🖼️ Leading/trailing icon slots (`leftIcon` / `rightIcon`)

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
| `leftIcon` | `InputIconProps` | - | Leading icon slot (rendered only when provided) |
| `rightIcon` | `InputIconProps` | - | Trailing icon slot (rendered only when provided) |

### `InputIconProps`

`leftIcon` and `rightIcon` extend `IconProps` (so `name`, `variant`, `color`,
`width`, `height`, `mode`, … all apply) plus an optional `onPress` handler:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `IconKeys` | **Required** | Icon to render |
| `variant` | `Variant` | - | Tint via theme variant |
| `color` | `string` | - | Tint via raw color (takes precedence over `variant`) |
| `onPress` | `(event) => void` | - | Makes the icon pressable |

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

### Bordered inputs

Passing a `border` draws a boxed border and automatically hides the bottom
underline `Separator` (a box and an underline are mutually exclusive). To keep
the underline as well, pass `renderSeparator` explicitly:

```tsx
<Input name='boxed' border={{width: 1, radius: 8, variant: 'grey-200'}} />
<Input name='boxed-with-line' border={{width: 1}} renderSeparator />
```

### Leading & trailing icons

Every input type accepts `leftIcon` and `rightIcon`. A slot is rendered **only
when the corresponding prop is provided**, and the field flexes to fill the
space between the icons — so the text area automatically grows or shrinks based
on which icons are present:

```tsx
// Leading icon only — text fills the remaining width
<Input name='email' type='email' leftIcon={{name: 'mail'}} />

// Both slots — text sits between the two icons
<Input
  name='search'
  leftIcon={{name: 'search'}}
  rightIcon={{name: 'close', onPress: clear}}
/>

// No icons — text spans the full width
<Input name='plain' />
```

The gap between an icon and the text is spacing-aware (a multiple of 4, scaled
by `size`).

#### Tinting

Icons accept `variant` and `color` to tint them via props (no need to bake the
color into the SVG). `color` takes precedence over `variant`:

```tsx
<Input name='email' leftIcon={{name: 'mail', variant: 'primary'}} />
<Input name='locked' leftIcon={{name: 'lock', color: '#FF6B6B'}} />
```

#### Pressable icons

Pass `onPress` to make a slot interactive (rendered as an accessible button):

```tsx
<Input name='amount' rightIcon={{name: 'info', onPress: showHelp}} />
```

#### Built-in trailing icons

Functional types keep their built-in trailing behavior while letting you
override the **appearance** via `rightIcon`. The function stays locked:

- `password` → show/hide eye (toggle is always the eye's job)
- `phone` → contacts picker
- `iban` → clear / QR
- `amount` → currency indicator
- `date` → calendar (opens the picker)
- `select` / `multiSelect` → chevron (or the read-only `id-card`)

```tsx
// Swap the eye's look, keep the show/hide function
<Input name='password' type='password' rightIcon={{name: 'eye-alt'}} />
```

#### Control types

`checkbox` and `toggle` place `leftIcon`/`rightIcon` around their content (box or
switch). Their icon slots use press isolation, so tapping a pressable icon does
**not** toggle the control.

:::note Migration from `icon`
The former `icon` prop has been removed. Replace `icon={{…}}` with
`leftIcon={{…}}` (same shape). Margin/padding you pass to `Input` is applied to
the field's outer container — it no longer leaks into the inner `TextInput`.
:::

## Related

- **[Forms Guide](/docs/guides/forms)** - Complete form examples with validation
- **[Toggle](/docs/components/toggle)** - Toggle switch component
