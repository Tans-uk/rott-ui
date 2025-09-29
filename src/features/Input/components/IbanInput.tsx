import React, {type FC} from 'react'

import {StyleSheet} from 'react-native'

import type {IbanInputProps} from '../models'
import {InputStyles} from '../styles'
import {InputStyleNormalizer} from '../utils'
import {InputContainer} from './InputContainer'

import MaskInput from 'react-native-mask-input'

export const IbanInput: FC<IbanInputProps> = ({
  fontSize = 'md',
  onChangeText,
  theme,
  disabled,
  size,
  value,
  rightIcon,
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
    onChangeText!(isValue)
  }

  return (
    <InputContainer
      {...props}
      size={size}
      theme={theme}
      rightIcon={{
        testID: clearIconVisible ? 'clear-iban-icon-test-id' : 'qr-iban-icon-test-id',
        disabled: clearIconVisible && disabled,
        onPress: (event) => {
          if (clearIconVisible) handleTextChange('TR')
          else !!rightIcon?.onPress && rightIcon?.onPress(event)
        },
        name: clearIconVisible ? 'REMOVE_CIRCLE' : 'IBAN_QR',
        variant: 'grey-200',
        noStroke: clearIconVisible,
        width: InputStyleNormalizer({size}).icon.width,
        height: InputStyleNormalizer({size}).icon.height,
      }}>
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
          else return
        }}
        onFocus={() => value === '' && handleTextChange('TR')}
        style={StyleSheet.flatten([
          InputStyles({
            fontSize,
            theme,
            size,
          }).defaultTextInputStyle,
        ])}
        numberOfLines={1}
        value={value}
        {...props}
      />
    </InputContainer>
  )
}
