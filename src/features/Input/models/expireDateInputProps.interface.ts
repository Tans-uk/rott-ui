import {ThemeConfig} from '../../../models'
import type {BaseInputProps} from './baseInputProps.interface'

export interface ExpireDateInputProps<TTheme extends ThemeConfig> extends BaseInputProps<TTheme> {
  type?: 'expireDate'
}
