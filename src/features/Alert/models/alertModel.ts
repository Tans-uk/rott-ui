import type {Size, Variant} from '../../../models'
import type {IconProps} from '../../Icon'
import type {LabelProps} from '../../Label'

export interface AlertModel {
  text: string | LabelProps
  size: Size
  variant: Variant
  leftIcon?: IconProps
  rightIcon?: IconProps
}
