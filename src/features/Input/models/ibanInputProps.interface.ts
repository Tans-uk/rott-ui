import {ThemeConfig} from '../../../models'
import {IconProps} from '../../Icon'
import type {BaseInputProps} from './baseInputProps.interface'

export interface IbanInputProps<TTheme extends ThemeConfig> extends BaseInputProps<TTheme> {
  type?: 'iban'
  rightIcon?: IconProps<TTheme>
}
