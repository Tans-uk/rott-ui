import type {ViewProps} from 'react-native'

import {ThemeConfig, type CommonUiProps} from '../../../models'

export interface TimerProps<TTheme extends ThemeConfig> extends ViewProps, CommonUiProps<TTheme> {
  time: number
  color?: string
}
