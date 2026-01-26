---
sidebar_position: 6
title: Result
description: Result and confirmation screens
---

# Result

Result displays success, error, or informational result screens with actions.

## Features

- ✅ Multiple variants (success, error, warning, info)
- 🖼️ Icon support
- 📝 Title and description
- 🔘 Action buttons
- 🎨 Customizable

## Basic Usage

```tsx
import { Result } from '@tansuk/rott-ui';

<Result
  variant="success"
  title="Success"
  description="Your payment was processed successfully"
  actions={[
    {
      text: 'Done',
      variant: 'primary',
      onPress: () => navigation.navigate('Home'),
    },
  ]}
/>
```

## Variants

```tsx
<Result variant="success" title="Success" description="Operation completed" />
<Result variant="error" title="Error" description="Something went wrong" />
<Result variant="warning" title="Warning" description="Please review" />
<Result variant="info" title="Info" description="Additional information" />
```

## With Custom Icon

```tsx
<Result
  variant="success"
  iconName="CHECK_CIRCLE"
  title="Payment Successful"
  description="Your order has been confirmed"
  actions={[
    { text: 'View Order', variant: 'primary', onPress: viewOrder },
    { text: 'Continue Shopping', variant: 'secondary-outline', onPress: continueShopping },
  ]}
/>
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `variant` | `'success' \| 'error' \| 'warning' \| 'info'` | Result type |
| `iconName` | `IconKeys` | Icon to display |
| `title` | `string \| JSX.Element` | Result title |
| `description` | `string \| JSX.Element` | Result description |
| `actions` | `ResultActionsProps[]` | Action buttons |
| `headerTitle` | `string` | Header title |
| `headerLogo` | `string` | Header logo |

## Examples

### Payment Success

```tsx
<Result
  variant="success"
  title="Payment Successful"
  description="Your payment of $99.99 has been processed"
  actions={[
    {
      text: 'View Receipt',
      variant: 'primary',
      onPress: () => navigation.navigate('Receipt'),
    },
    {
      text: 'Back to Home',
      variant: 'secondary-outline',
      onPress: () => navigation.navigate('Home'),
    },
  ]}
/>
```

### Error Screen

```tsx
<Result
  variant="error"
  title="Payment Failed"
  description="We couldn't process your payment. Please try again."
  actions={[
    {
      text: 'Retry',
      variant: 'primary',
      onPress: retryPayment,
    },
    {
      text: 'Cancel',
      variant: 'secondary-outline',
      onPress: () => navigation.goBack(),
    },
  ]}
/>
```

### Verification Pending

```tsx
<Result
  variant="warning"
  title="Verification Pending"
  description="Please check your email to verify your account"
  actions={[
    {
      text: 'Resend Email',
      variant: 'primary',
      onPress: resendVerification,
    },
    {
      text: 'Change Email',
      variant: 'secondary-outline',
      onPress: changeEmail,
    },
  ]}
/>
```
