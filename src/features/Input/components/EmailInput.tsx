import {useCallback, useState, type FC} from 'react'

import {StyleSheet, TextInput} from 'react-native'

import {ThemeConfig} from '../../../models'
import {Item} from '../../Item'
import type {EmailInputProps} from '../models'
import {useInputStyles} from '../styles'

export const EmailInput: FC<EmailInputProps<ThemeConfig>> = ({
  disabled,
  fontSize,
  theme,
  size,
  onChangeText,
  value: propValue,
  ...props
}) => {
  const [value, setValue] = useState<string>(propValue || '')
  const {defaultTextInputStyle} = useInputStyles({fontSize, theme, size})
  const handleChangeText = useCallback(
    (text: string) => {
      setValue(text)
      !!onChangeText && onChangeText(text)
    },
    [onChangeText]
  )

  return (
    <Item>
      <TextInput
        testID='email-input-test-id'
        editable={!disabled}
        placeholder='example@email.com'
        keyboardType='email-address'
        autoCapitalize='none'
        onChangeText={handleChangeText}
        value={value}
        style={StyleSheet.flatten([defaultTextInputStyle])}
        {...props}
      />
    </Item>
  )
}
