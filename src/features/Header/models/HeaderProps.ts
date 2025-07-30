import {type PropsWithChildren} from 'react'

import {type ViewProps} from 'react-native'

import {type CommonUiProps} from '../../../models'
import type {ImageTypes} from '../../Image/models'
import type {LabelProps} from '../../Label/models'
import type {HeaderIconProps} from './HeaderIconProps'

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
