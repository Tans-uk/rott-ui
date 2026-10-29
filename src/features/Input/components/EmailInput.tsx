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
  // Controlled when the caller passes a value, so resets and programmatic updates show up;
  // otherwise the input keeps its own text, as before.
  const isControlled = propValue !== undefined
  const [internalValue, setInternalValue] = useState<string>(propValue ?? '')
  const [wasControlled, setWasControlled] = useState(isControlled)

  // A value that goes back to undefined is a reset: clear the field instead of showing the
  // text it held before it became controlled.
  if (wasControlled !== isControlled) {
    setWasControlled(isControlled)
    if (!isControlled) setInternalValue('')
  }

  const handleChangeText = useCallback(
    (text: string) => {
      if (!isControlled) setInternalValue(text)
      onChangeText?.(text)
    },
    [isControlled, onChangeText]
  )

  const field = (
    <TextInput
      testID='email-input-test-id'
      editable={!disabled}
      placeholder='example@email.com'
      keyboardType='email-address'
      autoCapitalize='none'
      onChangeText={handleChangeText}
      value={isControlled ? propValue : internalValue}
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
