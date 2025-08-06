import {type FC} from 'react'

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type TouchableOpacityProps,
} from 'react-native'

import {ThemeConfig, type CommonUiProps} from '../../models'
import {useTabStyle} from './styles'

interface TabProps<TTheme extends ThemeConfig>
  extends TouchableOpacityProps,
    CommonUiProps<TTheme> {
  title?: string
  isSelected?: boolean
  onPress?: (event: GestureResponderEvent) => void
  onLayout?: (event: LayoutChangeEvent) => void
}

export const Tab: FC<TabProps<ThemeConfig>> = ({
  title,
  isSelected,
  onPress,
  onLayout,
  ...props
}) => {
  const {container, textStyle} = useTabStyle(props)
  return (
    <TouchableOpacity
      style={container}
      onPress={onPress}
      onLayout={onLayout}
      aria-selected={isSelected}
      {...props}>
      <Text style={StyleSheet.flatten([textStyle])}>{title}</Text>
    </TouchableOpacity>
  )
}
