import {type FC} from 'react'

import {StyleSheet, TextInput} from 'react-native'

import type {NumericInputProps} from '../models'
import {InputStyles} from '../styles'
import {InputField} from './InputField'
import React from 'react'

export const NumericInput: FC<NumericInputProps> = ({
  label,
  placeholder,
  fontSize,
  onChangeText,
  theme,
  disabled,
  size,
  leftIcon,
  rightIcon,
  name: _name,
  errorMessage: _errorMessage,
  border: _border,
  touched: _touched,
  renderSeparator: _renderSeparator,
  ...props
}) => {
  const handleTextChange = (inputText: string) => {
    onChangeText?.(inputText.replace(/[^0-9]/g, ''))
  }

  const field = (
    <TextInput
      editable={!disabled}
      placeholder={placeholder ?? (typeof label === 'string' ? label : undefined)}
      style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
      keyboardType='number-pad'
      onChangeText={handleTextChange}
      {...props}
    />
  )

  if (!leftIcon && !rightIcon) return field

  return (
    <InputField size={size} leftIcon={leftIcon} rightIcon={rightIcon}>
      {field}
    </InputField>
  )
}
