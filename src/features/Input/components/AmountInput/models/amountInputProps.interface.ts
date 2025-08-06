import {ThemeConfig} from '../../../../../models'
import type {BaseInputProps} from '../../../models'
import {type CurrencyType} from './currencyType.type'

export interface AmountInputProps<TTheme extends ThemeConfig> extends BaseInputProps<TTheme> {
  type?: 'amount'
  currencyType?: Nullable<CurrencyType>
}
