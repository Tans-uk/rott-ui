import {type FC} from 'react'

import {StyleSheet, View, type ViewProps} from 'react-native'

import {ThemeConfig, type CommonUiProps} from '../../../models'
import {useSeparatorStyles} from '../styles'

interface SeparatorProps<TTheme extends ThemeConfig> extends ViewProps, CommonUiProps<TTheme> {
  height?: number | string
  width?: number | string
  orientation?: 'vertical' | 'horizontal'
  opacity?: number
}

export const Separator: FC<SeparatorProps<ThemeConfig>> = ({
  height = 1,
  width = 1,
  style,
  size,
  orientation = 'horizontal',
  opacity = 1,
  ...props
}) => {
  const {defaultSeparator} = useSeparatorStyles({
    height: orientation === 'vertical' && size ? undefined : height,
    width: orientation === 'horizontal' && size ? undefined : width,
    size,
    orientation,
    opacity,
    ...props,
  })

  return <View style={StyleSheet.flatten([defaultSeparator.defaultSeparator, style])} {...props} />
}
