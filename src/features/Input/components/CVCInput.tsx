import React, {type FC} from 'react'

import {StyleSheet, TextInput} from 'react-native'

import type {CVCInputProps} from '../models'
import {InputStyles} from '../styles'
import {InputContainer} from './InputContainer'

export const CVCInput: FC<CVCInputProps> = ({
  fontSize,
  onChangeText,
  theme,
  size,
  label,
  ...props
}) => {
  const handleTextChange = (inputText: string) => {
    let text = inputText.replace(/[^0-9]/g, '')
    text = text.length > 3 ? text.substring(0, 3) : text
    onChangeText!(text)
  }

  return (
    <InputContainer {...props} size={size} theme={theme} label={label}>
      <TextInput
        editable={!props.disabled}
        placeholder='***'
        style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
        keyboardType='number-pad'
        maxLength={3}
        onChangeText={handleTextChange}
        {...props}
      />
    </InputContainer>
  )
}
