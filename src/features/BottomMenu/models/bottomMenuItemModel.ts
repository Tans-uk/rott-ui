import type {GestureResponderEvent, StyleProp, ViewStyle} from 'react-native'

import {ThemeConfig} from '../../../models'
import type {IconProps} from '../../Icon'
import type {ImageProps} from '../../Image'

export interface BottomMenuItemModel<TTheme extends ThemeConfig> {
  testID?: string
  icon?: IconProps<TTheme>
  image?: ImageProps<TTheme>
  title?: string
  containerStyle?: StyleProp<ViewStyle>
  onPress?: (event: GestureResponderEvent) => void
  url?: string
  phone?: string
}
