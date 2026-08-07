/**
 * Consumer-side contract tests for GitHub issues #8 and #9.
 *
 * These render Button through the library's public entry point (`@tansuk/rott-ui`),
 * the same specifier an app writes, rather than reaching into internal paths. They
 * exist because both issues were silent: the code type-checked, rendered, and warned
 * about nothing while producing the wrong style.
 *
 * @format
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { Button, RottProvider } from '@tansuk/rott-ui';

const renderInApp = (ui: React.ReactElement) =>
  render(
    <RottProvider
      config={{
        options: { language: { name: 'tr' }, hasNotch: false, hasDynamicIsland: false },
      }}
    >
      {ui}
    </RottProvider>,
  );

describe('Button contract — issue #8 (border props)', () => {
  it('applies borderWidth and borderColor on a non-outline variant', () => {
    const { getByTestId } = renderInApp(
      <Button
        testID="oauth-button"
        variant="white"
        borderWidth={1}
        borderColor="#747775"
      >
        Sign in with Google
      </Button>,
    );

    // Before the fix this was borderWidth: undefined / borderColor: 'white',
    // i.e. an invisible control on a light background.
    expect(getByTestId('oauth-button')).toHaveStyle({
      borderWidth: 1,
      borderColor: '#747775',
    });
  });

  it('keeps the outline variant border when no border props are passed', () => {
    const { getByTestId } = renderInApp(
      <Button testID="outline-button" variant="primary-outline">
        Outline
      </Button>,
    );

    expect(getByTestId('outline-button')).toHaveStyle({ borderWidth: 2 });
  });
});

describe('Button contract — issue #9 (size is container-relative)', () => {
  it('renders size="full" relative to the container, not a fixed width', () => {
    const { getByTestId } = renderInApp(
      <Button testID="full-button" size="full">
        Full
      </Button>,
    );

    // Before the fix this was a fixed 342 scaled to the device, which overflowed
    // any parent narrower than the reference device's content box.
    expect(getByTestId('full-button')).toHaveStyle({ width: '100%' });
  });

  it('gives xl and xxl the library-wide percentages instead of aliasing full', () => {
    const { getByTestId: getXl } = renderInApp(
      <Button testID="xl-button" size="xl">
        XL
      </Button>,
    );
    const { getByTestId: getXxl } = renderInApp(
      <Button testID="xxl-button" size="xxl">
        XXL
      </Button>,
    );

    // These match sizeToPercentage, which every other component already uses.
    expect(getXl('xl-button')).toHaveStyle({ width: '85%' });
    expect(getXxl('xxl-button')).toHaveStyle({ width: '92.5%' });
  });
});
