import {type FC} from 'react'

import {StyleSheet, TextInput} from 'react-native'

import {ThemeConfig} from '../../../models'
import {Item} from '../../Item'
import type {PinPasswordInputProps} from '../models'
import {useInputStyles} from '../styles'

export const PinPasswordInput: FC<PinPasswordInputProps<ThemeConfig>> = ({
  fontSize,
  onChangeText,
  theme,
  disabled,
  size,
  ...props
}) => {
  const {defaultTextInputStyle} = useInputStyles({fontSize, theme, size})
  const handleTextChange = (inputText: string) => {
    if (onChangeText) onChangeText(inputText.replace(/[^0-9]/g, ''))
  }

  return (
    <Item row>
      <TextInput
        editable={!disabled}
        placeholder='____'
        style={StyleSheet.flatten([defaultTextInputStyle])}
        keyboardType='number-pad'
        maxLength={4}
        secureTextEntry={true}
        onChangeText={handleTextChange}
        {...props}
      />
    </Item>
  )
}
