---
sidebar_position: 2
title: Ayarlar Ekranı Örneği
description: Tab'lar ve toggle'lar içeren ayarlar ekranı
---

# Ayarlar Ekranı Örneği

Tab navigation, toggle'lar ve aksiyon öğeleri içeren eksiksiz bir ayarlar ekranı.

## Tam Kod {#complete-code}

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
          // Hesap tab'ı
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
          
          // Gizlilik tab'ı
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
          
          // Bildirimler tab'ı
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

## Gösterilen Özellikler {#features-demonstrated}

- ✅ TabWidget ile tab navigation
- ✅ Toggle switch'leri
- ✅ CommonItem listeleri
- ✅ Onay dialog'ları
- ✅ Navigation entegrasyonu
- ✅ Düzenli ayar yapısı

## Deneyin {#try-it-out}

Bu örneği kendi projenizde çalıştırabilir veya Expo Snack'te deneyebilirsiniz.
