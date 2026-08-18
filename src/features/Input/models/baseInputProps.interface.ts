import type {TextInputProps} from 'react-native'

import {type CommonUiProps, type Theme, type Variant} from '../../../models'
import {InputIconSlotsProps} from './inputIconSlotsProps.interface'
import {InputLabelProps} from './inputLabelProps.interface'
import {InputType} from './inputType.type'

/** Properties shared by every input type. */
export interface BaseInputProps extends CommonUiProps, TextInputProps, InputIconSlotsProps {
  name: string
  type?: InputType
  label?: string | InputLabelProps
  disabled?: boolean
  isLoading?: boolean
  errorMessage?: string
  theme?: Theme
  renderSeparator?: boolean
  border?: {
    width?: number
    variant?: Variant
    radius?: number
  }
  touched?: Nullable<boolean>
}
