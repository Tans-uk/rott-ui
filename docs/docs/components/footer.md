---
sidebar_position: 4
title: Footer
description: Footer container component
---

# Footer

Footer provides a fixed footer container at the bottom of the screen.

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

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Footer content |

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
