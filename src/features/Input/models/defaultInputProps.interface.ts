import type {BaseInputProps} from './baseInputProps.interface'
import type {InputKeyboardType} from './inputKeyboardType.type'

import type {IconProps} from '@features/Icon'

export interface DefaultInputProps extends BaseInputProps {
  type?: 'default'
  keyboard?: InputKeyboardType
  icon?: IconProps
}
