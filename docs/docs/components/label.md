---
sidebar_position: 1
title: Label
description: Text display component with theming support
---

# Label

The Label component is a flexible text display component with full theming support, responsive font sizing, and extensive styling options.

## Features

- 🎨 Theme color variants
- 📏 Responsive font sizes
- 🔤 Font family and weight
- 📝 Text alignment
- ✂️ Text truncation
- 🎯 Letter spacing

## Basic Usage

```tsx
import { Label } from '@tansuk/rott-ui';

<Label text="Hello World" />
```

## Font Sizes

```tsx
<Label text="Extra Small" fontSize="xs" />
<Label text="Small" fontSize="sm" />
<Label text="Medium" fontSize="md" />
<Label text="Large" fontSize="lg" />
<Label text="Extra Large" fontSize="xl" />
<Label text="2X Large" fontSize="xxl" />
<Label text="3X Large" fontSize="xxxl" />
```

## Color Variants

```tsx
<Label text="Primary" variant="primary" />
<Label text="Secondary" variant="secondary" />
<Label text="Danger" variant="danger" />
<Label text="Success" variant="success" />
<Label text="Grey" variant="grey-900" />
```

## Font Weight

```tsx
<Label text="Regular" fontWeight="regular" />
<Label text="Medium" fontWeight="medium" />
<Label text="Bold" fontWeight="bold" />
```

## Text Alignment

```tsx
<Label text="Left Aligned" />
<Label text="Center Aligned" textCenter />
<Label text="Right Aligned" textAlign="right" />
```

## Text Truncation

```tsx
<Label 
  text="This is a very long text that will be truncated"
  numberOfLines={1}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | - | Text to display |
| `variant` | `Variant` | `'grey-900'` | Color variant |
| `fontSize` | `FontSize` | `'md'` | Font size |
| `fontWeight` | `FontWeight` | `'regular'` | Font weight |
| `textCenter` | `boolean` | `false` | Center align |
| `numberOfLines` | `number` | - | Max lines |

## Examples

### Heading

```tsx
<Label 
  text="Page Title" 
  fontSize="3xl" 
  fontWeight="bold"
  marginBottom={16}
/>
```

### Error Message

```tsx
<Label 
  text="This field is required" 
  fontSize="sm" 
  variant="danger"
  marginTop={4}
/>
```

### Success Message

```tsx
<Label 
  text="✓ Changes saved" 
  fontSize="md" 
  variant="success"
  textCenter
/>
```
