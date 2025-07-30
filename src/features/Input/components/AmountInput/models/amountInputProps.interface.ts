import type {BaseInputProps} from '../../../models'
import {type CurrencyType} from './currencyType.type'

export interface AmountInputProps extends BaseInputProps {
  type?: 'amount'
  currencyType?: Nullable<CurrencyType>
}
