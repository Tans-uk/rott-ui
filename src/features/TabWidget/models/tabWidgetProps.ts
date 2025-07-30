import type {JSX} from 'react'

import {type CommonUiProps} from '../../../models'

export interface TabWidgetProps extends CommonUiProps {
  testID?: string
  titles: string[]
  tabs?: JSX.Element[]
  defaultIndex?: number
  onTabChange?: (index: number) => void
  swipeEnabled?: boolean
  backgroundColor?: string
  disabled?: boolean
}
