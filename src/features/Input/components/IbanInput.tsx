import {type FC} from 'react'

import {StyleSheet, type GestureResponderEvent} from 'react-native'

import type {IbanInputProps} from '../models'
import {InputStyles} from '../styles'
import {InputField} from './InputField'

import MaskInput from 'react-native-mask-input'
import React from 'react'

export const IbanInput: FC<IbanInputProps> = ({
  fontSize = 'md',
  onChangeText,
  theme,
  disabled,
  size,
  value,
  leftIcon,
  rightIcon,
  name: _name,
  errorMessage: _errorMessage,
  border: _border,
  touched: _touched,
  renderSeparator: _renderSeparator,
  ...props
}) => {
  const clearIconVisible = value !== 'TR' && !value?.isEmpty()
  const MASK = [
    'TR',
    /\d/,
    /\d/,
    ' ',
    /[\d*]/,
    /[\d*]/,
    /[\d*]/,
    /[\d*]/,
    ' ',
    /[\d*]/,
    /[\d*]/,
    /[\d*]/,
    /[\d*]/,
    ' ',
    /[\d*]/,
    /[\d*]/,
    /[\d*]/,
    /[\d*]/,
    ' ',
    /[\d*]/,
    /[\d*]/,
    /[\d*]/,
    /[\d*]/,
    ' ',
    /[\d*]/,
    /[\d*]/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
  ]

  const handleTextChange = (inputText: string) => {
    const isValue = inputText === '' ? '' : 'TR' + inputText.replace(/[^0-9]/g, '')
    onChangeText?.(isValue)
  }

  const trailingIcon = {
    name: (clearIconVisible ? 'remove-circle' : 'qr-iban') as any,
    variant: 'grey-200' as any,
    noStroke: clearIconVisible,
    ...rightIcon,
    onPress: (event: GestureResponderEvent) => {
      if (clearIconVisible) {
        if (disabled) return
        handleTextChange('TR')
      } else {
        rightIcon?.onPress?.(event)
      }
    },
  }

  return (
    <InputField size={size} leftIcon={leftIcon} rightIcon={trailingIcon}>
      <MaskInput
        editable={!disabled}
        testID='iban-input-test-id'
        mask={MASK}
        placeholder='TR00 0000 0000 0000 0000 0000 00'
        keyboardType='number-pad'
        maxLength={34}
        onChangeText={(_masked, unmasked) => {
          if (unmasked.length === 0) handleTextChange('TR')
          else if (unmasked.length <= 32) handleTextChange(unmasked)
        }}
        onFocus={() => value === '' && handleTextChange('TR')}
        style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
        numberOfLines={1}
        value={value}
        {...props}
      />
    </InputField>
  )
}
