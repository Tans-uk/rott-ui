import React, {memo, type FC, type PropsWithChildren} from 'react'

import {Size} from '../../../models'
import {Item} from '../../Item'

interface CommonItemContainerProps extends PropsWithChildren {
  width?: number | string
  height?: number | string
  size?: Size
}

export const CommonItemContainer: FC<CommonItemContainerProps> = memo(
  ({children, width, height, size}) => {
    return (
      <Item width={width} height={height} size={size}>
        {children}
      </Item>
    )
  }
)
