---
sidebar_position: 2
title: Pressable
description: Custom touchable component
---

# Pressable

Pressable is a customizable touchable component with text rendering and animation support.

## Features

- 👆 Touch handling
- 📝 Text rendering
- 🎨 Styling support
- ✨ Animation support
- 🎯 Common UI props

## Basic Usage

```tsx
import { Pressable } from '@tansuk/rott-ui';

<Pressable onPress={() => console.log('Pressed')}>
  <Label text="Press Me" />
</Pressable>
```

## With Text

```tsx
<Pressable 
  text="Click Here"
  textVariant="primary"
  textSize="lg"
  onPress={handlePress}
/>
```

## Animated

```tsx
<Pressable 
  animated
  onPress={handlePress}
>
  <Icon name="STAR" width={24} height={24} />
</Pressable>
```

## Row Layout

```tsx
<Pressable row alignItemsCenter onPress={handlePress}>
  <Icon name="ARROW_RIGHT" width={20} height={20} />
  <Label text="Next" marginLeft={8} />
</Pressable>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content |
| `text` | `string` | - | Text to display |
| `textStyle` | `TextStyle` | - | Text style |
| `textVariant` | `Variant` | - | Text color |
| `textSize` | `FontSize` | - | Text size |
| `textWeight` | `FontWeight` | - | Text weight |
| `animated` | `boolean` | `false` | Enable animation |
| `row` | `boolean` | `false` | Row layout |
| `onPress` | `() => void` | - | Press handler |

## Examples

### List Item

```tsx
<Pressable 
  row 
  alignItemsCenter 
  justifyContentSpaceBetween
  paddingHorizontal={16}
  paddingVertical={12}
  onPress={() => navigation.navigate('Details')}
>
  <Label text="Item Title" />
  <Icon name="CHEVRON_RIGHT" width={20} height={20} />
</Pressable>
```

### Card

```tsx
<Pressable
  padding={16}
  borderRadius={12}
  backgroundColor="white"
  marginBottom={12}
  onPress={() => openDetails()}
>
  <Label text="Card Title" fontSize="lg" fontWeight="bold" marginBottom={8} />
  <Label text="Card description" fontSize="sm" variant="grey-800" />
</Pressable>
```

### Icon Button

```tsx
<Pressable
  animated
  width={44}
  height={44}
  alignItemsCenter
  justifyContentCenter
  borderRadius={22}
  backgroundColor="primary"
  onPress={handleAction}
>
  <Icon name="PLUS" width={24} height={24} variant="white" />
</Pressable>
```
