import type {BaseInputProps} from './baseInputProps.interface'

export interface PhoneInputProps extends BaseInputProps {
  type?: 'phone'
  selectContacts?: boolean
}
