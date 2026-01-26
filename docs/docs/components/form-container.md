---
sidebar_position: 2
title: FormContainer
description: Form wrapper component
---

# FormContainer

FormContainer provides a styled wrapper for form sections with theme support and error states.

## Features

- 🎨 Light/dark themes
- ❌ Error state styling
- 📏 Customizable spacing
- 🎯 No padding option

## Basic Usage

```tsx
import { FormContainer } from '@tansuk/rott-ui';

<FormContainer>
  <Input name="email" type="email" />
  <Input name="password" type="password" />
</FormContainer>
```

## With Theme

```tsx
<FormContainer theme="dark">
  <Input name="email" type="email" theme="dark" />
  <Input name="password" type="password" theme="dark" />
</FormContainer>
```

## Error State

```tsx
<FormContainer hasError>
  <Input name="email" type="email" errorMessage="Invalid email" touched />
</FormContainer>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Form content |
| `hasError` | `boolean` | `false` | Error state |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme |
| `marginBottom` | `number` | - | Bottom margin |
| `marginTop` | `number` | - | Top margin |
| `noPadding` | `boolean` | `false` | Remove padding |

## Examples

### Login Form

```tsx
<FormContainer theme="light">
  <Input 
    name="email" 
    type="email" 
    label="Email"
    marginBottom={16}
  />
  <Input 
    name="password" 
    type="password" 
    label="Password"
    marginBottom={24}
  />
  <Button variant="primary" size="full">
    Sign In
  </Button>
</FormContainer>
```

### Payment Form

```tsx
<FormContainer hasError={hasErrors}>
  <Input name="cardNumber" type="creditCard" label="Card Number" />
  <Item row>
    <Input name="expiry" type="expireDate" label="Expiry" flex={1} marginRight={8} />
    <Input name="cvc" type="cvc" label="CVC" flex={1} marginLeft={8} />
  </Item>
  <Button variant="primary" size="full" marginTop={24}>
    Pay Now
  </Button>
</FormContainer>
```
