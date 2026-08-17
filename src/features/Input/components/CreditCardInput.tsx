import React, {type FC} from 'react'

import {StyleSheet} from 'react-native'

import type {CreditCardInputProps} from '../models'
import {InputStyles} from '../styles'
import {InputField} from './InputField'

// Package Imports
import MaskInput from 'react-native-mask-input'

export const CreditCardInput: FC<CreditCardInputProps> = ({
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
  const MASK = [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ]

  const handleOnChangeText = (text: string) => {
    const replacedText = text.replace(/[^0-9]/g, '')
    onChangeText?.(replacedText)
  }

  const field = (
    <MaskInput
      editable={!disabled}
      mask={MASK}
      placeholder='**** **** **** ****'
      keyboardType='number-pad'
      maxLength={19}
      onChangeText={(_masked, unmasked) => handleOnChangeText(unmasked)}
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
