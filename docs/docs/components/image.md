---
sidebar_position: 3
title: Image
description: Image display component
---

# Image

Image component for displaying images with theme integration.

## Basic Usage

```tsx
import { Image } from '@tansuk/rott-ui';

<Image 
  name="LOGO"
  width={100}
  height={100}
/>
```

## With Source

```tsx
<Image 
  source={require('./assets/photo.png')}
  width={200}
  height={200}
  resizeMode="cover"
/>
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `name` | `ImageTypes` | Theme image name |
| `source` | `ImageSourcePropType` | Image source |
| `width` | `number` | Image width |
| `height` | `number` | Image height |
| `resizeMode` | `'cover' \| 'contain' \| 'stretch'` | Resize mode |

Plus all React Native Image props.

## Examples

### Logo

```tsx
<Image name="COMPANY_LOGO" width={120} height={40} />
```

### Avatar

```tsx
<Image 
  source={{ uri: user.avatarUrl }}
  width={64}
  height={64}
  borderRadius={32}
/>
```

### Product Image

```tsx
<Image 
  source={{ uri: product.imageUrl }}
  width="100%"
  height={200}
  resizeMode="cover"
  borderRadius={12}
/>
```

### Custom Images (Auto-Discovery)

With `withRottAssets` in your Metro config, images in `src/assets/images/` are automatically available by filename (without extension):

```tsx
// src/assets/images/cindoruk.png → name="cindoruk"
<Image name="cindoruk" width={100} height={100} />
```

See [rott.config.ts - Asset Auto-Discovery](/docs/theming/rott-config#asset-auto-discovery).
