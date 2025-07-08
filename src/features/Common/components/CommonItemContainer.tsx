import {memo, type FC, type PropsWithChildren} from 'react'

import {Item} from '@features/Item'

interface CommonItemContainerProps extends PropsWithChildren {
  width?: number
  height?: number
}

export const CommonItemContainer: FC<CommonItemContainerProps> = memo(
  ({children, width, height}) => {
    return (
      <Item width={width} height={height}>
        {children}
      </Item>
    )
  }
)
