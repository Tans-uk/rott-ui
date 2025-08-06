import {ThemeConfig} from '../../../models'
import type {BaseInputProps} from './baseInputProps.interface'

export interface PinPasswordInputProps<TTheme extends ThemeConfig> extends BaseInputProps<TTheme> {
  type?: 'pinPassword'
}
