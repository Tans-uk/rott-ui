import {type GestureResponderEvent} from 'react-native'

import type {IconProps} from '@features/Icon'

export interface HeaderIconProps extends Omit<IconProps, 'width' | 'height'> {
  width?: number
  height?: number

  onPress?: (event: GestureResponderEvent) => void
}
