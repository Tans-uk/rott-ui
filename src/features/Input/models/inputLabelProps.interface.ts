import type {Size, Theme, Variant} from '../../../models'
import type {FontFamily} from '../../Label'
import type {InputLabelIconProps} from './inputLabelIconProps.interface'

export interface InputLabelProps {
  text: string
  variant?: Variant
  description?: string
  size?: Exclude<Size, 'full'>
  descriptionSize?: Exclude<Size, 'full'>
  descriptionVariant?: Variant
  theme?: Theme
  fontFamily?: FontFamily
  icon?: InputLabelIconProps
  disabled?: boolean
}
