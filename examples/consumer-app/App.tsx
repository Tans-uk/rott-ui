/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';

import { RottProvider } from '@tansuk/rott-ui';
import { LanguageStateProvider, useLanguageState } from './contexts';
import { I18nProvider } from './I18nProvider';
// import EntryScreen from './src/features/auth/components/EntryScreen';
import { ButtonContractScreen } from './src/features/button-contract';

function AppContent() {
  const { selectedLanguage } = useLanguageState();

  return (
    <RottProvider
      config={{
        options: {
          language: selectedLanguage,
          hasNotch: false,
          hasDynamicIsland: false,
        },
      }}
    >
      <I18nProvider>
        {/* Visual check for issues #8 / #9. Swap back to <EntryScreen /> when done. */}
        <ButtonContractScreen />
      </I18nProvider>
    </RottProvider>
  );
}

function App() {
  return (
    <LanguageStateProvider>
      <AppContent />
    </LanguageStateProvider>
  );
}

export default App;
