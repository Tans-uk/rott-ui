import React, {type FC} from 'react'

import {StyleSheet, TextInput} from 'react-native'

import type {PinPasswordInputProps} from '../models'
import {InputStyles} from '../styles'
import {InputContainer} from './InputContainer'

export const PinPasswordInput: FC<PinPasswordInputProps> = ({
  fontSize,
  onChangeText,
  theme,
  disabled,
  size,
  ...props
}) => {
  const handleTextChange = (inputText: string) => {
    if (onChangeText) onChangeText(inputText.replace(/[^0-9]/g, ''))
  }

  return (
    <InputContainer {...props} size={size} theme={theme}>
      <TextInput
        editable={!disabled}
        placeholder='____'
        style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
        keyboardType='number-pad'
        maxLength={4}
        secureTextEntry={true}
        onChangeText={handleTextChange}
        {...props}
      />
    </InputContainer>
  )
}
