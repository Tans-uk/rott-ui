---
sidebar_position: 2
title: Settings Screen Example
description: Settings screen with tabs and toggles
---

# Settings Screen Example

A complete settings screen with tab navigation, toggles, and action items.

## Complete Code

```tsx
import React, { useState } from 'react';
import {
  Container,
  Header,
  TabWidget,
  Content,
  CommonItem,
  CommonItemContainer,
  Toggle,
  Item,
  Label,
  Button,
  Modal,
  Notification,
} from '@tansuk/rott-ui';

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometric, setBiometric] = useState(false);

  const handleLogout = () => {
    AlertDialog.show({
      title: 'Confirm Logout',
      text: 'Are you sure you want to sign out?',
      buttons: [
        { text: 'Cancel', variant: 'secondary-outline' },
        {
          text: 'Logout',
          variant: 'danger',
          onPress: () => {
            Notification.success('Logged out successfully');
            navigation.navigate('Login');
          },
        },
      ],
    });
  };

  return (
    <Container noPadding>
      <Header
        title="Settings"
        leftIcon={[
          { name: 'ARROW_LEFT', onPress: () => navigation.goBack() },
        ]}
      />
      
      <TabWidget
        titles={['Account', 'Privacy', 'Notifications']}
        tabs={[
          // Account Tab
          <Content paddingTop={16}>
            <CommonItemContainer>
              <CommonItem
                title="Edit Profile"
                subTitle="Update your personal information"
                leftIcon="USER"
                rightIcon="CHEVRON_RIGHT"
                onPress={() => navigation.navigate('EditProfile')}
              />
              <CommonItem
                title="Change Password"
                subTitle="Update your password"
                leftIcon="LOCK"
                rightIcon="CHEVRON_RIGHT"
                onPress={() => navigation.navigate('ChangePassword')}
              />
              <CommonItem
                title="Payment Methods"
                subTitle="Manage your payment methods"
                leftIcon="CREDIT_CARD"
                rightIcon="CHEVRON_RIGHT"
                onPress={() => navigation.navigate('PaymentMethods')}
              />
            </CommonItemContainer>
            
            <Button
              variant="danger"
              size="full"
              marginHorizontal={24}
              marginTop={32}
              onPress={handleLogout}
            >
              Logout
            </Button>
          </Content>,
          
          // Privacy Tab
          <Content paddingTop={16}>
            <CommonItemContainer>
              <Item 
                row 
                justifyContentSpaceBetween 
                alignItemsCenter
                paddingHorizontal={16}
                paddingVertical={12}
              >
                <Item flex={1}>
                  <Label text="Biometric Login" fontWeight="medium" marginBottom={4} />
                  <Label text="Use Face ID or fingerprint" fontSize="sm" variant="grey-800" />
                </Item>
                <Toggle isOn={biometric} onToggleChange={setBiometric} />
              </Item>
              
              <CommonItem
                title="Privacy Policy"
                leftIcon="DOCUMENT"
                rightIcon="EXTERNAL_LINK"
                onPress={() => openPrivacyPolicy()}
              />
              
              <CommonItem
                title="Terms of Service"
                leftIcon="DOCUMENT"
                rightIcon="EXTERNAL_LINK"
                onPress={() => openTerms()}
              />
            </CommonItemContainer>
          </Content>,
          
          // Notifications Tab
          <Content paddingTop={16}>
            <CommonItemContainer>
              <Item 
                row 
                justifyContentSpaceBetween 
                alignItemsCenter
                paddingHorizontal={16}
                paddingVertical={12}
              >
                <Item flex={1}>
                  <Label text="Push Notifications" fontWeight="medium" marginBottom={4} />
                  <Label text="Receive push notifications" fontSize="sm" variant="grey-800" />
                </Item>
                <Toggle isOn={notifications} onToggleChange={setNotifications} />
              </Item>
              
              <CommonItem
                title="Email Notifications"
                subTitle="Receive email updates"
                rightIcon="CHEVRON_RIGHT"
                onPress={() => navigation.navigate('EmailSettings')}
              />
              
              <CommonItem
                title="SMS Notifications"
                subTitle="Receive SMS alerts"
                rightIcon="CHEVRON_RIGHT"
                onPress={() => navigation.navigate('SMSSettings')}
              />
            </CommonItemContainer>
          </Content>,
        ]}
      />
    </Container>
  );
}
```

## Features Demonstrated

- ✅ Tab navigation with TabWidget
- ✅ Toggle switches
- ✅ CommonItem lists
- ✅ Confirmation dialogs
- ✅ Navigation integration
- ✅ Organized settings structure

## Try It Out

You can run this example in your project or try it in Expo Snack.
