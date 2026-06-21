---
sidebar_position: 7
title: Timer
description: Timer and countdown component
---

# Timer

Timer displays countdown timers with customizable styling.

## Features

- ⏱️ Countdown display
- 🎨 Customizable colors
- 🔄 Circle and countdown modes
- 🎯 Custom styling

## Basic Usage

```tsx
import { Timer } from '@tansuk/rott-ui';

<Timer time={60} color="primary" />
```

## Custom Styling

```tsx
<Timer 
  time={120}
  color="danger"
  style={{ fontSize: 24, fontWeight: 'bold' }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `time` | `number` | **Required** | Time in seconds |
| `color` | `string` | - | Text color |
| `style` | `TextStyle` | - | Custom style |

## useTimer Hook

Use the timer hook in custom components:

```tsx
import { useTimer } from '@tansuk/rott-ui';

function CustomTimer() {
  const { minutes, seconds } = useTimer(120);

  return (
    <Label text={`${minutes}:${seconds.toString().padStart(2, '0')}`} />
  );
}
```

## Examples

### OTP Timer

```tsx
function OTPScreen() {
  const [canResend, setCanResend] = useState(false);

  return (
    <>
      <Label text="Enter OTP sent to your phone" marginBottom={16} />
      <Input name="otp" type="pinPassword" maxLength={6} />
      
      {!canResend && (
        <Item row alignItemsCenter marginTop={12}>
          <Label text="Resend code in " fontSize="sm" variant="grey-800" />
          <Timer time={60} color="primary" />
        </Item>
      )}
      
      {canResend && (
        <Button variant="primary-outline" marginTop={12} onPress={resendOTP}>
          Resend Code
        </Button>
      )}
    </>
  );
}
```

### Session Timeout

```tsx
function SessionWarning() {
  return (
    <Alert variant="warning">
      <Item row alignItemsCenter>
        <Label text="Session expires in " />
        <Timer time={300} color="warning" />
      </Item>
    </Alert>
  );
}
```
