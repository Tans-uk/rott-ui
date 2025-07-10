import type {BaseInputProps} from './baseInputProps.interface'

import {IconProps} from '@features/Icon'

export interface IbanInputProps extends BaseInputProps {
  type?: 'iban'
  rightIcon?: IconProps
}
