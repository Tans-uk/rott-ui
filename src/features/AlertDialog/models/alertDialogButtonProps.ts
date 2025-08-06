import type {TranslationLanguageTypes} from '../../../libs'
import {ThemeConfig} from '../../../models'

export interface AlertDialogButtonProps<TTheme extends ThemeConfig> {
  testID?: string
  variant?: keyof TTheme['colors']
  text: TranslationLanguageTypes
  onPress?: () => void
}
