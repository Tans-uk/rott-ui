import { ThemeConfig } from '../../../models'
import type {BaseInputProps} from './baseInputProps.interface'

export interface PasswordInputProps<TTheme extends ThemeConfig> extends BaseInputProps<TTheme> {
  type?: 'password'
}
