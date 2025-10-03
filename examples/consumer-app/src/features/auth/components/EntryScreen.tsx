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
} from '@tansuk/rott-ui';
import { useIntl } from 'react-intl';
import { useLanguageState } from '../../../contexts';
import { languageMessages } from '../../../../I18nProvider';
import { useState } from 'react';

export default function EntryScreen() {
  const { selectedLanguage, setLanguage } = useLanguageState();
  const intl = useIntl();

  const [
    {
      select,
      numeric,
      checkbox,
      email,
      cvc,
      username,
      password,
      expireDate,
      plateNumber,
      iban,
      amount,
      creditCard,
      date,
      phone,
      pinPassword,
    },
    setCredentials,
  ] = useState({
    select: '',
    numeric: '',
    checkbox: false,
    email: '',
    cvc: '',
    username: '',
    password: '',
    expireDate: '',
    plateNumber: '',
    iban: '',
    amount: '',
    creditCard: '',
    date: '',
    phone: '',
    pinPassword: '',
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
    <Container>
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
        rightElement={<Item width={80} alignItemsFlexEnd />}
      />

      <Content
        flex={1}
        justifyContentCenter
        alignItemsCenter
        scrollEnabled
        useBottomInset
      >
        <FormContainer>
          <Input
            label="Select"
            name="select"
            type="select"
            size="full"
            list={[
              { label: 'Select', value: 'select' },
              { label: 'Select 2', value: 'select2', selected: true },
            ]}
            showSelected
            value={select}
            onSelectChange={text =>
              setCredentials({
                select: text,
                numeric,
                email,
                checkbox,
                cvc,
                username,
                password,
                expireDate,
                plateNumber,
                iban,
                amount,
                creditCard,
                date,
                phone,
                pinPassword,
              })
            }
          />

          <Input
            label="Numeric"
            name="numeric"
            type="numeric"
            size="full"
            value={numeric}
            onChangeText={text =>
              setCredentials({
                select,
                numeric: text,
                email,
                checkbox,
                cvc,
                username,
                password,
                expireDate,
                plateNumber,
                iban,
                amount,
                creditCard,
                date,
                phone,
                pinPassword,
              })
            }
          />

          <Input
            label="Checkbox"
            name="checkbox"
            type="checkbox"
            size="full"
            checked={checkbox}
            onCheckChange={text =>
              setCredentials({
                select,
                numeric,
                checkbox: !!text,
                email,
                cvc,
                username,
                password,
                expireDate,
                plateNumber,
                iban,
                amount,
                creditCard,
                date,
                phone,
                pinPassword,
              })
            }
          />

          <Input
            label="E-mail"
            name="email"
            type="email"
            size="full"
            value={email}
            onChangeText={text =>
              setCredentials({
                select,
                numeric,
                checkbox,
                email: text,
                cvc,
                username,
                password,
                expireDate,
                plateNumber,
                iban,
                amount,
                creditCard,
                date,
                phone,
                pinPassword,
              })
            }
          />

          <Input
            label={{
              text: 'CVC',
              theme: 'dark',
            }}
            name="cvc"
            type="cvc"
            size="full"
            value={cvc}
            onChangeText={text =>
              setCredentials({
                select,
                numeric,
                checkbox,
                email,
                cvc: text,
                username,
                password,
                expireDate,
                plateNumber,
                iban,
                amount,
                creditCard,
                date,
                phone,
                pinPassword,
              })
            }
          />

          <Input
            label="Username"
            name="username"
            type="default"
            size="full"
            rightIcon={{
              name: 'ARROW_RIGHT',
              width: 24,
              height: 24,
              variant: 'grey-200',
              noStroke: true,
              onPress: () => {},
            }}
            value={username}
            onChangeText={text =>
              setCredentials({
                select,
                numeric,
                checkbox,
                username: text,
                email,
                cvc,
                password,
                expireDate,
                plateNumber,
                iban,
                amount,
                creditCard,
                date,
                phone,
                pinPassword,
              })
            }
          />

          <Input
            leftIcon={{
              name: 'LOCK',
              width: 24,
              height: 24,
              variant: 'grey-200',
              noStroke: true,
              onPress: () => {},
            }}
            label="Password"
            name="password"
            type="password"
            value={password}
            onChangeText={text =>
              setCredentials({
                select,
                numeric,
                checkbox,
                email,
                cvc,
                username,
                password: text,
                expireDate,
                plateNumber,
                iban,
                amount,
                creditCard,
                date,
                phone,
                pinPassword,
              })
            }
          />

          <Input
            label="Expire Date"
            name="expireDate"
            type="expireDate"
            value={expireDate}
            onChangeText={text =>
              setCredentials({
                select,
                numeric,
                checkbox,
                email,
                cvc,
                username,
                password,
                expireDate: text,
                plateNumber,
                iban,
                amount,
                creditCard,
                date,
                phone,
                pinPassword,
              })
            }
          />

          <Input
            label="Plate Number"
            name="plateNumber"
            type="plateNumber"
            value={plateNumber}
            onChangeText={text =>
              setCredentials({
                select,
                numeric,
                checkbox,
                email,
                cvc,
                username,
                password,
                expireDate,
                plateNumber: text,
                iban,
                amount,
                creditCard,
                date,
                phone,
                pinPassword,
              })
            }
          />

          <Input
            label="IBAN"
            name="iban"
            type="iban"
            value={iban}
            onChangeText={text =>
              setCredentials({
                select,
                numeric,
                checkbox,
                email,
                cvc,
                username,
                password,
                expireDate,
                iban: text,
                amount,
                plateNumber,
                creditCard,
                date,
                phone,
                pinPassword,
              })
            }
          />

          <Input
            label="Amount"
            name="amount"
            type="amount"
            value={amount}
            onChangeText={text =>
              setCredentials({
                select,
                numeric,
                checkbox,
                email,
                cvc,
                username,
                password,
                expireDate,
                iban,
                plateNumber,
                amount: text,
                creditCard,
                date,
                phone,
                pinPassword,
              })
            }
          />

          <Input
            label="Credit Card"
            name="creditCard"
            type="creditCard"
            value={creditCard}
            onChangeText={text =>
              setCredentials({
                select,
                numeric,
                checkbox,
                email,
                cvc,
                username,
                password,
                expireDate,
                iban,
                plateNumber,
                amount,
                creditCard: text,
                date,
                phone,
                pinPassword,
              })
            }
          />

          <Input
            label="Date"
            name="date"
            type="date"
            mode="modal-date"
            value={date}
            onChangeText={text =>
              setCredentials({
                select,
                numeric,
                checkbox,
                email,
                cvc,
                username,
                password,
                expireDate,
                iban,
                plateNumber,
                amount,
                creditCard,
                date: text,
                phone,
                pinPassword,
              })
            }
          />

          <Input
            type="phone"
            label="Phone"
            name="phone"
            value={phone}
            onChangeText={text =>
              setCredentials({
                select,
                numeric,
                checkbox,
                email,
                cvc,
                username,
                password,
                expireDate,
                iban,
                plateNumber,
                amount,
                creditCard,
                date,
                phone: text,
                pinPassword,
              })
            }
          />

          <Input
            type="pinPassword"
            label="Pin Password"
            name="pinPassword"
            value={pinPassword}
            onChangeText={text =>
              setCredentials({
                select,
                numeric,
                checkbox,
                email,
                cvc,
                username,
                password,
                expireDate,
                iban,
                plateNumber,
                amount,
                creditCard,
                date,
                phone,
                pinPassword: text,
              })
            }
            rightIcon={{
              name: 'EYE',
              width: 24,
              height: 24,
              variant: 'grey-200',
              noStroke: true,
              onPress: () => {},
            }}
          />
        </FormContainer>
      </Content>

      <BottomMenu menuItems={entryScreenItems} />
    </Container>
  );
}
