import type {JSX} from 'react'

import {ThemeConfig, type CommonUiProps} from '../../../models'

export interface TabWidgetProps<TTheme extends ThemeConfig> extends CommonUiProps<TTheme> {
  testID?: string
  titles: string[]
  tabs?: JSX.Element[]
  defaultIndex?: number
  onTabChange?: (index: number) => void
  swipeEnabled?: boolean
  backgroundColor?: string
  disabled?: boolean
}
