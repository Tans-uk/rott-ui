---
sidebar_position: 3
title: Navigation Patterns
description: Common navigation patterns with Rott UI
---

# Navigation Patterns

Learn common navigation patterns using Rott UI components with React Navigation.

## Bottom Tab Navigation

```tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomMenu } from '@tansuk/rott-ui';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => {
        const menuItems = props.state.routes.map((route, index) => ({
          icon: { name: getIconForRoute(route.name) },
          title: route.name,
          onPress: () => props.navigation.navigate(route.name),
        }));
        
        return <BottomMenu menuItems={menuItems} />;
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
```

## Stack Navigation with Header

```tsx
import { createStackNavigator } from '@react-navigation/stack';
import { Container, Header, Content } from '@tansuk/rott-ui';

const Stack = createStackNavigator();

function ScreenWithHeader({ navigation }) {
  return (
    <Container noPadding>
      <Header
        title="Screen Title"
        leftIcon={[
          { name: 'ARROW_LEFT', onPress: () => navigation.goBack() },
        ]}
        rightIcon={[
          { name: 'SEARCH', onPress: () => navigation.navigate('Search') },
        ]}
      />
      <Content flex={1}>
        {/* Content */}
      </Content>
    </Container>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={ScreenWithHeader} />
    </Stack.Navigator>
  );
}
```

## Tab Widget Navigation

```tsx
import { TabWidget } from '@tansuk/rott-ui';

function ProductScreen() {
  return (
    <Container noPadding>
      <Header title="Product Details" />
      <TabWidget
        titles={['Overview', 'Specs', 'Reviews']}
        tabs={[
          <OverviewTab />,
          <SpecsTab />,
          <ReviewsTab />,
        ]}
      />
    </Container>
  );
}
```

## Drawer Navigation

```tsx
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function DrawerContent({ navigation }) {
  return (
    <Content flex={1}>
      <CommonItemContainer>
        <CommonItem
          title="Home"
          leftIcon="HOME"
          onPress={() => navigation.navigate('Home')}
        />
        <CommonItem
          title="Settings"
          leftIcon="SETTINGS"
          onPress={() => navigation.navigate('Settings')}
        />
        <CommonItem
          title="Logout"
          leftIcon="EXIT"
          onPress={handleLogout}
        />
      </CommonItemContainer>
    </Content>
  );
}

function AppNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
}
```

## Modal Navigation

```tsx
function showModalScreen() {
  Modal.showModal({
    id: 'modal-screen',
    fullScreen: true,
    header: {
      title: 'Modal Screen',
      closeButton: true,
    },
    children: <ModalScreenContent />,
  });
}
```

## Best Practices

### Do's ✅

- Use consistent header patterns across screens
- Provide clear back navigation
- Use appropriate navigation types for context
- Handle deep linking properly
- Test navigation flows thoroughly

### Don'ts ❌

- Don't nest too many navigation levels
- Don't forget to handle Android back button
- Don't use modals for primary navigation
- Don't block users from going back

## Related

- [Header Component](/docs/components/header)
- [BottomMenu Component](/docs/components/bottom-menu)
- [TabWidget Component](/docs/components/tab-widget)
- [Modal Component](/docs/components/modal)
