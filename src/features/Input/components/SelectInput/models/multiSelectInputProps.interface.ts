import type {CommonSelectInputProps} from './commonSelectInputProps.interface'

export interface MultiSelectInputProps extends CommonSelectInputProps {
  type?: 'multiSelect'
  onSelectChange?: (value: string[], selectedItem?: unknown[]) => void
  value?: string[]
  defaultValue?: string[]
}
