import {ThemeConfig} from '../../../models'
import {BaseInputProps} from './baseInputProps.interface'

export interface PhoneInputProps<TTheme extends ThemeConfig> extends BaseInputProps<TTheme> {
  type?: 'phone'
  selectContacts?: boolean
}
