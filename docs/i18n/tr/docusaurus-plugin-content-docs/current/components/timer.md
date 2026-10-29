---
sidebar_position: 7
title: Timer
description: Zamanlayıcı ve geri sayım component'i
---

# Timer

Timer, özelleştirilebilir style ile geri sayım sayaçları gösterir.

## Özellikler {#features}

- ⏱️ Geri sayım gösterimi
- 🎨 Özelleştirilebilir renkler
- 🔄 Daire ve geri sayım modları
- 🎯 Özel style

## Temel Kullanım {#basic-usage}

```tsx
import { Timer } from '@tansuk/rott-ui';

<Timer time={60} color="primary" />
```

## Özel Style {#custom-styling}

```tsx
<Timer 
  time={120}
  color="danger"
  style={{ fontSize: 24, fontWeight: 'bold' }}
/>
```

## Props {#props}

| Prop | Tip | Default | Açıklama |
|------|------|---------|-------------|
| `time` | `number` | **Zorunlu** | Saniye cinsinden süre |
| `color` | `string` | - | Metin rengi |
| `style` | `TextStyle` | - | Özel style |

## useTimer Hook'u {#usetimer-hook}

Timer hook'unu kendi component'lerinizde kullanın:

```tsx
import { useTimer } from '@tansuk/rott-ui';

function CustomTimer() {
  const { minutes, seconds } = useTimer(120);

  return (
    <Label text={`${minutes}:${seconds.toString().padStart(2, '0')}`} />
  );
}
```

## Örnekler {#examples}

### OTP Zamanlayıcısı {#otp-timer}

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

### Oturum Zaman Aşımı {#session-timeout}

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
