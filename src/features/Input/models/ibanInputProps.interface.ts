import {IconProps} from '../../Icon'
import type {BaseInputProps} from './baseInputProps.interface'

export interface IbanInputProps extends BaseInputProps {
  type?: 'iban'
  rightIcon?: IconProps
}
