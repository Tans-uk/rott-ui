import {ThemeConfig} from '../../../models'
import type {BaseInputProps} from './baseInputProps.interface'

export interface EmailInputProps<TTheme extends ThemeConfig> extends BaseInputProps<TTheme> {
  type?: 'email'
}
