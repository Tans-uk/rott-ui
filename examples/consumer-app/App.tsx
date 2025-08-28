/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';

import {
  AlertDialog,
  BottomMenu,
  BottomMenuItemModel,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Pressable,
  RottProvider,
} from '@tansuk/rott-ui';

function App() {
  // Bottom menu items
  const entryScreenItems: BottomMenuItemModel[] = [
    {
      testID: 'fast-menu-button-test-id',
      icon: {
        name: 'FAST',
        noStroke: true,
        mode: 'fill',
      },
      title: 'Fast',
      onPress: () => {},
    },
    {
      testID: 'near-ptt-atm-tab-screen-test-id',
      icon: { name: 'LOCATION', noStroke: true },
      title: 'Near PTT ATM',
      onPress: () => {},
    },
    {
      testID: 'qr-code-scan-button-test-id',
      image: {
        name: 'QR_BUTTON',
        width: 56,
        height: 56,
      },
      containerStyle: {
        top: -24,
      },
      onPress: () => {},
    },
    {
      testID: 'vehicle-operations-button-test-id',
      icon: {
        name: 'MENU_CAR',
        noStroke: true,
      },
      title: 'Vehicle Operations',
      onPress: () => {},
    },
    {
      testID: 'card-operations-button-test-id',
      icon: {
        name: 'MENU_CARD_I',
        noStroke: true,
      },
      title: 'Card Operations',
      onPress: () => {},
    },
  ];

  return (
    <RottProvider
      config={{
        options: {
          language: { name: 'en-US' },
          hasNotch: false,
          hasDynamicIsland: false,
        },
      }}
    >
      <Container noPadding>
        <Header
          height={40}
          logo="PTTBANK_WHITE"
          leftElement={
            <Item flex={1} row width={80}>
              <Pressable
                width={40}
                height={40}
                justifyContentCenter
                onPress={() => {}}
              >
                <Icon name="CALLING" height={24} width={24} noStroke />
              </Pressable>

              <Pressable
                testID="language-change-pressable-test-id"
                width={40}
                height={40}
                justifyContentCenter
                onPress={() => {}}
              >
                <Label
                  fontSize="lg"
                  fontFamily="Markpro-Medium"
                  variant="primary"
                >
                  TR
                </Label>
              </Pressable>
            </Item>
          }
          rightElement={
            <Item width={80} alignItemsFlexEnd>
              {/* <NotificationIcon height={40} /> */}
            </Item>
          }
        />

        <Content
          flex={1}
          justifyContentCenter
          alignItemsCenter
          useBottomInset
          marginBottom={88}
        >
          <Item marginTop={24}>
            <Input
              name="date"
              type="date"
              mode="datetime"
              value={new Date().toISOString()}
              onDateChange={event => {
                console.log(event);
              }}
            />
            <Button
              testID="login-button-test-id"
              key="h4"
              size="full"
              variant="primary"
              fontSize="xl"
              onPress={() => AlertDialog.test()}
              marginBottom={24}
            >
              Login
            </Button>

            <Button
              testID="hgs-button-test-id"
              size={{ width: 'full', height: 'md' }}
              fontSize="lg"
              variant="white"
              leftImage={{
                name: 'HGS_LOGO',
                absolute: true,
                width: 48,
                height: 48,
              }}
              rightIcon={{
                name: 'ARROW_RIGHT',
                variant: 'primary',
                mode: 'fill',
                noStroke: true,
                absolute: true,
                width: 80,
                height: 80,
              }}
              onPress={() => {}}
            >
              HGS
            </Button>

            <Button
              testID="social-help-button-test-id"
              size={{ width: 'full', height: 'md' }}
              fontSize="lg"
              variant="primary"
              marginTop={8}
              leftImage={{
                name: 'SOCIAL_HELP_ICON',
                tintColor: 'white',
                absolute: true,
              }}
              rightIcon={{
                name: 'ARROW_LEFT',
                variant: 'danger',
                absolute: true,
                mode: 'fill',
                noStroke: true,
              }}
              onPress={() =>
                AlertDialog.show({
                  title: 'Test',
                  text: 'Test',
                  buttons: [
                    {
                      text: 'OK',
                      variant: 'primary',
                      size: 'full',
                      onPress: () => {},
                    },
                  ],
                })
              }
            >
              Social Help
            </Button>
          </Item>
        </Content>

        <BottomMenu menuItems={entryScreenItems} />
      </Container>
    </RottProvider>
  );
}

export default App;
