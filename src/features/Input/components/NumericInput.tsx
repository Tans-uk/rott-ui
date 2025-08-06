import {type FC} from 'react'

import {StyleSheet, TextInput} from 'react-native'

import {ThemeConfig} from '../../../models'
import {Item} from '../../Item'
import type {NumericInputProps} from '../models'
import {useInputStyles} from '../styles'

export const NumericInput: FC<NumericInputProps<ThemeConfig>> = ({
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
        style={StyleSheet.flatten([useInputStyles({fontSize, theme, size}).defaultTextInputStyle])}
        keyboardType='number-pad'
        onChangeText={handleTextChange}
        {...props}
      />
    </Item>
  )
}
