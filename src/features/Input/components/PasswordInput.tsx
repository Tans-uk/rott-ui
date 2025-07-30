import {useRef, useState, type FC} from 'react'

import {
  Platform,
  StyleSheet,
  TextInput,
  type NativeSyntheticEvent,
  type TextInputSelectionChangeEventData,
} from 'react-native'

import {Icon} from '../../Icon'
import {Item} from '../../Item'
import {Pressable} from '../../Pressable'
import type {PasswordInputProps} from '../models'
import {InputStyles, PasswordInputStyles} from '../styles'

export const PasswordInput: FC<PasswordInputProps> = ({
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
        style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
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
          mode='stroke'
          strokeWidth={1.5}
        />
      </Pressable>
    </Item>
  )
}
