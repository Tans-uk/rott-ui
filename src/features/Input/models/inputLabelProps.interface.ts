import type {Size, Theme, ThemeConfig} from '../../../models'
import type {InputLabelIconProps} from './inputLabelIconProps.interface'

export interface InputLabelProps<TTheme extends ThemeConfig> {
  text: string
  variant?: keyof TTheme['colors']
  description?: string
  size?: Size
  descriptionSize?: Size
  descriptionVariant?: keyof TTheme['colors']
  theme?: Theme
  fontFamily?: keyof TTheme['fontFamilies']
  icon?: InputLabelIconProps<TTheme>
}
