import React, {type FC} from 'react'

import {PermissionsAndroid, Platform, StyleSheet} from 'react-native'

import {themeConfig} from '../../../providers'
import type {PhoneInputProps} from '../models'
import {InputStyles} from '../styles'
import {InputStyleNormalizer} from '../utils'
import {InputContainer} from './InputContainer'

import MaskInput from 'react-native-mask-input'
import {selectContactPhone} from 'react-native-select-contact'

export const PhoneInput: FC<PhoneInputProps> = ({
  fontSize,
  onChangeText,
  theme,
  disabled,
  size,
  selectContacts = true,
  maxLength = 16,
  ...props
}) => {
  const MASK = [
    '0',
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
  ]

  const handleTextChange = (inputText: string) => {
    const formattedText = inputText.replace(/^(\+90|90|0)/, '').replace(/[^0-9]/g, '')
    onChangeText!('0' + formattedText)
  }

  const getPhoneNumberPermissionRequest = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)

      if (granted === PermissionsAndroid.RESULTS.GRANTED) await getPhoneNumberFromContact()
    } catch (err) {
      console.error(err)
    }
  }

  const getPhoneNumberFromContact = async () => {
    selectContactPhone()
      .then((selection) => {
        if (!selection) return null

        let {selectedPhone} = selection
        return handleTextChange(selectedPhone?.number?.replace(/^(\+90|90|0)/, ''))
      })
      .catch(() => handleTextChange(''))
  }

  const getContactPhoneNumber = async () => {
    if (Platform.OS === 'android') getPhoneNumberPermissionRequest()
    else getPhoneNumberFromContact()
  }

  return (
    <InputContainer
      {...props}
      size={size}
      theme={theme}
      rightIcon={{
        testID: 'contact-pressable-test-id',
        name: 'PHONE_BOOK',
        width: InputStyleNormalizer({size}).icon.width,
        height: InputStyleNormalizer({size}).icon.height,
        onPress: getContactPhoneNumber,
        color: themeConfig.colors['grey-200'],
      }}>
      <MaskInput
        testID='phone-input-test-id'
        editable={!disabled}
        mask={MASK}
        maxLength={maxLength >= 16 ? 16 : maxLength}
        placeholder='0(XXX) XXX XX XX'
        keyboardType='number-pad'
        onChangeText={(_masked, unmasked) => handleTextChange(unmasked)}
        style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
        {...props}
      />
    </InputContainer>
  )
}
