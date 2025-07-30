import {IconProps} from '../../Icon'
import type {BaseInputProps} from './baseInputProps.interface'
import type {InputKeyboardType} from './inputKeyboardType.type'

export interface DefaultInputProps extends BaseInputProps {
  type?: 'default'
  keyboard?: InputKeyboardType
  icon?: IconProps
}
