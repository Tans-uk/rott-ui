import {type ReactNode} from 'react'

import {type CommonUiProps, type Variant} from '../../../models'
import {type IconProps, type IconTypes} from '../../Icon'
import {type LabelProps} from '../../Label'

export interface CommonItemProps extends CommonUiProps {
  testID?: string
  index?: number
  width?: number
  height?: number
  backgroundColor?: Variant

  leftIcon?: IconTypes | IconProps | ReactNode
  rightIcon?: IconTypes | IconProps | ReactNode

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
