import {type CurrencyType} from './currencyType.type'

import type {BaseInputProps} from '@features/Input'

export interface AmountInputProps extends BaseInputProps {
  type?: 'amount'
  currencyType?: Nullable<CurrencyType>
}
