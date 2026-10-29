---
sidebar_position: 3
title: ImageBackground
description: Arka plan görseli container'ı
---

# ImageBackground

ImageBackground, içeriği bir arka plan görseliyle sarar.

## Temel Kullanım {#basic-usage}

```tsx
import { ImageBackground } from '@tansuk/rott-ui';

<ImageBackground 
  source={require('./assets/background.png')}
  style={{ flex: 1 }}
>
  <Content>
    {/* İçeriğiniz */}
  </Content>
</ImageBackground>
```

## Props {#props}

Standart React Native ImageBackground prop'ları.

## Örnekler {#examples}

### Splash Ekranı {#splash-screen}

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

### Hero Bölümü {#hero-section}

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
