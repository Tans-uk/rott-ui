import React, {useCallback, useState, type FC} from 'react'

import {StyleSheet, TextInput} from 'react-native'

import type {EmailInputProps} from '../models'
import {InputStyles} from '../styles'
import {InputContainer} from './InputContainer'

export const EmailInput: FC<EmailInputProps> = ({
  disabled,
  fontSize,
  theme,
  size,
  onChangeText,
  value: propValue,
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

  return (
    <InputContainer {...props} size={size} theme={theme}>
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
    </InputContainer>
  )
}
