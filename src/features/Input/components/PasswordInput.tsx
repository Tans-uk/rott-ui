import {useRef, useState, type FC} from 'react'

import {
  Platform,
  StyleSheet,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputSelectionChangeEventData,
} from 'react-native'

import {Icon} from '../../Icon'
import {Item} from '../../Item'
import {Pressable} from '../../Pressable'
import type {PasswordInputProps} from '../models'
import {InputStyles, PasswordInputStyles} from '../styles'
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
  icon,
  ...props
}) => {
  const inputRef = useRef<any>(null)
  const [isSecure, setIsSecure] = useState(secureTextEntry)
  const handleTextChange = (inputText: string) => {
    onChangeText!(numericOnly ? inputText.replace(/[^0-9]/g, '') : inputText)
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
    <Item row>
      {icon && (
        <View style={PasswordInputStyles().leadingIcon}>
          <Icon
            {...icon}
            testID='password-leading-icon-test-id'
            name={icon.name}
            variant={icon.variant}
            width={icon.width ?? 24}
            height={icon.height ?? 24}
          />
        </View>
      )}

      <TextInput
        ref={inputRef}
        editable={!disabled}
        placeholder='*******'
        style={StyleSheet.flatten([
          InputStyles({fontSize, theme, size}).defaultTextInputStyle,
          icon ? {paddingLeft: 34} : undefined,
        ])}
        keyboardType={numericOnly ? 'number-pad' : 'default'}
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={isSecure}
        onChangeText={handleTextChange}
        value={value}
        contextMenuHidden={true} // iOS'ta yapıştırma özelliğini kapat
        onSelectionChange={handleSelectionChange} // Android'de yapıştırma işlemini engelle
        {...props}
      />

      <Pressable
        testID='show-password-icon-test-id'
        style={PasswordInputStyles().showPasswordIcon}
        justifyContentCenter
        alignItemsCenter
        onPress={() => {
          setIsSecure(!isSecure)
        }}>
        <Icon
          variant={theme === 'dark' ? 'white' : !value ? 'grey-200' : 'grey-900'}
          name={isSecure ? 'eye-disable' : 'eye'}
          height={24}
          width={24}
        />
      </Pressable>
    </Item>
  )
}
