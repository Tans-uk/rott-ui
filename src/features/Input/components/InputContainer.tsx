import React, {FC, PropsWithChildren} from 'react'

import {themeConfig} from '../../../providers'
import {CommonItem} from '../../Common'
import {BaseInputProps} from '../models'

interface InputContainerProps extends PropsWithChildren, BaseInputProps {}

export const InputContainer: FC<InputContainerProps> = ({
  children,
  size,
  leftIcon,
  theme,
  rightIcon,
  backgroundColor,
}) => {
  return (
    <CommonItem
      size={size}
      height={56}
      paddingHorizontal={16}
      justifyContentCenter
      leftIcon={leftIcon}
      title={children}
      backgroundColor={
        backgroundColor ??
        (theme === 'light' ? themeConfig.colors.white : themeConfig.colors['grey-800'])
      }
      rightIcon={rightIcon}
    />
  )
}
