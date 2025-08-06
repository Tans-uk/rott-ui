import {ThemeConfig} from '../../../models'
import type {BaseInputProps} from './baseInputProps.interface'

export interface PlateNumberInputProps<TTheme extends ThemeConfig> extends BaseInputProps<TTheme> {
  type?: 'plateNumber'
}
