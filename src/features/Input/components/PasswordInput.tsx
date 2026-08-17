import {useRef, useState, type FC} from 'react'

import {
  Platform,
  StyleSheet,
  TextInput,
  type NativeSyntheticEvent,
  type TextInputSelectionChangeEventData,
} from 'react-native'

import type {PasswordInputProps} from '../models'
import {InputStyles} from '../styles'
import {InputField} from './InputField'
import React from 'react'

export const PasswordInput: FC<PasswordInputProps> = ({
  fontSize,
  onChangeText,
  secureTextEntry = true,
  theme,
  disabled,
  size,
  value,
  numericOnly = false,
  leftIcon,
  rightIcon,
  name: _name,
  errorMessage: _errorMessage,
  border: _border,
  touched: _touched,
  renderSeparator: _renderSeparator,
  ...props
}) => {
  const inputRef = useRef<any>(null)
  const [isSecure, setIsSecure] = useState(secureTextEntry)

  const handleTextChange = (inputText: string) => {
    onChangeText?.(numericOnly ? inputText.replace(/[^0-9]/g, '') : inputText)
  }

  const handleSelectionChange = ({
    nativeEvent: {selection},
  }: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
    if (Platform.OS === 'android') {
      const {start, end} = selection
      if (start !== end && inputRef.current) {
        inputRef.current.setNativeProps({selection: {start: 0, end: 0}})
      }
    }
  }

  // Yerleşik göz toggle: fonksiyon sabit; görünüm rightIcon ile override edilebilir.
  const eyeIcon = {
    name: (isSecure ? 'eye-disable' : 'eye') as any,
    variant: (theme === 'dark' ? 'white' : !value ? 'grey-200' : 'grey-900') as any,
    width: 24,
    height: 24,
    ...rightIcon,
    onPress: () => setIsSecure((prev) => !prev),
  }

  return (
    <InputField size={size} leftIcon={leftIcon} rightIcon={eyeIcon}>
      <TextInput
        testID='input-test-id'
        ref={inputRef}
        editable={!disabled}
        placeholder='*******'
        style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
        keyboardType={numericOnly ? 'number-pad' : 'default'}
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={isSecure}
        onChangeText={handleTextChange}
        value={value}
        contextMenuHidden={true}
        onSelectionChange={handleSelectionChange}
        {...props}
      />
    </InputField>
  )
}
