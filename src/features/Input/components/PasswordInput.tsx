import {useRef, useState, type FC} from 'react'

import {
  Platform,
  StyleSheet,
  TextInput,
  type NativeSyntheticEvent,
  type TextInputSelectionChangeEventData,
} from 'react-native'

import {ThemeConfig} from '../../../models'
import {Icon} from '../../Icon'
import {Item} from '../../Item'
import {Pressable} from '../../Pressable'
import type {PasswordInputProps} from '../models'
import {PasswordInputStyles, useInputStyles} from '../styles'

export const PasswordInput: FC<PasswordInputProps<ThemeConfig>> = ({
  fontSize,
  onChangeText,
  secureTextEntry = true,
  theme,
  disabled,
  size,
  value,
  ...props
}) => {
  const inputRef = useRef<any>(null)
  const [isSecure, setIsSecure] = useState(secureTextEntry)
  const {defaultTextInputStyle} = useInputStyles({fontSize, theme, size})
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
    <Item row>
      <TextInput
        ref={inputRef}
        editable={!disabled}
        placeholder='*******'
        style={StyleSheet.flatten([defaultTextInputStyle])}
        keyboardType='number-pad'
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
          name={isSecure ? 'EYE_DISABLE' : 'EYE'}
          height={24}
          width={24}
        />
      </Pressable>
    </Item>
  )
}
