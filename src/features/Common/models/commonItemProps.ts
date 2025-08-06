import {type ReactNode} from 'react'

import {ThemeConfig, type CommonUiProps} from '../../../models'
import {type IconProps} from '../../Icon'
import {type LabelProps} from '../../Label'

export interface CommonItemProps<TTheme extends ThemeConfig> extends CommonUiProps<TTheme> {
  testID?: string
  index?: number
  width?: number
  height?: number
  backgroundColor?: string

  leftIcon?: IconProps<TTheme> | ReactNode
  rightIcon?: IconProps<TTheme> | ReactNode

  title: string | (LabelProps<TTheme> & {skeleton?: boolean}) | ReactNode
  subTitle?: string | (LabelProps<TTheme> & {skeleton?: boolean}) | ReactNode
  description?: string | LabelProps<TTheme> | ReactNode

  showSelected?: boolean
  selectedPosition?: string | 'left' | 'right'
  selectionDisabled?: boolean
  selectedIconType?: 'check' | 'radio'
  selected?: boolean
  favorite?: boolean
  onPress?: (value?: any) => Promise<void> | void | undefined
  value?: any
}
