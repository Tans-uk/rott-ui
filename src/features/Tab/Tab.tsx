import {type FC} from 'react'

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type TouchableOpacityProps,
} from 'react-native'

import {TabStyle} from './styles'

import {type CommonUiProps} from '@models'

interface TabProps extends TouchableOpacityProps, CommonUiProps {
  title?: string
  isSelected?: boolean
  onPress?: (event: GestureResponderEvent) => void
  onLayout?: (event: LayoutChangeEvent) => void
}

export const Tab: FC<TabProps> = ({title, isSelected, onPress, onLayout, ...props}) => {
  return (
    <TouchableOpacity
      style={TabStyle(props).container}
      onPress={onPress}
      onLayout={onLayout}
      aria-selected={isSelected}
      {...props}>
      <Text style={StyleSheet.flatten([TabStyle({isSelected}).textStyle])}>{title}</Text>
    </TouchableOpacity>
  )
}
