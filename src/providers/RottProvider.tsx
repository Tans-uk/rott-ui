import {type FC, type PropsWithChildren} from 'react'

import {Platform, StatusBar} from 'react-native'

import {RottUiContext} from '../contexts'
import {
  ActionMenuProvider,
  AlertDialogProvider,
  ModalProvider,
  NotificationProvider,
} from '../features'

import {
  getApiLevelSync,
  getSystemVersion,
  getTotalMemorySync,
  hasDynamicIsland,
  hasNotch,
} from 'react-native-device-info'
import {SafeAreaProvider} from 'react-native-safe-area-context'

interface RottProviderProps extends PropsWithChildren {
  config?: any
}

export let themeConfig = {
  colors: {
    // PRIMARY
    primary: 'rgba(0, 169, 206, 1)',
    secondary: 'rgba(255, 199, 44, 1)',
    'grey-900': 'rgba(34, 63, 70, 1)',
    'grey-800': 'rgba(61, 88, 94, 1)',
    'grey-200': 'rgba(161, 173, 175, 1)',
    'grey-100': 'rgba(234, 239, 240, 1)',
    white: 'rgba(255, 255, 255, 1)',
    black: 'rgba(17, 17, 17, 1)',

    // SEMANTIC
    danger: 'rgba(246, 83, 83, 1)',
    success: 'rgba(63, 182, 24, 1)',
    info: 'rgba(63, 182, 210, 1)',
    warning: 'rgba(255, 117, 24, 1)',
    mint: 'rgba(32, 150, 110, 1)',

    'success-notification': 'rgba(72, 193, 181, 1)',
    'danger-notification': 'rgba(209, 94, 83, 1)',
    'warning-notification': 'rgba(255, 173, 50, 1)',
    'info-notification': 'rgba(77, 175, 234, 1)',

    // NEUTRAL/ALPHA
    'neutral-alpha-900': 'rgba(34, 63, 70, 0.9)',
    'neutral-alpha-700': 'rgba(34, 63, 70, 0.75)',
    'neutral-alpha-400': 'rgba(34, 63, 70, 0.40)',
    'neutral-alpha-300': 'rgba(34, 63, 70, 0.30)',
    'neutral-alpha-200': 'rgba(34, 63, 70, 0.15)',
    'neutral-alpha-100': 'rgba(34, 63, 70, 0.10)',
    'neutral-shadow-300': 'rgba(6, 14, 16, 0.30)',

    'neutral-red-alpha-300': 'rgba(228, 65, 96, 0.30)',
    'neutral-green-alpha-300': 'rgba(68, 238, 162, 0.30)',
    'neutral-grey-alpha-200': 'rgba(234, 239, 240, 0.15)',
    'neutral-blue-soft': 'rgba(130, 222, 243, 1)',
    'neutral-blue-alpha': 'rgba(99, 115, 129, 1)',

    // GRADIENT
    'primary-outline': 'transparent',
    'secondary-outline': 'transparent',
    'success-outline': 'transparent',
    'info-outline': 'transparent',
    'warning-outline': 'transparent',
    'danger-outline': 'transparent',
    'white-outline': 'transparent',

    // SEPERATOR COLOR
    'seperator-grey-200': 'rgba(79, 100, 104, 1)',

    transparent: 'rgba(0, 0, 0, 0)',
  },
  options: {
    hasNotch: false,
    hasDynamicIsland: false,
    appLanguage: {
      name: 'en-US',
    },
  },
  texts: {},
  images: {
    ONBOARDING_1: require('../assets/images/onBoarding/Onboarding-1.png'),
    ONBOARDING_2: require('../assets/images/onBoarding/Onboarding-2.png'),
    ONBOARDING_3: require('../assets/images/onBoarding/Onboarding-3.png'),
    HGS_LOGO: require('../assets/images/logo/HGS-Logo.png'),
    HGS_LOGO_WHITE: require('../assets/images/logo/HGS-LogoWhite.png'),
    PTTBANK_BLACK: require('../assets/images/logo/pttbank-Black.png'),
    PTTBANK_WHITE: require('../assets/images/logo/pttbank-White.png'),
    QR_BUTTON: require('../assets/images/logo/qr-button.png'),
    QR_BACKGROUND_BLUR: require('../assets/images/qr/qr-background-blur.png'),
    PTTBANK_BLACK_COLORED: require('../assets/images/logo/pttbank-BlackColored.png'),
    GRADIENT_BG: require('../assets/images/splash/graident_bg.png'),
    PHONE_ICON: require('../assets/images/entry/021-telefon.png'),
    NOTIFICATION_ICON: require('../assets/images/entry/028-bildirim.png'),
    NOTIFICATION: require('../assets/images/notifications/notification.png'),
    NOTIFICATION_LOCKED: require('../assets/images/notifications/notification-locked.png'),
    DUMMY_PROFILE: require('../assets/images/entry/012-kullanici.png'),
    SOCIAL_HELP_ICON: require('../assets/images/entry/036-yardim-kampanyasi.png'),
    POS: require('../assets/images/entry/pos.png'),
    PERSON: require('../assets/images/entry/person.png'),
    APPOINTMENT_ICON: require('../assets/images/entry/023-takvim.png'),
    LOCATION_ICON: require('../assets/images/entry/029-lokasyon-pin.png'),
    ATM_ICON: require('../assets/images/entry/019-atm-makinesi.png'),
    MORE_ICON: require('../assets/images/entry/030-daha-fazla-daire.png'),
    RIGHT_ARROW_ICON: require('../assets/images/commonIcon/001-ileri.png'),
    LEFT_ARROW_ICON: require('../assets/images/commonIcon/002-geri.png'),
    INFO_ICON: require('../assets/images/commonIcon/027-info.png'),
    CLEAR_ICON: require('../assets/images/commonIcon/clear.png'),
    QUESTION_MARK_ICON: require('../assets/images/commonIcon/questionMark.png'),
    CHECK_ICON: require('../assets/images/commonIcon/questionMark.png'),
    EYE_ACTIVE: require('../assets/images/commonIcon/eye_active.png'),
    EYE_PASSIVE: require('../assets/images/commonIcon/eye_passive.png'),
    CHECKBOX_ACTIVE: require('../assets/images/commonIcon/check_active.png'),
    CHECKBOX_PASSIVE: require('../assets/images/commonIcon/check_passive.png'),
    RADIO_OFF: require('../assets/images/commonIcon/radio_off.png'),
    RADIO_ON: require('../assets/images/commonIcon/radio_on.png'),
    LINE: require('../assets/images/commonIcon/line.png'),
    SMILEY_FACE: require('../assets/images/entry/037-gulen-surat.png'),
    SAD_FACE: require('../assets/images/entry/038-uzgun-surat.png'),
    RESULT_OK: require('../assets/images/result/ok.png'),
    RESULT_HGS: require('../assets/images/result/hgs.png'),
    RESULT_DATE: require('../assets/images/result/date.png'),
    SETTINGS: require('../assets/images/commonIcon/settings.png'),
    MENU: require('../assets/images/commonIcon/menu.png'),
    PROFILE: require('../assets/images/commonIcon/profile.png'),
    SEARCH: require('../assets/images/commonIcon/search.png'),
    CLOSE: require('../assets/images/commonIcon/close.png'),
    MICROPHONE: require('../assets/images/commonIcon/microphone.png'),
    STAR: require('../assets/images/commonIcon/star.png'),
    STAR_SOLID: require('../assets/images/commonIcon/star_solid.png'),

    SHORTCUT: require('../assets/images/commonIcon/shortcut.png'),
    SEND: require('../assets/images/commonIcon/send.png'),
    QR_CODE: require('../assets/images/commonIcon/qr-code.png'),
    MORE: require('../assets/images/commonIcon/more.png'),
    DASHBOARD_BG: require('../assets/images/dashboard/dashboard-bg.png'),
    COPY: require('../assets/images/commonIcon/copy.png'),
    PTT_DIRECTORY_RIGHT: require('../assets/images/icons/ptt-direction-right.png'),
    PTT_WARNING_ERROR: require('../assets/images/commonIcon/ptt-warning-error.png'),

    CARD_CARD: require('../assets/images/card/debit.png'),
    CARD_ACCOUNT: require('../assets/images/card/account.png'),
    CARD_SOCIAL: require('../assets/images/card/social.png'),
    CARD_BRAND_TROY: require('../assets/images/card/cardBrand/troy.png'),
    CARD_BRAND_VISA: require('../assets/images/card/cardBrand/visa.png'),
    CARD_BRAND_MASTERCARD: require('../assets/images/card/cardBrand/master-card.png'),
    CARD_BRAND_MAESTRO: require('../assets/images/card/cardBrand/maestro.png'),

    FAST_LOGO: require('../assets/images/fast/fast-tcmb.png'),

    EMPTY_TRANSACTIONS: require('../assets/images/empty-state/credit-card.png'),
    EMPTY_TRANSACTIONS_LIGHT: require('../assets/images/empty-state/credit-card-light.png'),
    EMPTY_PHONE: require('../assets/images/empty-state/phone.png'),
    EMPTY_CARD_CHECK: require('../assets/images/empty-state/card-check.png'),
    EMPTY_CARD_ERROR1: require('../assets/images/empty-state/card-error-1.png'),
    EMPTY_CARD_INFO: require('../assets/images/empty-state/card-info.png'),
    EMPTY_CARD_WARNING: require('../assets/images/empty-state/card-warning.png'),
    EMPTY_CARD_ERROR: require('../assets/images/empty-state/card-error-2.png'),
    EMPTY_MOBILE_LOCKED: require('../assets/images/empty-state/mobile-locked.png'),
    EMPTY_MONEY_TRANSFER: require('../assets/images/empty-state/money-transfer-1.png'),
    EMPTY_MONEY_STATUS: require('../assets/images/empty-state/money-transfer-2.png'),
    EMPTY_NOTIFICATION: require('../assets/images/empty-state/notifications.png'),
    EMPTY_NO_INTERNET: require('../assets/images/empty-state/no-internet.png'),
    EMPTY_LIST_ERROR: require('../assets/images/empty-state/list-error-empty-state.png'),
    EMPTY_GENERAL_SEARCH: require('../assets/images/empty-state/general-search.png'),
    EMPTY_DOCUMENT: require('../assets/images/empty-state/document.png'),
    EMPTY_GENERAL_ALERT: require('../assets/images/empty-state/general-alert.png'),
    EMPTY_GENERAL_CHECK: require('../assets/images/empty-state/general-check.png'),
    EMPTY_GENERAL_INFO: require('../assets/images/empty-state/general-info.png'),
    EMPTY_GENERAL_WARNING: require('../assets/images/empty-state/general-warning.png'),
    EMPTY_PASSWORD: require('../assets/images/empty-state/unlock-password.png'),
    EMPTY_NO_ADDRESS: require('../assets/images/empty-state/no-address.png'),
    EMPTY_DOCUMENT_INFO: require('../assets/images/empty-state/document-info.png'),

    NEAR_PTT_BUILDING: require('../assets/images/nearPtt/ptt-building.png'),
    NEAR_PTT_ATM: require('../assets/images/nearPtt/ptt-atm.png'),
    NEAR_PTT_BRANCH: require('../assets/images/nearPtt/ptt-branch.png'),
  },
  icons: {
    // Currency Imports
    EURO: require('../assets/icons/svg/currency/ptt-euro.svg'),
    GBP: require('../assets/icons/svg/currency/ptt-gbp.svg'),
    TL: require('../assets/icons/svg/currency/ptt-tl.svg'),
    USD: require('../assets/icons/svg/currency/ptt-usd.svg'),

    // Interface Imports
    SEND_MONEY: require('../assets/icons/svg/interface/ptt-sendmoney.svg'),
    ABOUT_PHONE: require('../assets/icons/svg/interface/ptt-about-phone.svg'),
    ARROW_DOWN: require('../assets/icons/svg/interface/ptt-arrow-down.svg'),
    ARROW_LEFT: require('../assets/icons/svg/interface/ptt-arrow-left.svg'),
    ARROW_RIGHT: require('../assets/icons/svg/interface/ptt-arrow-right.svg'),
    ARROW_TRANSFER: require('../assets/icons/svg/interface/ptt-arrow-transfer.svg'),
    CALENDAR: require('../assets/icons/svg/interface/ptt-calendar.svg'),
    CALLING: require('../assets/icons/svg/interface/ptt-calling.svg'),
    CHECK_CIRCLE: require('../assets/icons/svg/interface/ptt-check-circle.svg'),
    COPY: require('../assets/icons/svg/interface/ptt-copy.svg'),
    COPY_CHECK: require('../assets/icons/svg/interface/ptt-copy-check.svg'),
    EYE_DISABLE: require('../assets/icons/svg/interface/ptt-eye-disable.svg'),
    EYE: require('../assets/icons/svg/interface/ptt-eye.svg'),
    MAIL: require('../assets/icons/svg/interface/ptt-mail.svg'),
    FAST_DELIVERY: require('../assets/icons/svg/interface/ptt-fast-delivery.svg'),
    GALLERY: require('../assets/icons/svg/interface/ptt-gallery.svg'),
    HELP: require('../assets/icons/svg/interface/ptt-help.svg'),
    HGS: require('../assets/icons/svg/interface/ptt-hgs.svg'),
    INFORMATION: require('../assets/icons/svg/interface/ptt-information.svg'),
    LOCATION: require('../assets/icons/svg/interface/ptt-location.svg'),
    MENU_CIRCLE_VERTICAL: require('../assets/icons/svg/interface/ptt-menu-circle-vertical.svg'),
    MENU_DOT: require('../assets/icons/svg/interface/ptt-menu-dot.svg'),
    MENU_LINE_HORIZONTAL: require('../assets/icons/svg/interface/ptt-menu-line-horizontal.svg'),
    MONEY_ADD: require('../assets/icons/svg/interface/ptt-money-add.svg'),
    MONEY_ARROW_RIGHT: require('../assets/icons/svg/interface/ptt-money-arrow-right.svg'),
    MONEY_USER: require('../assets/icons/svg/interface/ptt-money-user.svg'),
    NOTIFICATION: require('../assets/icons/svg/interface/ptt-notification.svg'),
    QR_TRANSFER: require('../assets/icons/svg/interface/ptt-qr-transfer.svg'),
    IBAN_QR: require('../assets/icons/svg/interface/ptt-qr-iban.svg'),
    REMOVE_BIG: require('../assets/icons/svg/interface/ptt-remove-big.svg'),
    REMOVE_CIRCLE: require('../assets/icons/svg/interface/ptt-remove-circle.svg'),
    REMOVE: require('../assets/icons/svg/interface/ptt-remove.svg'),
    SEARCH: require('../assets/icons/svg/interface/ptt-search.svg'),
    SETTINGS: require('../assets/icons/svg/interface/ptt-settings.svg'),
    WARNING_CIRCLE: require('../assets/icons/svg/interface/ptt-warning-circle.svg'),
    VIBRATE_MODE: require('../assets/icons/svg/interface/ptt-vibrate-mode.svg'),
    TICK: require('../assets/icons/svg/interface/ptt-tick.svg'),
    SOCIAL_ASIST: require('../assets/icons/svg/interface/ptt-social-asist.svg'),
    SHARE_RECTANGLE: require('../assets/icons/svg/interface/ptt-share-rectangle.svg'),
    ARROW_SHARE: require('../assets/icons/svg/interface/ptt-arrow-share.svg'),
    PACKAGING_LOCATION: require('../assets/icons/svg/interface/ptt-packaging-location.svg'),
    SHARE: require('../assets/icons/svg/interface/ptt-share.svg'),
    TRANSFER_TWO: require('../assets/icons/svg/interface/ptt-transfer-two.svg'),
    USER: require('../assets/icons/svg/interface/ptt-user.svg'),
    WARNING_ERROR: require('../assets/icons/svg/interface/ptt-warning-error.svg'),
    CHEVRON_LEFT: require('../assets/icons/svg/interface/ptt-chevron-left.svg'),
    CHEVRON_RIGHT: require('../assets/icons/svg/interface/ptt-chevron-right.svg'),
    CIRCLE_HELP: require('../assets/icons/svg/interface/ptt-circle-help.svg'),
    AMBLEM: require('../assets/icons/svg/menu/ptt-amblem.svg'),
    AMBLEM_TWO: require('../assets/icons/svg/menu/ptt-amblem-two.svg'),
    ACCOUNT_ACTIVITE: require('../assets/icons/svg/interface/ptt-account-activite.svg'),
    STAR: require('../assets/icons/svg/interface/ptt-star.svg'),
    STAR_FILL: require('../assets/icons/svg/interface/ptt-star-fill.svg'),
    CARD_USER: require('../assets/icons/svg/interface/ptt-card-user.svg'),
    ID_CARD: require('../assets/icons/svg/interface/ptt-id-card.svg'),
    LOCK: require('../assets/icons/svg/interface/ptt-lock.svg'),
    MONEY_CHECK: require('../assets/icons/svg/interface/ptt-money-check.svg'),
    MONEY_REMOVE: require('../assets/icons/svg/interface/ptt-money-remove.svg'),
    LINE: require('../assets/icons/svg/interface/ptt-line.svg'),
    PHONE_BOOK: require('../assets/icons/svg/interface/ptt-phone-book.svg'),
    BULLETED_LIST: require('../assets/icons/svg/interface/ptt-bulleted-list.svg'),
    FILTER: require('../assets/icons/svg/interface/ptt-filter.svg'),
    REFRESH: require('../assets/icons/svg/interface/ptt-refresh.svg'),
    ADD_CIRCLE: require('../assets/icons/svg/interface/ptt-add-circle.svg'),
    PLUS_CIRCLE_REMOVE: require('../assets/icons/svg/interface/ptt-plus-circle-remove.svg'),
    PLUS: require('../assets/icons/svg/interface/ptt-plus.svg'),
    FAST: require('../assets/icons/svg/interface/ptt-fast-icon.svg'),
    ALARM: require('../assets/icons/svg/interface/ptt-alarm-check.svg'),
    QR: require('../assets/icons/svg/interface/ptt-qr.svg'),
    BURGER_MENU: require('../assets/icons/svg/interface/ptt-burgermenu.svg'),
    EXTERNAL_LINK: require('../assets/icons/svg/interface/ptt-external-link.svg'),

    // Menu Imports
    MENU_CAR: require('../assets/icons/svg/menu/ptt-menu-car.svg'),
    MENU_DOCUMENT_TEXT: require('../assets/icons/svg/menu/ptt-menu-document-text.svg'),
    MENU_DONATE: require('../assets/icons/svg/menu/ptt-menu-donate.svg'),
    MENU_EXIT: require('../assets/icons/svg/menu/ptt-menu-exit.svg'),
    MENU_MONEY_ADD: require('../assets/icons/svg/menu/ptt-menu-money-add.svg'),
    MENU_MONEY_TRANSFER: require('../assets/icons/svg/menu/ptt-menu-money-transfer.svg'),
    MENU_QRSCAN: require('../assets/icons/svg/menu/ptt-menu-qrscan.svg'),
    MENU_MENU_WALLET: require('../assets/icons/svg/menu/ptt-menu-wallet.svg'),
    MENU_PLACEHOLDER: require('../assets/icons/svg/menu/ptt-menu-placeholder.svg'),
    MENU_ABROAD: require('../assets/icons/svg/menu/ptt-menu-abroad.svg'),
    MENU_CARD_I: require('../assets/icons/svg/menu/ptt-menu-card-i.svg'),
    MENU_HGS: require('../assets/icons/svg/menu/ptt-menu-hgs.svg'),
    MENU_OLDIES: require('../assets/icons/svg/menu/ptt-menu-oldies.svg'),
    MENU_SHIELD: require('../assets/icons/svg/menu/ptt-menu-shield.svg'),
    MENU_CIRCLE_TEST: require('../assets/icons/svg/menu/ptt-menu-circle-test.svg'),
    MENU_BANKING: require('../assets/icons/svg/interface/ptt-banking.svg'),

    // Notification Imports
    NOTIFICATION_ELLIPSE: require('../assets/icons/svg/notification/ptt-ellipse.svg'),

    // Quick Transactions Imports
    QUICK_TRANSACTIONS_MONEY_USER: require('../assets/icons/svg/interface/ptt-money-user.svg'),
    QUICK_TRANSACTIONS_BANKING: require('../assets/icons/svg/interface/ptt-banking.svg'),
    QUICK_TRANSACTIONS_BILL: require('../assets/icons/svg/interface/ptt-bill.svg'),
    QUICK_TRANSACTIONS_CREDIT_CARD: require('../assets/icons/svg/interface/ptt-credit-card.svg'),
    QUICK_TRANSACTIONS_MOBILE_PAYMENT: require('../assets/icons/svg/interface/ptt-mobile-payment.svg'),
    QUICK_TRANSACTIONS_MONEY_COIN: require('../assets/icons/svg/interface/ptt-money-coin.svg'),
    QUICK_TRANSACTIONS_MONEY_TRANSFER: require('../assets/icons/svg/interface/ptt-money-transfer.svg'),

    // Dashboard Mode Imports
    DASHBOARD_MORE_QR_MENU: require('../assets/icons/svg/interface/ptt-qr-menu.svg'),
    DASHBOARD_MORE_LOCK: require('../assets/icons/svg/interface/ptt-lock.svg'),
    DASHBOARD_MORE_BANK: require('../assets/icons/svg/interface/ptt-banking.svg'),
    DASHBOARD_MORE_CALLING: require('../assets/icons/svg/interface/ptt-calling.svg'),

    // License Plate Imports
    PLATE_NUMBER_TR: require('../assets/icons/svg/licensePlates/TR.svg'),
    PLATE_NUMBER_GLOBAL: require('../assets/icons/svg/licensePlates/Global.svg'),

    // Near PTT Imports
    PTT_MAP: require('../assets/icons/svg/nearPtt/ptt-map.svg'),
    PTT_BULLETED_LIST: require('../assets/icons/svg/nearPtt/ptt-bulleted-list.svg'),

    // Notification Imports
    CHECK_CIRCLE_FILL: require('../assets/icons/svg/notification/ptt-check-fill.svg'),
    INFORMATION_CIRCLE: require('../assets/icons/svg/notification/ptt-information-fill.svg'),
  },
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    '2xl': 24,
    '3xl': 36,
  },
  goBack: () => {},
}

export const RottProvider: FC<RottProviderProps> = ({children, config}) => {
  if (config) themeConfig = {...themeConfig, ...config}

  return (
    <SafeAreaProvider>
      <RottUiContext.Provider
        value={{
          language: {
            name: 'en-US',
          },
          hasDynamicIsland: hasDynamicIsland(),
          hasNotch:
            !hasNotch() && Platform.OS === 'android' && StatusBar.currentHeight! > 24
              ? true
              : hasNotch(),
          deviceInfo: {
            operatingSystemVersion: getSystemVersion(),
            apiLevel: getApiLevelSync(),
            totalMemory: getTotalMemorySync(),
          },
        }}>
        <NotificationProvider>
          <ModalProvider>
            <ActionMenuProvider>
              <AlertDialogProvider>{children}</AlertDialogProvider>
            </ActionMenuProvider>
          </ModalProvider>
        </NotificationProvider>
      </RottUiContext.Provider>
    </SafeAreaProvider>
  )
}
