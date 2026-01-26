---
sidebar_position: 4
title: Internationalization
description: Multi-language support with React Intl
---

# Internationalization

Rott UI includes built-in support for internationalization using React Intl.

## Setup

Rott UI automatically sets up React Intl through `RottProvider`.

### Set Language

```tsx
import { RottProvider } from '@tansuk/rott-ui';

<RottProvider
  config={{
    options: {
      language: 'en', // or 'tr'
    },
  }}
>
  <YourApp />
</RottProvider>
```

## Using Translations

### useTranslator Hook

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

### Direct useIntl

```tsx
import { useIntl } from 'react-intl';

function MyComponent() {
  const intl = useIntl();

  return (
    <Label text={intl.formatMessage({ id: 'welcome' })} />
  );
}
```

## Adding Custom Messages

### Create Message Files

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

### Load Messages

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

## Formatting

### Dates

```tsx
const intl = useIntl();

const formattedDate = intl.formatDate(new Date(), {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
```

### Numbers

```tsx
const formattedNumber = intl.formatNumber(1234.56, {
  style: 'currency',
  currency: 'USD',
});
```

### Pluralization

```tsx
const message = intl.formatMessage(
  { id: 'items.count' },
  { count: items.length }
);
```

## Language Switcher

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

## Best Practices

### Do's ✅

- Use message keys instead of hardcoded strings
- Organize messages by feature/screen
- Test all supported languages
- Handle pluralization properly
- Format dates and numbers correctly

### Don'ts ❌

- Don't concatenate translated strings
- Don't assume text length (design for expansion)
- Don't forget RTL support if needed
- Don't hardcode date/number formats

## Related

- [Configuration](/docs/getting-started/configuration)
- [useTranslator Hook]()
