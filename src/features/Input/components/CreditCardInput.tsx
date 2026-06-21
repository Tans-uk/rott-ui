import {type FC} from 'react'

import {StyleSheet} from 'react-native'

import type {CreditCardInputProps} from '../models'
import {InputStyles} from '../styles'

// Package Imports
import MaskInput from 'react-native-mask-input'
import React from 'react'

export const CreditCardInput: FC<CreditCardInputProps> = ({
  fontSize,
  onChangeText,
  theme,
  disabled,
  size,
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
    onChangeText!(replacedText)
  }

  return (
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
}
