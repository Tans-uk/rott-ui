---
sidebar_position: 1
title: Introduction
description: Welcome to Rott UI - A comprehensive React Native UI Kit
---

# Welcome to Rott UI

Rott UI is a comprehensive, property-based React Native UI Kit designed for rapid development with type-safe theming and extensive customization options.

## What is Rott UI?

Rott UI provides **29 production-ready components** that cover everything from basic UI elements to complex interactive components. Built with TypeScript and following best practices, it's designed to help you build beautiful React Native applications faster.

## Key Features

### 🎨 29 Production-Ready Components
From basic buttons to complex modals and input fields - every component is battle-tested and ready for production.

### 🎯 Type-Safe Theming
Configure colors, fonts, and styles with full TypeScript support. Your custom theme gets autocomplete everywhere.

### 📱 React Native First
Optimized for mobile development with platform-specific adaptations and performance optimizations.

### 🔧 Highly Customizable
Every component accepts extensive styling and behavior props. Customize without touching source code.

### 🌍 Internationalization Ready
Built-in i18n support with React Intl integration. Turkish and English included out of the box.

### ♿ Accessibility Focused
Comprehensive accessibility features and testing support built into every component.

### 🚀 Performance Optimized
Leverages FlashList, Reanimated, and other performance libraries for smooth experiences.

## Quick Example

```tsx
import React from 'react';
import {
  Container,
  Header,
  Content,
  Button,
  Input,
} from '@tansuk/rott-ui';

export default function MyScreen() {
  return (
    <Container noPadding>
      <Header height={40} logo="MY_LOGO" />
      
      <Content flex={1} paddingHorizontal={24}>
        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
        />
        
        <Button
          size="full"
          variant="primary"
          marginTop={16}
          onPress={() => console.log('Button pressed!')}
        >
          Get Started
        </Button>
      </Content>
    </Container>
  );
}
```

## Component Categories

- **Layout** (5): Container, Content, Header, Footer, Item
- **Navigation** (5): Button, Pressable, Tab, TabWidget, BottomMenu
- **Input** (2): Input (14+ variants), Toggle
- **Display** (5): Label, Icon, Image, EmptyState, Skeleton
- **Feedback** (7): Modal, Alert, AlertDialog, ActionMenu, Notification, Result, Timer
- **Data** (1): List (with FlashList)
- **Utility** (4): Separator, FormContainer, ImageBackground, Common

## Getting Started

Ready to build with Rott UI? Let's get you set up:

1. **[Installation](/docs/getting-started/installation)** - Install Rott UI and its peer dependencies
2. **[Quick Start](/docs/getting-started/quick-start)** - Build your first screen in 5 minutes

## Community & Support

- **GitHub**: [github.com/Tans-uk/rott-ui](https://github.com/Tans-uk/rott-ui)
- **npm**: [@tansuk/rott-ui](https://www.npmjs.com/package/@tansuk/rott-ui)
- **Issues**: [Report bugs or request features](https://github.com/Tans-uk/rott-ui/issues)

## License

Rott UI is [MIT licensed](https://github.com/Tans-uk/rott-ui/blob/main/LICENSE).
