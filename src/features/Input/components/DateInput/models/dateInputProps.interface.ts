import {IconProps} from '../../../../Icon'
import type {BaseInputProps} from '../../../models'
import type {DataModel} from './dataModel.interface'

import type {DatePickerOptions} from '@react-native-community/datetimepicker'

export interface DateInputProps
  extends BaseInputProps,
    Omit<DatePickerOptions, 'value' | 'onChange'> {
  type?: 'date'
  onDateChange?: (date: Date) => void
  mode?: 'date' | 'time' | 'datetime' | 'modal-date' | 'modal-time' | 'modal-datetime'
  data?: DataModel[]
  viewType?: 'input' | 'button'
  allowClear?: boolean
  date?: Date
  icon?: IconProps
}
