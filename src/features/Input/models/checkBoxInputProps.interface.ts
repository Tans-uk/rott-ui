import type {ReactNode} from 'react'

import type {NativeSyntheticEvent, TargetedEvent} from 'react-native'

import type {BaseInputProps} from './baseInputProps.interface'

export interface CheckBoxInputProps extends BaseInputProps {
  type?: 'checkbox'
  description?: ReactNode
  checked?: boolean
  onCheckChange?: (checked: boolean) => void
  onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void
  onFocus?: (event: NativeSyntheticEvent<TargetedEvent>) => void
}
