import React, {useCallback, useMemo} from 'react'

import {StyleSheet, TextInput} from 'react-native'

import type {StatementInputProps} from '../models'
import {InputStyles} from '../styles'
import {InputField} from './InputField'

export const StatementInput: React.FC<StatementInputProps> = ({
  disabled,
  placeholder,
  label,
  fontSize,
  theme,
  size,
  maxLength,
  onChangeText,
  leftIcon,
  rightIcon,
  name: _name,
  errorMessage: _errorMessage,
  border: _border,
  touched: _touched,
  renderSeparator: _renderSeparator,
  ...props
}) => {
  const handleChangeText = useCallback(
    (value: string) => {
      const formattedValue = value.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ0-9 .,\-/]/g, '')
      if (!maxLength) {
        onChangeText?.(formattedValue)

        return
      }
      onChangeText?.(
        formattedValue.length > maxLength ? formattedValue.slice(0, maxLength) : formattedValue
      )
    },
    [maxLength, onChangeText]
  )

  const inputStyles = useMemo(
    () => InputStyles({fontSize, theme, size, includeBorderRadius: true}).defaultTextInputStyle,
    [fontSize, theme, size]
  )

  const field = (
    <TextInput
      testID='statement-input-test-id'
      keyboardType='default'
      autoCapitalize='none'
      editable={!disabled}
      placeholder={placeholder ?? (typeof label === 'string' ? label : undefined)}
      style={StyleSheet.flatten([inputStyles])}
      onChangeText={handleChangeText}
      maxLength={maxLength}
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
