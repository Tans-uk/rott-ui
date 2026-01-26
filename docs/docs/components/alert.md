---
sidebar_position: 2
title: Alert
description: Alert banner component
---

# Alert

Alert displays informational banners with icons and customizable styling.

## Features

- 🎨 Multiple variants
- 📏 Size options
- 🖼️ Left/right icons
- 🎯 Customizable content

## Basic Usage

```tsx
import { Alert } from '@tansuk/rott-ui';

<Alert 
  text="This is an alert message" 
  variant="info"
/>
```

## Variants

```tsx
<Alert text="Info message" variant="info" />
<Alert text="Success message" variant="success" />
<Alert text="Warning message" variant="warning" />
<Alert text="Error message" variant="danger" />
```

## With Icons

```tsx
<Alert 
  text="Important message"
  variant="warning"
  leftIcon={{ name: 'WARNING', width: 20, height: 20 }}
/>

<Alert 
  text="Completed"
  variant="success"
  leftIcon={{ name: 'CHECK_CIRCLE', width: 20, height: 20 }}
  rightIcon={{ name: 'CLOSE', width: 16, height: 16 }}
/>
```

## Sizes

```tsx
<Alert text="Small alert" size="sm" />
<Alert text="Medium alert" size="md" />
<Alert text="Large alert" size="lg" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string \| LabelProps` | - | Alert message |
| `variant` | `Variant` | `'info'` | Color variant |
| `size` | `Size` | `'md'` | Alert size |
| `leftIcon` | `IconProps` | - | Left icon |
| `rightIcon` | `IconProps` | - | Right icon |

## Examples

### Info Alert

```tsx
<Alert 
  text="Your session will expire in 5 minutes"
  variant="info"
  leftIcon={{ name: 'INFORMATION_CIRCLE', width: 20, height: 20 }}
/>
```

### Success Alert

```tsx
<Alert 
  text="Your changes have been saved"
  variant="success"
  leftIcon={{ name: 'CHECK_CIRCLE', width: 20, height: 20 }}
/>
```

### Warning Alert

```tsx
<Alert 
  text="Please verify your email address"
  variant="warning"
  leftIcon={{ name: 'WARNING', width: 20, height: 20 }}
/>
```

### Error Alert

```tsx
<Alert 
  text="Failed to load data. Please try again."
  variant="danger"
  leftIcon={{ name: 'WARNING_ERROR', width: 20, height: 20 }}
/>
```
