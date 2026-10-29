---
sidebar_position: 4
title: Internationalization
description: React Intl ile çoklu dil desteği
---

# Internationalization

Rott UI, React Intl tabanlı built-in internationalization desteğiyle gelir.

## Kurulum {#setup}

Rott UI, React Intl kurulumunu `RottProvider` üzerinden otomatik olarak yapar.

### Dili Ayarlama {#set-language}

```tsx
import { RottProvider } from '@tansuk/rott-ui';

<RottProvider
  config={{
    options: {
      language: 'en', // veya 'tr'
    },
  }}
>
  <YourApp />
</RottProvider>
```

## Çevirileri Kullanma {#using-translations}

### useTranslator Hook'u {#usetranslator-hook}

```tsx
import { useTranslator } from '@tansuk/rott-ui';

function MyComponent() {
  const { t } = useTranslator();

  return (
    <>
      <Label text={t('welcome')} />
      <Button>{t('submit')}</Button>
    </>
  );
}
```

### Doğrudan useIntl {#direct-useintl}

```tsx
import { useIntl } from 'react-intl';

function MyComponent() {
  const intl = useIntl();

  return (
    <Label text={intl.formatMessage({ id: 'welcome' })} />
  );
}
```

## Özel Mesajlar Ekleme {#adding-custom-messages}

### Mesaj Dosyalarını Oluşturma {#create-message-files}

```json title="i18n/en-US.json"
{
  "app.welcome": "Welcome",
  "app.login": "Sign In",
  "app.logout": "Sign Out",
  "form.email": "Email Address",
  "form.password": "Password",
  "error.required": "This field is required",
  "error.invalid_email": "Invalid email address"
}
```

```json title="i18n/tr-TR.json"
{
  "app.welcome": "Hoş Geldiniz",
  "app.login": "Giriş Yap",
  "app.logout": "Çıkış Yap",
  "form.email": "E-posta Adresi",
  "form.password": "Şifre",
  "error.required": "Bu alan zorunludur",
  "error.invalid_email": "Geçersiz e-posta adresi"
}
```

### Mesajları Yükleme {#load-messages}

```tsx
import { IntlProvider } from 'react-intl';
import enMessages from './i18n/en-US.json';
import trMessages from './i18n/tr-TR.json';

const messages = {
  'en': enMessages,
  'tr': trMessages,
};

function App() {
  const [locale, setLocale] = useState('en');

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <RottProvider>
        <YourApp />
      </RottProvider>
    </IntlProvider>
  );
}
```

## Biçimlendirme {#formatting}

### Tarihler {#dates}

```tsx
const intl = useIntl();

const formattedDate = intl.formatDate(new Date(), {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
```

### Sayılar {#numbers}

```tsx
const formattedNumber = intl.formatNumber(1234.56, {
  style: 'currency',
  currency: 'USD',
});
```

### Pluralization {#pluralization}

```tsx
const message = intl.formatMessage(
  { id: 'items.count' },
  { count: items.length }
);
```

## Dil Değiştirici {#language-switcher}

```tsx
function LanguageSwitcher() {
  const { language, setLanguage } = useRottContext();

  return (
    <Item row>
      <Button
        variant={language === 'en' ? 'primary' : 'secondary-outline'}
        onPress={() => setLanguage('en')}
      >
        English
      </Button>
      <Button
        variant={language === 'tr' ? 'primary' : 'secondary-outline'}
        marginLeft={8}
        onPress={() => setLanguage('tr')}
      >
        Türkçe
      </Button>
    </Item>
  );
}
```

## En İyi Uygulamalar {#best-practices}

### Yapılması Gerekenler ✅ {#dos-}

- Hardcoded string'ler yerine mesaj key'leri kullanın
- Mesajları özelliğe/ekrana göre düzenleyin
- Desteklenen tüm dilleri test edin
- Pluralization'ı doğru şekilde ele alın
- Tarihleri ve sayıları doğru biçimlendirin

### Yapılmaması Gerekenler ❌ {#donts-}

- Çevrilmiş string'leri birleştirmeyin
- Metin uzunluğu hakkında varsayımda bulunmayın (metnin uzayabileceğini hesaba katarak tasarlayın)
- Gerekiyorsa RTL desteğini unutmayın
- Tarih/sayı formatlarını hardcode etmeyin

## İlgili Sayfalar {#related}

- [Configuration](/docs/getting-started/configuration)
- [useTranslator Hook'u](#usetranslator-hook)
