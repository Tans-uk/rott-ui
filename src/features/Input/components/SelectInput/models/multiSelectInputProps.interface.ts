import {ThemeConfig} from '../../../../../models'
import type {CommonSelectInputProps} from './commonSelectInputProps.interface'

export interface MultiSelectInputProps extends CommonSelectInputProps<ThemeConfig> {
  type?: 'multiSelect'
  onSelectChange?: (value: string[], selectedItem?: unknown[]) => void
  value?: string[]
  defaultValue?: string[]
}
