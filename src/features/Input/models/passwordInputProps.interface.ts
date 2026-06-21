import type {IconProps} from '../../Icon'
import type {BaseInputProps} from './baseInputProps.interface'

export interface PasswordInputProps extends BaseInputProps {
  type?: 'password'
  /** When true, restrict input to digits and use a numeric keyboard (PIN-style). Default: false. */
  numericOnly?: boolean
  /** Optional leading icon rendered inside the field. */
  icon?: IconProps
}
