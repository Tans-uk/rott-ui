import {ThemeConfig} from '../../../models'

export interface ResultActionModel<TTheme extends ThemeConfig> {
  title: string
  name?: string
  action: () => void
  variant?: keyof TTheme['colors']
  testID?: string
}
