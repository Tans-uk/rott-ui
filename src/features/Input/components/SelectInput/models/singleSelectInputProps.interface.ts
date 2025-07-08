import type {CommonSelectInputProps} from './commonSelectInputProps.interface'

export interface SingleSelectInputProps extends CommonSelectInputProps {
  type?: 'select'
  onSelectChange?: (value: string, selectedItem?: unknown) => void
  value?: string
  defaultValue?: string
}
