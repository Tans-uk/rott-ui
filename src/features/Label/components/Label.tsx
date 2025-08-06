import {forwardRef, type FC} from 'react'

import {StyleSheet, Text} from 'react-native'

import type {ThemeConfig} from '../../../models'
import type {LabelProps} from '../models'
import {useLabel} from '../styles'

export const Label: FC<LabelProps<ThemeConfig>> = forwardRef<Text, LabelProps<ThemeConfig>>(
  (
    {
      fontSize = 'md',
      variant = 'black',
      textCenter,
      fontWeight,
      fontFamily,
      letterSpacing = undefined,
      color,
      style,
      children,
      flex,
      ...props
    },
    ref
  ) => {
    const labelStyle = useLabel({
      textCenter,
      flex: flex ?? 1,
      fontSize,
      variant,
      fontWeight,
      fontFamily,
      letterSpacing,
      color,
      includeLatterSpacing: true,
      ...props,
    })

    return (
      <Text ref={ref} style={StyleSheet.flatten([labelStyle.defaultLabelStyle, style])} {...props}>
        {children}
      </Text>
    )
  }
)
