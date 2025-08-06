import {ThemeConfig} from '../../../models'

export interface NotificationModel<TTheme extends ThemeConfig> {
  title: string
  description?: string
  variant: keyof TTheme['colors']
}
