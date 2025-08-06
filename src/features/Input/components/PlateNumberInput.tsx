import {type FC} from 'react'

import {StyleSheet, TextInput} from 'react-native'

import type {PlateNumberInputProps} from '../models'
import {useInputStyles} from '../styles'

import { ThemeConfig } from '../../../models'

export const PlateNumberInput: FC<PlateNumberInputProps<ThemeConfig>> = ({
  fontSize,
  onChangeText,
  theme,
  disabled,
  size,
  ...props
}) => {
  const {defaultTextInputStyle} = useInputStyles({fontSize, theme, size})
  const handleTextChange = (plateNumber: string) => {
    const replacedPlateNumber = plateNumber
      .replace(/[^0-9A-Za-z]/g, '')
      .replace(/[a-z]/g, (char) => char.toUpperCase())
    onChangeText!(replacedPlateNumber)
  }

  return (
    <TextInput
      editable={!disabled}
      placeholder='_________'
      style={StyleSheet.flatten([defaultTextInputStyle])}
      keyboardType='default'
      maxLength={9}
      autoCapitalize='characters'
      onChangeText={handleTextChange}
      {...props}
    />
  )
}
