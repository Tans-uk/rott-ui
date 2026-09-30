---
sidebar_position: 5
title: Test
description: Rott UI component'lerini test etme
---

# Test

Rott UI ile geliştirilmiş component'leri Jest ve React Native Testing Library kullanarak nasıl test edeceğinizi öğrenin.

## Kurulum {#setup}

Rott UI component'leri React Native Testing Library ile sorunsuz çalışır.

### Dependency'leri Kurma {#install-dependencies}

```bash npm2yarn
npm install --save-dev @testing-library/react-native @testing-library/jest-native
```

### Jest Config'i {#jest-configuration}

```js title="jest.config.js"
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@tansuk/rott-ui)/)',
  ],
};
```

## Component'leri Test Etme {#testing-components}

### Button Testleri {#button-tests}

```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@tansuk/rott-ui';

describe('Button', () => {
  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button variant="primary" onPress={onPress}>
        Click Me
      </Button>
    );

    fireEvent.press(getByText('Click Me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button variant="primary" disabled onPress={onPress}>
        Click Me
      </Button>
    );

    fireEvent.press(getByText('Click Me'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows loading state', () => {
    const { getByText } = render(
      <Button variant="primary" isLoading loadingText="Loading...">
        Submit
      </Button>
    );

    expect(getByText('Loading...')).toBeTruthy();
  });
});
```

### Input Testleri {#input-tests}

```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '@tansuk/rott-ui';

describe('Input', () => {
  it('updates value on text change', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        name="email"
        type="email"
        placeholder="Email"
        onChangeText={onChangeText}
      />
    );

    const input = getByPlaceholderText('Email');
    fireEvent.changeText(input, 'test@example.com');
    
    expect(onChangeText).toHaveBeenCalledWith('test@example.com');
  });

  it('shows error message when provided', () => {
    const { getByText } = render(
      <Input
        name="email"
        type="email"
        errorMessage="Invalid email"
        touched
      />
    );

    expect(getByText('Invalid email')).toBeTruthy();
  });
});
```

### Form Testleri {#form-tests}

```tsx
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid').required('Required'),
  password: Yup.string().min(8, 'Too short').required('Required'),
});

describe('LoginForm', () => {
  it('validates form on submit', async () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleSubmit, errors }) => (
          <>
            <Input
              name="email"
              placeholder="Email"
              onChangeText={handleChange('email')}
            />
            <Input
              name="password"
              placeholder="Password"
              onChangeText={handleChange('password')}
            />
            <Button onPress={handleSubmit}>Submit</Button>
          </>
        )}
      </Formik>
    );

    fireEvent.press(getByText('Submit'));

    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
```

## Mock'lama {#mocking}

### RottProvider'ı Mock'lama {#mock-rottprovider}

```tsx
import { RottProvider } from '@tansuk/rott-ui';

const wrapper = ({ children }) => (
  <RottProvider>{children}</RottProvider>
);

const { getByText } = render(<MyComponent />, { wrapper });
```

### Navigation'ı Mock'lama {#mock-navigation}

```tsx
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

<MyScreen navigation={mockNavigation} />
```

## Snapshot Testi {#snapshot-testing}

```tsx
import { render } from '@testing-library/react-native';

it('matches snapshot', () => {
  const { toJSON } = render(
    <Button variant="primary">Click Me</Button>
  );
  
  expect(toJSON()).toMatchSnapshot();
});
```

## En İyi Uygulamalar {#best-practices}

### Yapılması Gerekenler ✅ {#dos-}

- Implementation'ı değil, kullanıcı etkileşimlerini test edin
- Karmaşık query'ler için data-testid kullanın
- Hata state'lerini ve edge case'leri test edin
- Harici dependency'leri mock'layın
- Snapshot testlerini ölçülü kullanın

### Yapılmaması Gerekenler ❌ {#donts-}

- Implementation detaylarını test etmeyin
- Erişilebilirliği test etmeyi unutmayın
- Hata senaryolarını atlamayın
- Snapshot'lara fazla güvenmeyin

## İlgili Sayfalar {#related}

- [Erişilebilirlik Rehberi](/docs/guides/accessibility)
- [Formlar Rehberi](/docs/guides/forms)
