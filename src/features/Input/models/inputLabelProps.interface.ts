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
  /** Shows the text and description in upper case. Defaults to `true`. */
  uppercase?: boolean
  /** Space between the label and its field. Defaults to `0`. */
  gap?: number
  /** Space above the label. Defaults to `16`. */
  marginTop?: number
}
