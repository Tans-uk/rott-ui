import type {IconProps} from '@features/Icon'
import type {LabelProps} from '@features/Label'
import type {Size, Variant} from '@models'

export interface AlertModel {
  text: string | LabelProps
  size: Size
  variant: Variant
  leftIcon?: IconProps
  rightIcon?: IconProps
}
