import React, {memo, type FC, type PropsWithChildren} from 'react'

import type {Size, Theme} from '../../../models'
import {themeConfig} from '../../../providers'
import {Item} from '../../Item'

interface FormContainerProps extends PropsWithChildren {
  hasError?: boolean
  theme?: Theme
  marginBottom?: number
  marginTop?: number
  noPadding?: boolean
  size?: Size
}

export const FormContainer: FC<FormContainerProps> = memo(
  ({hasError, children, theme = 'light', marginBottom, marginTop, noPadding, size = 'full'}) => {
    return (
      <Item
        overflowHidden
        backgroundColor={
          theme === 'light' ? themeConfig.colors.white : themeConfig.colors['grey-800']
        }
        size={size}
        borderRadius={8}
        paddingTop={noPadding ? 0 : 4}
        paddingBottom={hasError ? 0 : noPadding ? 0 : 4}
        marginBottom={marginBottom}
        marginTop={marginTop}>
        {children}
      </Item>
    )
  }
)
