import {ThemeConfig} from '../../../models'
import {IconProps} from '../../Icon'
import type {BaseInputProps} from './baseInputProps.interface'
import type {InputKeyboardType} from './inputKeyboardType.type'

export interface DefaultInputProps<TTheme extends ThemeConfig> extends BaseInputProps<TTheme> {
  type?: 'default'
  keyboard?: InputKeyboardType
  icon?: IconProps<TTheme>
}
