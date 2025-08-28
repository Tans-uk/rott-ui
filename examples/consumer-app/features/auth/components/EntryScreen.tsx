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
  Button,
  Content,
  BottomMenu,
  Input,
  AlertDialog,
  BottomMenuItemModel,
} from '@tansuk/rott-ui';
import { useIntl } from 'react-intl';
import { useLanguageState } from '../../../contexts';
import { languageMessages } from '../../../I18nProvider';

export default function EntryScreen() {
  const { selectedLanguage, setLanguage } = useLanguageState();
  const intl = useIntl();

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
            {intl.formatMessage({ id: 'COMMON.LOGIN' })}
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
                    variant: 'primary',
                    size: 'full',
                    onPress: () => {},
                  },
                ],
              })
            }
          >
            {intl.formatMessage({ id: 'COMMON.SOCIAL_HELP' })}
          </Button>
        </Item>
      </Content>

      <BottomMenu menuItems={entryScreenItems} />
    </Container>
  );
}
