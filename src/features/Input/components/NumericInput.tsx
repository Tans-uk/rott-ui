import {type FC} from 'react'

import {StyleSheet, TextInput} from 'react-native'

import {Item} from '../../Item'
import type {NumericInputProps} from '../models'
import {InputStyles} from '../styles'
import React from 'react'

export const NumericInput: FC<NumericInputProps> = ({
  label,
  placeholder,
  fontSize,
  onChangeText,
  theme,
  disabled,
  size,
  ...props
}) => {
  const handleTextChange = (inputText: string) => {
    onChangeText!(inputText.replace(/[^0-9]/g, ''))
  }

  return (
    <Item row>
      <TextInput
        editable={!disabled}
        placeholder={placeholder ?? (typeof label === 'string' ? label : undefined)}
        style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
        keyboardType='number-pad'
        onChangeText={handleTextChange}
        {...props}
      />
    </Item>
  )
}
