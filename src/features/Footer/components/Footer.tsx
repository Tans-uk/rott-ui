import type {FC, PropsWithChildren} from 'react'

import {Content} from '../../Content'
import React from 'react'

export const Footer: FC<PropsWithChildren> = ({children}) => {
  return (
    <Content useBottomInset minHeight={128} backgroundColor='red' paddingTop={24} gap={16}>
      {children}
    </Content>
  )
}
