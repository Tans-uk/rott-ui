import type {
  AmountInputProps,
  CheckBoxInputProps,
  CreditCardInputProps,
  CVCInputProps,
  DateInputProps,
  DefaultInputProps,
  EmailInputProps,
  ExpireDateInputProps,
  IbanInputProps,
  InputType,
  NumericInputProps,
  PasswordInputProps,
  PhoneInputProps,
  PinPasswordInputProps,
  PlateNumberInputProps,
  SelectInputProps,
  StatementInputProps,
  ToggleInputProps,
} from '@features'

export type InputProps = {type: InputType} & (
  | AmountInputProps
  | CVCInputProps
  | CreditCardInputProps
  | DateInputProps
  | DefaultInputProps
  | EmailInputProps
  | ExpireDateInputProps
  | IbanInputProps
  | NumericInputProps
  | PasswordInputProps
  | PhoneInputProps
  | PinPasswordInputProps
  | PlateNumberInputProps
  | CheckBoxInputProps
  | SelectInputProps
  | StatementInputProps
  | ToggleInputProps
)
