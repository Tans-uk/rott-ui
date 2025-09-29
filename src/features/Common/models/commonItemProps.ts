import {type ReactNode} from 'react'

import {type CommonUiProps, type Variant} from '../../../models'
import {type IconProps, type IconKeys} from '../../Icon'
import {type LabelProps} from '../../Label'

export interface CommonItemProps extends CommonUiProps {
  testID?: string
  index?: number
  width?: number | string
  height?: number | string
  backgroundColor?: Variant

  leftIcon?: IconKeys | IconProps | ReactNode
  rightIcon?: IconKeys | IconProps | ReactNode

  title: string | (LabelProps & {skeleton?: boolean}) | ReactNode
  subTitle?: string | (LabelProps & {skeleton?: boolean}) | ReactNode
  description?: string | LabelProps | ReactNode

  showSelected?: boolean
  selectedPosition?: string | 'left' | 'right'
  selectionDisabled?: boolean
  selectedIconType?: 'check' | 'radio'
  selected?: boolean
  favorite?: boolean
  onPress?: (value?: any) => Promise<void> | void | undefined
  value?: any
}
