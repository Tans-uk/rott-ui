import type {TextInputProps} from 'react-native'

import {ThemeConfig, type CommonUiProps, type Theme} from '../../../models'
import {InputLabelProps} from './inputLabelProps.interface'
import {InputType} from './inputType.type'

/** Tüm input tiplerinde ortak olarak kullanılan propertylerdir. */
export interface BaseInputProps<TTheme extends ThemeConfig>
  extends CommonUiProps<TTheme>,
    TextInputProps {
  name: string
  type?: InputType
  label?: string | InputLabelProps<TTheme>
  disabled?: boolean
  isLoading?: boolean
  errorMessage?: string
  theme?: Theme
  renderSeparator?: boolean
  border?: {
    width?: number
    variant?: keyof TTheme['colors']
    radius?: number
  }
  touched?: Nullable<boolean>
}
