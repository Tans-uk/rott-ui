import {ThemeConfig} from '../../../models'
import type {BaseInputProps} from './baseInputProps.interface'

export interface CVCInputProps<TTheme extends ThemeConfig> extends BaseInputProps<TTheme> {
  type?: 'cvc'
}
