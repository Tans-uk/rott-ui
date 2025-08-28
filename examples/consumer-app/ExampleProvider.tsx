import { RottProvider } from '@tansuk/rott-ui';
import React, { FC, PropsWithChildren } from 'react';

export const ExampleProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <RottProvider
      config={{
        options: {
          language: { name: 'en-US' },
        },
      }}
    >
      {children}
    </RottProvider>
  );
};
