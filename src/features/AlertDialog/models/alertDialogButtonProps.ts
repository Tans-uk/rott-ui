import type {TranslationLanguageTypes} from '../../../libs'
import type {Variant} from '../../../models'

export interface AlertDialogButtonProps {
  testID?: string
  variant?: Variant
  text: TranslationLanguageTypes
  onPress?: () => void
}
