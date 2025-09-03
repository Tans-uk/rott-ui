import {
  Container,
  Header,
  Item,
  Pressable,
  Icon,
  Modal,
  List,
  Separator,
  CommonItem,
  Label,
  Content,
  BottomMenu,
  Input,
  BottomMenuItemModel,
  FormContainer,
  ButtonGroup,
} from '@tansuk/rott-ui';
import { useIntl } from 'react-intl';
import { useLanguageState } from '../../../contexts';
import { languageMessages } from '../../../../I18nProvider';
import { useState } from 'react';

export default function EntryScreen() {
  const { selectedLanguage, setLanguage } = useLanguageState();
  const intl = useIntl();

  const [{ username, password }, setCredentials] = useState({
    username: '',
    password: '',
  });

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
    <Container noPadding>
      <Header
        height={40}
        logo="PTTBANK_BLACK"
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
              onPress={() => {
                Modal.showModal({
                  id: 999,
                  height: 50,
                  visible: true,
                  onClose: () => Modal.hideModal(999),
                  slideToClose: true,
                  backgroundColor: 'grey-900',
                  headerBackgroundColor: 'grey-900',
                  panResponderBackgroundColor: 'grey-900',
                  header: {
                    height: 40,
                    backgroundColor: 'grey-900',
                    rightIcon: {
                      testID: 'cancel-button-test-id',
                      name: 'REMOVE',
                      mode: 'stroke',
                      width: 24,
                      height: 24,
                      strokeWidth: 2,
                      rounded: true,
                      backgroundColor: 'grey-900',
                      borderColor: 'primary',
                      alignItemsCenter: true,
                      onPress: () => Modal.hideModal(999),
                    },
                    title: intl.formatMessage({
                      id: 'COMMON.SELECT_LANGUAGE',
                    }),
                  },
                  children: (
                    <Item paddingTop={24} flex={1}>
                      <Separator
                        variant="neutral-grey-alpha-200"
                        height={1}
                        width="full"
                      />

                      <List
                        flex={1}
                        data={Object.keys(languageMessages)}
                        renderItem={({ item }) => (
                          <CommonItem
                            backgroundColor="grey-900"
                            title={{
                              text: item,
                              variant: 'white',
                            }}
                            selectedPosition="right"
                            showSelected
                            selected={selectedLanguage?.name === item}
                            onPress={() => {
                              setLanguage({ name: item });
                              Modal.hideModal(999);
                            }}
                          />
                        )}
                        renderSeparator
                        separatorHeight={1}
                        separatorVariant="neutral-grey-alpha-200"
                      />
                    </Item>
                  ),
                });
              }}
            >
              <Label
                fontSize="lg"
                fontFamily="Markpro-Medium"
                variant="primary"
              >
                {selectedLanguage.name}
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

      <Content flex={1} justifyContentCenter alignItemsCenter useBottomInset>
        <Item size="full" alignItemsCenter>
          <FormContainer>
            <Input
              label="Username"
              name="username"
              type="default"
              value={username}
              size="full"
              onChangeText={text =>
                setCredentials({ username: text, password })
              }
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={password}
              size="full"
              onChangeText={text =>
                setCredentials({ username, password: text })
              }
              renderSeparator={false}
            />
          </FormContainer>

          <ButtonGroup
            buttons={[
              { text: 'Login', variant: 'primary', size: 'full' },
              { text: 'Register', variant: 'secondary-outline', size: 'full' },
            ]}
          />
        </Item>
      </Content>

      <BottomMenu menuItems={entryScreenItems} />
    </Container>
  );
}
