import {Size, ThemeConfig} from '../../../models'
import type {IconProps} from '../../Icon'
import type {LabelProps} from '../../Label'

export interface AlertModel<TTheme extends ThemeConfig> {
  text: string | LabelProps<TTheme>
  size: Size
  variant: keyof TTheme['colors']
  leftIcon?: IconProps<TTheme>
  rightIcon?: IconProps<TTheme>
}
