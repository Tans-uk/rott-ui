import type {GestureResponderEvent, StyleProp, ViewStyle} from 'react-native'

import type {IconProps} from '@features/Icon'
import type {ImageProps} from '@features/Image'

export interface BottomMenuItemModel {
  testID?: string
  icon?: IconProps
  image?: ImageProps
  title?: string
  containerStyle?: StyleProp<ViewStyle>
  onPress?: (event: GestureResponderEvent) => void
  url?: string
  phone?: string
}
