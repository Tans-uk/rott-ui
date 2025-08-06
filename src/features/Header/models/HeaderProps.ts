import {type PropsWithChildren} from 'react'

import {type ViewProps} from 'react-native'

import {ThemeConfig, type CommonUiProps} from '../../../models'
import type {LabelProps} from '../../Label/models'
import type {HeaderIconProps} from './HeaderIconProps'

export interface HeaderProps<TTheme extends ThemeConfig>
  extends ViewProps,
    CommonUiProps<TTheme>,
    PropsWithChildren {
  back?: boolean
  title?: string | LabelProps<TTheme>
  subTitle?: string | LabelProps<TTheme>
  logo?: keyof TTheme['images']
  leftElement?: React.ReactElement<any> | React.ReactNode
  leftIcon?: HeaderIconProps & {rounded?: boolean}
  rightElement?: React.ReactElement<any> | React.ReactNode
  rightIcon?: HeaderIconProps & {rounded?: boolean}
  leftContainer?: CommonUiProps<TTheme>
  rightContainer?: CommonUiProps<TTheme>
  middleContainer?: CommonUiProps<TTheme>
  defaultBackgroundColor?: boolean
  paddingHorizontal?: number
  paddingVertical?: number
  goBackFunction?: () => void
  preventGoBack?: boolean
}
