import {ThemeConfig} from '../../../models'
import {type IconProps} from '../../Icon/models'

export interface ButtonIconProps<TTheme extends ThemeConfig> extends IconProps<TTheme> {
  absolute?: boolean
}
