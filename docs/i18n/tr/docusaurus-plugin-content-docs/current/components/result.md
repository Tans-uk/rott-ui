---
sidebar_position: 6
title: Result
description: Sonuç ve onay ekranları
---

# Result

Result, başarı, hata veya bilgilendirme amaçlı sonuç ekranlarını aksiyonlarla birlikte gösterir.

## Özellikler {#features}

- ✅ Birden fazla variant (success, error, warning, info)
- 🖼️ İkon desteği
- 📝 Başlık ve açıklama
- 🔘 Aksiyon butonları
- 🎨 Özelleştirilebilir

## Temel Kullanım {#basic-usage}

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

## Variant'lar {#variants}

```tsx
<Result variant="success" title="Success" description="Operation completed" />
<Result variant="error" title="Error" description="Something went wrong" />
<Result variant="warning" title="Warning" description="Please review" />
<Result variant="info" title="Info" description="Additional information" />
```

## Özel İkon ile {#with-custom-icon}

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

## Props {#props}

| Prop | Tip | Açıklama |
|------|------|-------------|
| `variant` | `'success' \| 'error' \| 'warning' \| 'info'` | Sonuç tipi |
| `iconName` | `IconKeys` | Gösterilecek ikon |
| `title` | `string \| JSX.Element` | Sonuç başlığı |
| `description` | `string \| JSX.Element` | Sonuç açıklaması |
| `actions` | `ResultActionsProps[]` | Aksiyon butonları |
| `headerTitle` | `string` | Header başlığı |
| `headerLogo` | `string` | Header logosu |

## Örnekler {#examples}

### Ödeme Başarılı {#payment-success}

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

### Hata Ekranı {#error-screen}

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

### Doğrulama Bekleniyor {#verification-pending}

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
