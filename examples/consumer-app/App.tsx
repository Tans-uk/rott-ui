/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';

import { RottProvider } from '@tansuk/rott-ui';
import { LanguageStateProvider, useLanguageState } from './src/contexts';
import { I18nProvider } from './I18nProvider';
import EntryScreen from './src/features/auth/components/EntryScreen';

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
        <EntryScreen />
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
