import type {DataModel} from './dataModel.interface'

import type {BaseInputProps, IconProps} from '@features'

import type {DatePickerProps} from 'react-native-date-picker'

export interface DateInputProps
  extends BaseInputProps,
    Omit<DatePickerProps, 'style' | 'date' | 'mode' | 'theme'> {
  type?: 'date'
  mode?: 'date' | 'time' | 'datetime' | 'modal-date' | 'modal-time' | 'modal-datetime'
  data?: DataModel[]
  viewType?: 'input' | 'button'
  allowClear?: boolean
  date?: Date
  icon?: IconProps
}
