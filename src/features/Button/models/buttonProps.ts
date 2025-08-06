import {type PropsWithChildren} from 'react'

import {type TouchableOpacityProps} from 'react-native'

import {ThemeConfig, type CommonUiProps, type Size} from '../../../models'
import {type ButtonIconProps} from './buttonIconProps'
import {type ButtonImageProps} from './buttonImageProps'

export interface ButtonProps<TTheme extends ThemeConfig>
  extends TouchableOpacityProps,
    Omit<CommonUiProps<TTheme>, 'size'>,
    PropsWithChildren {
  color?: string
  isLoading?: boolean
  loadingText?: string
  backgroundColor?: string
  size?:
    | Size
    | {
        width?: Omit<Size, 'xl' | 'xxl'> | number
        height?: Omit<Size, 'xl' | 'xxl'> | number
      }

  leftImage?: ButtonImageProps<TTheme>
  rightImage?: ButtonImageProps<TTheme>
  leftIcon?: ButtonIconProps<TTheme>
  rightIcon?: ButtonIconProps<TTheme>

  height?: Size
  width?: Size
  borderWidth?: number
  borderRadius?: number
  borderColor?: string

  circle?: boolean
  text?: string
}
