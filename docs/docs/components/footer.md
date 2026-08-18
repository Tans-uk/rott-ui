---
sidebar_position: 4
title: Footer
description: Footer container component
---

# Footer

Footer is a bottom-anchored container for screen-level actions. It wraps [`Content`](./content.md) with footer layout defaults and respects the device's bottom safe-area inset.

## Basic Usage

```tsx
import { Footer } from '@tansuk/rott-ui';

<Footer>
  <Button variant="primary" size="full">
    Continue
  </Button>
</Footer>
```

## Props

Footer accepts every [`Content`](./content.md) prop. Passing one overrides the
matching footer default below.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Footer content |
| `minHeight` | `number \| string` | `128` | Minimum height of the footer |
| `paddingTop` | `number \| string` | `24` | Space above the content |
| `gap` | `number` | `16` | Space between children |
| `useBottomInset` | `boolean` | `true` | Reserve room for the device's bottom safe area |
| `backgroundColor` | `string` | — | Unset by default, so the footer inherits the surface behind it |
| `testID` | `string` | `'footer-test-id'` | Test identifier |

## Examples

### Action Footer

```tsx
<Container noPadding>
  <Header title="Checkout" />
  <Content flex={1}>
    {/* Content */}
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

### Multi-Button Footer

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
