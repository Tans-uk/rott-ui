import {useCallback, useMemo} from 'react'

import {StyleSheet, TextInput} from 'react-native'

import type {StatementInputProps} from '../models'
import {InputStyles} from '../styles'

export const StatementInput: React.FC<StatementInputProps> = ({
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

  const inputStyles = useMemo(
    () =>
      InputStyles({fontSize, theme, size, includeBorderRadius: true, ...props})
        .defaultTextInputStyle,
    [fontSize, theme, size, props]
  )

  return (
    <TextInput
      testID='statement-input-test-id'
      keyboardType='default'
      autoCapitalize='none'
      editable={!disabled}
      placeholder={placeholder ?? (typeof label === 'string' ? label : undefined)}
      style={StyleSheet.flatten([inputStyles])}
      onChangeText={handleChangeText}
      maxLength={maxLength}
      {...props}
    />
  )
}
