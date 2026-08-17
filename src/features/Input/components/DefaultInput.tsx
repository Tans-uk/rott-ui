import React, {useCallback, type FC} from 'react'

import {StyleSheet, TextInput} from 'react-native'

import type {DefaultInputProps} from '../models'
import {InputStyles} from '../styles'
import {InputField} from './InputField'

export const DefaultInput: FC<DefaultInputProps> = ({
  label,
  placeholder,
  fontSize,
  theme,
  disabled,
  size,
  leftIcon,
  rightIcon,
  keyboard = 'default',
  onChangeText,
  name: _name,
  errorMessage: _errorMessage,
  border: _border,
  touched: _touched,
  renderSeparator: _renderSeparator,
  ...props
}) => {
  const handleChangeText = useCallback(
    (value: string) => {
      if (keyboard === 'default') {
        // Defaut Input Max Karakter Verilmemis ise
        if (!props?.maxLength) {
          onChangeText?.(value)

          return
        }

        // Defaut Input Max Karakter Verilmis Ise
        onChangeText?.(value.length > props?.maxLength ? value.slice(0, props?.maxLength) : value)

        return
      } else if (keyboard === 'alphanumeric') {
        const formattedValue = value.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ0-9 .]/g, '')
        // Alphanumeric Input Max Karakter Verilmemis ise
        if (!props?.maxLength) {
          onChangeText?.(formattedValue)

          return
        }

        // Alphanumeric Input Max Karakter Verilmis Ise
        onChangeText?.(
          formattedValue.length > props?.maxLength
            ? formattedValue.slice(0, props?.maxLength)
            : formattedValue
        )
      }
    },
    [props?.maxLength, onChangeText, keyboard]
  )

  const textInput = (
    <TextInput
      testID='default-input-test-id'
      editable={!disabled}
      keyboardType='default'
      autoCapitalize='none'
      placeholder={placeholder ?? (typeof label === 'string' ? label : undefined)}
      style={StyleSheet.flatten([
        InputStyles({fontSize, theme, size, includeBorderRadius: true}).defaultTextInputStyle,
      ])}
      onChangeText={handleChangeText}
      {...props}
    />
  )

  if (!leftIcon && !rightIcon) return textInput

  return (
    <InputField size={size} leftIcon={leftIcon} rightIcon={rightIcon}>
      {textInput}
    </InputField>
  )
}
