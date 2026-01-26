---
title: PIN Input
description: PIN/OTP input component
---

# PIN Input

PIN or OTP (One-Time Password) input with secure entry.

## Basic Usage

```tsx
<Input name='pin' type='pinPassword' maxLength={6} placeholder='Enter PIN' />
```

## OTP Example

```tsx
<Input name='otp' type='pinPassword' maxLength={6} label='Verification Code' placeholder='000000' />
```

## Features

- Secure text entry
- Numeric keyboard
- Fixed length
- Auto-submit on complete

## Related

- **[Password Input](/docs/components/input-password)**
