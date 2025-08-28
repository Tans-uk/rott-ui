import React, { FC, PropsWithChildren } from 'react';
import { IntlProvider } from 'react-intl';
import { useLanguageState } from './contexts/LanguageStateProvider';

export const languageMessages = {
  'en-US': {
    'COMMON.CANCEL': 'Cancel',
    'COMMON.CONFIRM': 'Confirm',
    'COMMON.SELECT_LANGUAGE': 'Select Language',
    'COMMON.LOGIN': 'Login',
    'COMMON.SOCIAL_HELP': 'Social Help',
  },
  'tr-TR': {
    'COMMON.CANCEL': 'İptal',
    'COMMON.CONFIRM': 'Onayla',
    'COMMON.SELECT_LANGUAGE': 'Dil Seç',
    'COMMON.LOGIN': 'Giriş Yap',
    'COMMON.SOCIAL_HELP': 'Sosyal Yardım',
  },
  'de-DE': {
    'COMMON.CANCEL': 'Abbrechen',
    'COMMON.CONFIRM': 'Bestätigen',
    'COMMON.SELECT_LANGUAGE': 'Sprache auswählen',
    'COMMON.LOGIN': 'Anmelden',
    'COMMON.SOCIAL_HELP': 'Soziales Helfen',
  },
  'fr-FR': {
    'COMMON.CANCEL': 'Annuler',
    'COMMON.CONFIRM': 'Confirmer',
    'COMMON.SELECT_LANGUAGE': 'Sélectionner la langue',
    'COMMON.LOGIN': 'Se connecter',
    'COMMON.SOCIAL_HELP': 'Aide sociale',
  },
  'es-ES': {
    'COMMON.CANCEL': 'Cancelar',
    'COMMON.CONFIRM': 'Confirmar',
    'COMMON.SELECT_LANGUAGE': 'Seleccionar idioma',
    'COMMON.LOGIN': 'Iniciar sesión',
    'COMMON.SOCIAL_HELP': 'Ayuda social',
  },
  'it-IT': {
    'COMMON.CANCEL': 'Annulla',
    'COMMON.CONFIRM': 'Conferma',
    'COMMON.SELECT_LANGUAGE': 'Seleziona la lingua',
    'COMMON.LOGIN': 'Accedi',
    'COMMON.SOCIAL_HELP': 'Aiuto sociale',
  },
  'ja-JP': {
    'COMMON.CANCEL': 'キャンセル',
    'COMMON.CONFIRM': '確認',
    'COMMON.SELECT_LANGUAGE': '言語を選択',
    'COMMON.LOGIN': 'ログイン',
    'COMMON.SOCIAL_HELP': 'ソーシャルヘルプ',
  },
  'ko-KR': {
    'COMMON.CANCEL': '취소',
    'COMMON.CONFIRM': '확인',
    'COMMON.SELECT_LANGUAGE': '언어 선택',
    'COMMON.LOGIN': '로그인',
    'COMMON.SOCIAL_HELP': '소셜 도움',
  },
  'zh-CN': {
    'COMMON.CANCEL': '取消',
    'COMMON.CONFIRM': '确认',
    'COMMON.SELECT_LANGUAGE': '选择语言',
    'COMMON.LOGIN': '登录',
    'COMMON.SOCIAL_HELP': '社交帮助',
  },
};

export const I18nProvider: FC<PropsWithChildren> = ({ children }) => {
  const { selectedLanguage } = useLanguageState();

  return (
    <IntlProvider
      locale={selectedLanguage.name}
      messages={
        languageMessages[selectedLanguage.name as keyof typeof languageMessages]
      }
      defaultLocale="fr-FR"
    >
      {children}
    </IntlProvider>
  );
};
