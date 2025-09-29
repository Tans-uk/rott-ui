import type {TextInputProps} from 'react-native'

import {type CommonUiProps, type Theme, type Variant} from '../../../models'
import {IconProps} from '../../Icon'
import {InputLabelProps} from './inputLabelProps.interface'
import {InputType} from './inputType.type'

/** Tüm input tiplerinde ortak olarak kullanılan propertylerdir. */
export interface BaseInputProps extends CommonUiProps, TextInputProps {
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
  leftIcon?: IconProps
  rightIcon?: IconProps
}
