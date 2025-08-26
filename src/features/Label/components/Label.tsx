import {forwardRef, type FC} from 'react'

import {StyleSheet, Text} from 'react-native'

import type {LabelProps} from '../models'
import {LabelStyles} from '../styles'
import React from 'react'

export const Label: FC<LabelProps> = forwardRef<Text, LabelProps>(
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
    return (
      <Text
        ref={ref}
        style={StyleSheet.flatten([
          LabelStyles({
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
          }).defaultLabelStyle,
          style,
        ])}
        {...props}>
        {children}
      </Text>
    )
  }
)
