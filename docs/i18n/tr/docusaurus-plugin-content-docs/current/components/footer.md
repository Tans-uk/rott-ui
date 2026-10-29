---
sidebar_position: 4
title: Footer
description: Footer container component'i
---

# Footer

Footer, ekran düzeyindeki aksiyonlar için ekranın altına sabitlenen bir container'dır. [`Content`](./content.md) component'ini footer'a özgü layout default'larıyla sarar ve cihazın alt safe area inset'ini dikkate alır.

## Temel Kullanım {#basic-usage}

```tsx
import { Footer } from '@tansuk/rott-ui';

<Footer>
  <Button variant="primary" size="full">
    Continue
  </Button>
</Footer>
```

## Props {#props}

Footer, tüm [`Content`](./content.md) prop'larını kabul eder. Bunlardan birini verdiğinizde
aşağıdaki ilgili footer default'unun yerine geçer.

| Prop | Tip | Default | Açıklama |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Footer içeriği |
| `minHeight` | `number \| string` | `128` | Footer'ın minimum yüksekliği |
| `paddingTop` | `number \| string` | `24` | İçeriğin üstündeki boşluk |
| `gap` | `number` | `16` | Children arasındaki boşluk |
| `useBottomInset` | `boolean` | `true` | Cihazın alt safe area'sı için yer ayırır |
| `backgroundColor` | `string` | — | Default olarak tanımlı değildir; böylece footer arkasındaki yüzeyi devralır |
| `testID` | `string` | `'footer-test-id'` | Test tanımlayıcısı |

## Örnekler {#examples}

### Aksiyon Footer'ı {#action-footer}

```tsx
<Container noPadding>
  <Header title="Checkout" />
  <Content flex={1}>
    {/* İçerik */}
  </Content>
  <Footer>
    <Item paddingHorizontal={16}>
      <Item row justifyContentSpaceBetween marginBottom={16}>
        <Label text="Total" fontSize="lg" fontWeight="bold" />
        <Label text="$99.99" fontSize="lg" fontWeight="bold" variant="primary" />
      </Item>
      <Button variant="primary" size="full">
        Place Order
      </Button>
    </Item>
  </Footer>
</Container>
```

### Çok Butonlu Footer {#multi-button-footer}

```tsx
<Footer>
  <Item row paddingHorizontal={16}>
    <Button variant="secondary-outline" size="lg" flex={1} marginRight={8}>
      Cancel
    </Button>
    <Button variant="primary" size="lg" flex={1} marginLeft={8}>
      Save
    </Button>
  </Item>
</Footer>
```
