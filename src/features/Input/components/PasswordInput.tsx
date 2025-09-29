import React, {useRef, useState, type FC} from 'react'

import {
  Platform,
  StyleSheet,
  TextInput,
  type NativeSyntheticEvent,
  type TextInputSelectionChangeEventData,
} from 'react-native'

import type {PasswordInputProps} from '../models'
import {InputStyles} from '../styles'
import {InputContainer} from './InputContainer'

export const PasswordInput: FC<PasswordInputProps> = ({
  fontSize,
  onChangeText,
  secureTextEntry = true,
  theme,
  disabled,
  size,
  value,
  backgroundColor,
  ...props
}) => {
  const inputRef = useRef<any>(null)
  const [isSecure, setIsSecure] = useState(secureTextEntry)
  const handleTextChange = (inputText: string) => {
    onChangeText!(inputText.replace(/[^0-9]/g, ''))
  }

  const handleSelectionChange = ({
    nativeEvent: {selection},
  }: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
    if (Platform.OS === 'android') {
      // Android'de yapıştırma işlemini engelle
      const {start, end} = selection
      if (start !== end && inputRef.current)
        inputRef.current.setNativeProps({selection: {start: 0, end: 0}})
    }
  }

  return (
    <InputContainer
      {...props}
      size={size}
      theme={theme}
      rightIcon={{
        testID: 'show-password-icon-test-id',
        name: isSecure ? 'EYE_DISABLE' : 'EYE',
        variant: theme === 'dark' ? 'white' : !value ? 'grey-200' : 'grey-900',
        height: 24,
        width: 24,
        onPress: () => setIsSecure(!isSecure),
      }}>
      <TextInput
        ref={inputRef}
        editable={!disabled}
        placeholder='*******'
        style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
        keyboardType='number-pad'
        secureTextEntry={isSecure}
        onChangeText={handleTextChange}
        value={value}
        contextMenuHidden={true} // iOS'ta yapıştırma özelliğini kapat
        onSelectionChange={handleSelectionChange} // Android'de yapıştırma işlemini engelle
        {...props}
      />
    </InputContainer>
  )
}
