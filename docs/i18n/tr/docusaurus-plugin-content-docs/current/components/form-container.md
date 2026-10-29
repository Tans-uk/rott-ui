---
sidebar_position: 2
title: FormContainer
description: Form wrapper component'i
---

# FormContainer

FormContainer, form bölümleri için theme desteği ve hata state'leri sunan, style uygulanmış bir wrapper sağlar.

## Özellikler {#features}

- 🎨 Açık/koyu theme'ler
- ❌ Hata state'i için style
- 📏 Özelleştirilebilir spacing
- 🎯 Padding'siz kullanım seçeneği

## Temel Kullanım {#basic-usage}

```tsx
import { FormContainer } from '@tansuk/rott-ui';

<FormContainer>
  <Input name="email" type="email" />
  <Input name="password" type="password" />
</FormContainer>
```

## Theme ile {#with-theme}

```tsx
<FormContainer theme="dark">
  <Input name="email" type="email" theme="dark" />
  <Input name="password" type="password" theme="dark" />
</FormContainer>
```

## Hata State'i {#error-state}

```tsx
<FormContainer hasError>
  <Input name="email" type="email" errorMessage="Invalid email" touched />
</FormContainer>
```

## Props {#props}

| Prop | Tip | Default | Açıklama |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Form içeriği |
| `hasError` | `boolean` | `false` | Hata state'i |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme |
| `marginBottom` | `number` | - | Alt margin |
| `marginTop` | `number` | - | Üst margin |
| `noPadding` | `boolean` | `false` | Padding'i kaldırır |

## Örnekler {#examples}

### Giriş Formu {#login-form}

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

### Ödeme Formu {#payment-form}

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
