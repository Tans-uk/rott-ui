import type {Size, Theme, Variant} from '../../../models'
import type {FontFamily} from '../../Label'
import type {InputLabelIconProps} from './inputLabelIconProps.interface'

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
