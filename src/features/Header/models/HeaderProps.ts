import {type PropsWithChildren} from 'react'

import {type ViewProps} from 'react-native'

import type {HeaderIconProps} from './HeaderIconProps'

import type {ImageTypes} from '@features/Image'
import type {LabelProps} from '@features/Label'
import {type CommonUiProps} from '@models'

export interface HeaderProps extends ViewProps, CommonUiProps, PropsWithChildren {
  back?: boolean
  title?: string | LabelProps
  subTitle?: string | LabelProps
  logo?: ImageTypes
  leftElement?: React.ReactElement<any> | React.ReactNode
  leftIcon?: HeaderIconProps & {rounded?: boolean}
  rightElement?: React.ReactElement<any> | React.ReactNode
  rightIcon?: HeaderIconProps & {rounded?: boolean}
  leftContainer?: CommonUiProps
  rightContainer?: CommonUiProps
  middleContainer?: CommonUiProps
  defaultBackgroundColor?: boolean
  paddingHorizontal?: number
  paddingVertical?: number
  goBackFunction?: () => void
  preventGoBack?: boolean
}
