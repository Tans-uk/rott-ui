export interface SelectProps {
  code?: Nullable<number> | undefined
  label: string
  value: string
  description?: string
  selected?: boolean
  isLoading?: boolean
  disabled?: boolean
}
