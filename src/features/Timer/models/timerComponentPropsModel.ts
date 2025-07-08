import type {ViewProps} from 'react-native'

import {type CommonUiProps} from '@models'

export interface TimerProps extends ViewProps, CommonUiProps {
  time: number
  color?: string
}
