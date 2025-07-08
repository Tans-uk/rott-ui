import {type FC} from 'react'

import {StyleSheet, TextInput} from 'react-native'

import type {PlateNumberInputProps} from '../models'
import {InputStyles} from '../styles'

export const PlateNumberInput: FC<PlateNumberInputProps> = ({
  fontSize,
  onChangeText,
  theme,
  disabled,
  size,
  ...props
}) => {
  const handleTextChange = (plateNumber: string) => {
    const replacedPlateNumber = plateNumber.replace(/[^0-9A-Z]/g, '')
    onChangeText!(replacedPlateNumber)
  }

  return (
    <TextInput
      editable={!disabled}
      placeholder='_________'
      style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
      keyboardType='default'
      maxLength={9}
      autoCapitalize='characters'
      onChangeText={handleTextChange}
      {...props}
    />
  )
}
