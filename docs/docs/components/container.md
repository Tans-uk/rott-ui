---
sidebar_position: 1
title: Container
description: Root wrapper component with safe area handling
---

# Container

The Container component is the root wrapper for your screens. It handles safe areas, provides consistent padding, and manages status bar configuration.

## Features

- 📱 Automatic safe area handling
- 🎨 Customizable backgrounds
- 📏 Optional padding control
- 🔒 Modal screen support
- 👆 Backdrop press handling

## Basic Usage

```tsx
import { Container } from '@tansuk/rott-ui';

<Container>
  {/* Your screen content */}
</Container>
```

## Without Padding

```tsx
<Container noPadding>
  {/* Full-width content */}
</Container>
```

## Centered Content

```tsx
<Container center>
  <Label text="Centered Content" />
</Container>
```

## Modal Screen

```tsx
<Container isModalScreen>
  {/* Modal content */}
</Container>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Screen content |
| `noPadding` | `boolean` | `false` | Remove padding |
| `center` | `boolean` | `false` | Center content |
| `isModalScreen` | `boolean` | `false` | Modal configuration |
| `fullScreen` | `boolean` | `false` | Disable safe areas |
| `closeOnClick` | `boolean` | `false` | Backdrop press enabled |
| `showStatusBar` | `boolean` | `true` | Show status bar |

## Example

```tsx
<Container noPadding>
  <Header title="My Screen" />
  <Content flex={1}>
    {/* Content */}
  </Content>
</Container>
```
