import type {BaseInputProps} from './baseInputProps.interface'
import type {InputLabelProps} from './inputLabelProps.interface'
import type {InputType} from './inputType.type'

export interface ToggleInputProps extends BaseInputProps {
  type?: 'toggle'
  disabledInput?: boolean
  checked?: boolean
  onToggle: (checked: boolean) => void
  inputLabel?: string | InputLabelProps
  inputType?: Extract<InputType, 'default' | 'amount'>
  topSeparator?: boolean
  middleSeparator?: boolean
  bottomSeparator?: boolean
}
