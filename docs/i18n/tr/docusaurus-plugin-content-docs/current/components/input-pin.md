---
title: PIN Input
description: PIN/OTP input component'i
---

# PIN Input

Güvenli girişli PIN veya OTP (Tek Kullanımlık Şifre) input'u.

## Temel Kullanım {#basic-usage}

```tsx
<Input name='pin' type='pinPassword' maxLength={6} placeholder='Enter PIN' />
```

## OTP Örneği {#otp-example}

```tsx
<Input name='otp' type='pinPassword' maxLength={6} label='Verification Code' placeholder='000000' />
```

## Özellikler {#features}

- Güvenli metin girişi
- Sayısal klavye
- Sabit uzunluk
- Tamamlanınca otomatik gönderme

## İlgili Sayfalar {#related}

- **[Password Input](/docs/components/input-password)**
