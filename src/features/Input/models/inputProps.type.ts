import {ThemeConfig} from '../../../models'
import {AmountInputProps, DateInputProps, SelectInputProps} from '../components'
import {CheckBoxInputProps} from './checkBoxInputProps.interface'
import {CreditCardInputProps} from './creditCardInputProps.interface'
import {CVCInputProps} from './cvcInputProps.interface'
import {DefaultInputProps} from './defaultInputProps.interface'
import {EmailInputProps} from './emailInputProps.interface'
import {ExpireDateInputProps} from './expireDateInputProps.interface'
import {IbanInputProps} from './ibanInputProps.interface'
import {InputType} from './inputType.type'
import {NumericInputProps} from './numericInputProps.interface'
import {PasswordInputProps} from './passwordInputProps.interface'
import {PhoneInputProps} from './phoneInputProps.interface'
import {PinPasswordInputProps} from './pinPasswordInputProps.interface'
import {PlateNumberInputProps} from './plateNumberInputProps.interface'
import {StatementInputProps} from './statementInputProps.interface'
import {ToggleInputProps} from './toggleInputProps.interface'

export type InputProps<TTheme extends ThemeConfig> = {type: InputType} & (
  | AmountInputProps<TTheme>
  | CVCInputProps<TTheme>
  | CreditCardInputProps<TTheme>
  | DateInputProps<TTheme>
  | DefaultInputProps<TTheme>
  | EmailInputProps<TTheme>
  | ExpireDateInputProps<TTheme>
  | IbanInputProps<TTheme>
  | NumericInputProps<TTheme>
  | PasswordInputProps<TTheme>
  | PhoneInputProps<TTheme>
  | PinPasswordInputProps<TTheme>
  | PlateNumberInputProps<TTheme>
  | CheckBoxInputProps<TTheme>
  | SelectInputProps
  | StatementInputProps<TTheme>
  | ToggleInputProps<TTheme>
)
