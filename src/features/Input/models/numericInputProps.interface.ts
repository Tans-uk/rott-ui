import {ThemeConfig} from '../../../models'
import type {BaseInputProps} from './baseInputProps.interface'

export interface NumericInputProps<TTheme extends ThemeConfig> extends BaseInputProps<TTheme> {
  type?: 'numeric'
}
