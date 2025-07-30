import {type PropsWithChildren} from 'react'

import {type TouchableOpacityProps} from 'react-native'

import {type CommonUiProps, type Size, type Variant} from '../../../models'
import {type ButtonIconProps} from './buttonIconProps'
import {type ButtonImageProps} from './buttonImageProps'

export interface ButtonProps
  extends TouchableOpacityProps,
    Omit<CommonUiProps, 'size'>,
    PropsWithChildren {
  color?: Variant
  isLoading?: boolean
  loadingText?: string
  backgroundColor?: string
  size?:
    | Size
    | {
        width?: Omit<Size, 'xl' | 'xxl'> | number
        height?: Omit<Size, 'xl' | 'xxl'> | number
      }

  leftImage?: ButtonImageProps
  rightImage?: ButtonImageProps
  leftIcon?: ButtonIconProps
  rightIcon?: ButtonIconProps

  height?: Size
  width?: Size
  borderWidth?: number
  borderRadius?: number
  borderColor?: string

  circle?: boolean
  text?: string
}
