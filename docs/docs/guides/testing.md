---
sidebar_position: 5
title: Testing
description: Testing Rott UI components
---

# Testing

Learn how to test components built with Rott UI using Jest and React Native Testing Library.

## Setup

Rott UI components work seamlessly with React Native Testing Library.

### Install Dependencies

```bash npm2yarn
npm install --save-dev @testing-library/react-native @testing-library/jest-native
```

### Jest Configuration

```js title="jest.config.js"
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@tansuk/rott-ui)/)',
  ],
};
```

## Testing Components

### Button Tests

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

### Input Tests

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

### Form Tests

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

## Mocking

### Mock RottProvider

```tsx
import { RottProvider } from '@tansuk/rott-ui';

const wrapper = ({ children }) => (
  <RottProvider>{children}</RottProvider>
);

const { getByText } = render(<MyComponent />, { wrapper });
```

### Mock Navigation

```tsx
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

<MyScreen navigation={mockNavigation} />
```

## Snapshot Testing

```tsx
import { render } from '@testing-library/react-native';

it('matches snapshot', () => {
  const { toJSON } = render(
    <Button variant="primary">Click Me</Button>
  );
  
  expect(toJSON()).toMatchSnapshot();
});
```

## Best Practices

### Do's ✅

- Test user interactions, not implementation
- Use data-testid for complex queries
- Test error states and edge cases
- Mock external dependencies
- Use snapshot tests sparingly

### Don'ts ❌

- Don't test implementation details
- Don't forget to test accessibility
- Don't skip error scenarios
- Don't over-rely on snapshots

## Related

- [Accessibility Guide](/docs/guides/accessibility)
- [Forms Guide](/docs/guides/forms)
