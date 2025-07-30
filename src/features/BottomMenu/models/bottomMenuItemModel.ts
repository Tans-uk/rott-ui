import type {GestureResponderEvent, StyleProp, ViewStyle} from 'react-native'

import type {IconProps} from '../../Icon/models'
import type {ImageProps} from '../../Image/models'

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
