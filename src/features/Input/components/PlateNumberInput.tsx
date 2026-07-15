import {type FC} from 'react'

import {StyleSheet, TextInput} from 'react-native'

import type {PlateNumberInputProps} from '../models'
import {InputStyles} from '../styles'
import {InputField} from './InputField'
import React from 'react'

export const PlateNumberInput: FC<PlateNumberInputProps> = ({
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
  const handleTextChange = (plateNumber: string) => {
    const replacedPlateNumber = plateNumber
      .replace(/[^0-9A-Za-z]/g, '')
      .replace(/[a-z]/g, (char) => char.toUpperCase())
    onChangeText!(replacedPlateNumber)
  }

  const field = (
    <TextInput
      editable={!disabled}
      placeholder='_________'
      style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
      keyboardType='default'
      maxLength={9}
      autoCapitalize='characters'
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
