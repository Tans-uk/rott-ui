import {memo, useContext, type FC, type PropsWithChildren} from 'react'

import {RottUiContext} from '../../../contexts'
import type {Theme} from '../../../models'
import {Item} from '../../Item'

interface FormContainerProps extends PropsWithChildren {
  hasError?: boolean
  theme?: Theme
  marginBottom?: number
  marginTop?: number
  noPadding?: boolean
}

export const FormContainer: FC<FormContainerProps> = memo(
  ({hasError, children, theme = 'light', marginBottom, marginTop, noPadding}) => {
    const {colors} = useContext(RottUiContext)

    return (
      <Item
        overflowHidden
        backgroundColor={theme === 'light' ? colors.white : colors['grey-800']}
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
