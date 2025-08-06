import {ThemeConfig} from '../../../models'
import type {IconProps} from '../../Icon'

export interface InputLabelIconProps<TTheme extends ThemeConfig> extends IconProps<TTheme> {
  onPress?: () => void
}
