---
sidebar_position: 3
title: Navigation Pattern'leri
description: Rott UI ile yaygın navigation pattern'leri
---

# Navigation Pattern'leri

Rott UI component'lerini React Navigation ile kullanarak yaygın navigation pattern'lerini öğrenin.

## Bottom Tab Navigation {#bottom-tab-navigation}

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

## Header ile Stack Navigation {#stack-navigation-with-header}

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
        {/* İçerik */}
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

## Tab Widget ile Navigation {#tab-widget-navigation}

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

## Drawer Navigation {#drawer-navigation}

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

## Modal Navigation {#modal-navigation}

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

## En İyi Uygulamalar {#best-practices}

### Yapılması Gerekenler ✅ {#dos-}

- Ekranlar arasında tutarlı header pattern'leri kullanın
- Anlaşılır bir geri navigation'ı sağlayın
- Bağlama uygun navigation türlerini kullanın
- Deep linking'i doğru şekilde ele alın
- Navigation akışlarını kapsamlı şekilde test edin

### Yapılmaması Gerekenler ❌ {#donts-}

- Çok fazla navigation seviyesini iç içe koymayın
- Android geri tuşunu ele almayı unutmayın
- Ana navigation için modal kullanmayın
- Kullanıcıların geri dönmesini engellemeyin

## İlgili Sayfalar {#related}

- [Header component'i](/docs/components/header)
- [BottomMenu component'i](/docs/components/bottom-menu)
- [TabWidget component'i](/docs/components/tab-widget)
- [Modal component'i](/docs/components/modal)
