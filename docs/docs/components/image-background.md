---
sidebar_position: 3
title: ImageBackground
description: Background image container
---

# ImageBackground

ImageBackground wraps content with a background image.

## Basic Usage

```tsx
import { ImageBackground } from '@tansuk/rott-ui';

<ImageBackground 
  source={require('./assets/background.png')}
  style={{ flex: 1 }}
>
  <Content>
    {/* Your content */}
  </Content>
</ImageBackground>
```

## Props

Standard React Native ImageBackground props.

## Examples

### Splash Screen

```tsx
<ImageBackground 
  source={require('./assets/splash.png')}
  style={{ flex: 1 }}
  resizeMode="cover"
>
  <Container center>
    <Image name="LOGO" width={120} height={120} />
    <Label text="Welcome" fontSize="3xl" fontWeight="bold" variant="white" />
  </Container>
</ImageBackground>
```

### Hero Section

```tsx
<ImageBackground 
  source={{ uri: 'https://example.com/hero.jpg' }}
  style={{ height: 300 }}
>
  <Item 
    flex={1} 
    justifyContentCenter 
    alignItemsCenter
    backgroundColor="rgba(0, 0, 0, 0.4)"
  >
    <Label text="Hero Title" fontSize="3xl" variant="white" textCenter />
    <Button variant="white" marginTop={24}>Get Started</Button>
  </Item>
</ImageBackground>
```
