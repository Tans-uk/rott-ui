import {type GestureResponderEvent} from 'react-native'

import {ThemeConfig} from '../../../models'
import type {IconProps} from '../../Icon/models'

export interface HeaderIconProps extends Omit<IconProps<ThemeConfig>, 'width' | 'height'> {
  width?: number
  height?: number

  onPress?: (event: GestureResponderEvent) => void
}
