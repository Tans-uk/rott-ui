import {ThemeConfig} from '../../../../../models'
import {IconProps} from '../../../../Icon'
import type {BaseInputProps} from '../../../models'
import type {DataModel} from './dataModel.interface'

import type {DatePickerProps} from 'react-native-date-picker'

export interface DateInputProps<TTheme extends ThemeConfig>
  extends BaseInputProps<TTheme>,
    Omit<DatePickerProps, 'style' | 'date' | 'mode' | 'theme'> {
  type?: 'date'
  mode?: 'date' | 'time' | 'datetime' | 'modal-date' | 'modal-time' | 'modal-datetime'
  data?: DataModel[]
  viewType?: 'input' | 'button'
  allowClear?: boolean
  date?: Date
  icon?: IconProps<TTheme>
}
