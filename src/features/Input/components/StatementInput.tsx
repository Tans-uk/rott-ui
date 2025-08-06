import {useCallback} from 'react'

import {StyleSheet, TextInput} from 'react-native'

import {ThemeConfig} from '../../../models'
import type {StatementInputProps} from '../models'
import {useInputStyles} from '../styles'

export const StatementInput: React.FC<StatementInputProps<ThemeConfig>> = ({
  disabled,
  placeholder,
  label,
  fontSize,
  theme,
  size,
  maxLength,
  onChangeText,
  ...props
}) => {
  const {defaultTextInputStyle} = useInputStyles({
    fontSize,
    theme,
    size,
    includeBorderRadius: true,
    ...props,
  })
  const handleChangeText = useCallback(
    (value: string) => {
      const formattedValue = value.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ0-9 .,\-/]/g, '')
      if (!maxLength) {
        onChangeText?.(formattedValue)

        return
      }
      onChangeText?.(
        formattedValue.length > maxLength ? formattedValue.slice(0, maxLength) : formattedValue
      )
    },
    [maxLength, onChangeText]
  )

  return (
    <TextInput
      testID='statement-input-test-id'
      keyboardType='default'
      autoCapitalize='none'
      editable={!disabled}
      placeholder={placeholder ?? (typeof label === 'string' ? label : undefined)}
      style={StyleSheet.flatten([defaultTextInputStyle])}
      onChangeText={handleChangeText}
      maxLength={maxLength}
      {...props}
    />
  )
}
