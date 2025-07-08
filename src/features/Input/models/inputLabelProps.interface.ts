import type {InputLabelIconProps} from './inputLabelIconProps.interface'

import type {FontFamily} from '@features/Label'
import type {Size, Theme, Variant} from '@models'

export interface InputLabelProps {
  text: string
  variant?: Variant
  description?: string
  size?: Size
  descriptionSize?: Size
  descriptionVariant?: Variant
  theme?: Theme
  fontFamily?: FontFamily
  icon?: InputLabelIconProps
}
