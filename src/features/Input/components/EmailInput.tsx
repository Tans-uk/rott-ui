import React, {useCallback, useState, type FC} from 'react'

import {StyleSheet, TextInput} from 'react-native'

import type {EmailInputProps} from '../models'
import {InputStyles} from '../styles'
import {InputField} from './InputField'

export const EmailInput: FC<EmailInputProps> = ({
  disabled,
  fontSize,
  theme,
  size,
  onChangeText,
  value: propValue,
  leftIcon,
  rightIcon,
  name: _name,
  errorMessage: _errorMessage,
  border: _border,
  touched: _touched,
  renderSeparator: _renderSeparator,
  ...props
}) => {
  const [value, setValue] = useState<string>(propValue || '')

  const handleChangeText = useCallback(
    (text: string) => {
      setValue(text)
      !!onChangeText && onChangeText(text)
    },
    [onChangeText]
  )

  const field = (
    <TextInput
      testID='email-input-test-id'
      editable={!disabled}
      placeholder='example@email.com'
      keyboardType='email-address'
      autoCapitalize='none'
      onChangeText={handleChangeText}
      value={value}
      style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
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
