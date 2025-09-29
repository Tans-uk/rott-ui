import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Language {
  name: string;
}

interface LanguageStateContextType {
  selectedLanguage: Language;
  setLanguage: (language: Language) => void;
}

const LanguageStateContext = createContext<
  LanguageStateContextType | undefined
>(undefined);

interface LanguageStateProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

export const LanguageStateProvider: React.FC<LanguageStateProviderProps> = ({
  children,
  initialLanguage = { name: 'en-US' },
}) => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>(initialLanguage);

  const setLanguage = (language: Language) => {
    setSelectedLanguage(language);
  };

  return (
    <LanguageStateContext.Provider value={{ selectedLanguage, setLanguage }}>
      {children}
    </LanguageStateContext.Provider>
  );
};

export const useLanguageState = (): LanguageStateContextType => {
  const context = useContext(LanguageStateContext);
  if (context === undefined) {
    throw new Error(
      'useLanguageState must be used within a LanguageStateProvider',
    );
  }
  return context;
};
