import {type FC} from 'react'

import {StyleSheet} from 'react-native'

import type {IbanInputProps} from '../models'
import {InputStyles} from '../styles'
import {InputStyleNormalizer} from '../utils'

import {Icon} from '@features/Icon'
import {Item} from '@features/Item'
import {Pressable} from '@features/Pressable'
import {redirect} from '@utils'

import MaskInput from 'react-native-mask-input'

export const IbanInput: FC<IbanInputProps> = ({
  fontSize = 'md',
  onChangeText,
  theme,
  disabled,
  size,
  value,
  ...props
}) => {
  const clearIconVisible = value !== 'TR' && !value?.isEmpty()
  const MASK = [
    'TR',
    /\d/,
    /\d/,
    ' ',
    /[\d*]/,
    /[\d*]/,
    /[\d*]/,
    /[\d*]/,
    ' ',
    /[\d*]/,
    /[\d*]/,
    /[\d*]/,
    /[\d*]/,
    ' ',
    /[\d*]/,
    /[\d*]/,
    /[\d*]/,
    /[\d*]/,
    ' ',
    /[\d*]/,
    /[\d*]/,
    /[\d*]/,
    /[\d*]/,
    ' ',
    /[\d*]/,
    /[\d*]/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
  ]

  const handleTextChange = (inputText: string) => {
    const isValue = inputText === '' ? '' : 'TR' + inputText.replace(/[^0-9]/g, '')
    onChangeText!(isValue)
  }

  const handleIbanScanned = (iban: string) => {
    handleTextChange(iban) // Tarama sonucu IBAN'ı input alanına yazdır
  }

  return (
    <Item row>
      <MaskInput
        editable={!disabled}
        testID='iban-input-test-id'
        mask={MASK}
        placeholder='TR00 0000 0000 0000 0000 0000 00'
        keyboardType='number-pad'
        maxLength={34}
        onChangeText={(masked, unmasked) => {
          if (unmasked.length === 0) handleTextChange('TR')
          else if (unmasked.length <= 32) handleTextChange(unmasked)
          else return
        }}
        onFocus={() => value === '' && handleTextChange('TR')}
        style={StyleSheet.flatten([
          InputStyles({
            fontSize,
            theme,
            size,
          }).defaultTextInputStyle,
        ])}
        numberOfLines={1}
        value={value}
        {...props}
      />

      <Item absolute right={0} bottom={InputStyleNormalizer({size}).icon.paddingBottom}>
        <Pressable
          testID={clearIconVisible ? 'clear-iban-icon-test-id' : 'qr-iban-icon-test-id'}
          disabled={clearIconVisible && disabled}
          onPress={() => {
            if (clearIconVisible) handleTextChange('TR')
            else {
              redirect('IbanScannerScreen', {
                onScanned: handleIbanScanned,
              })
            }
          }}>
          <Icon
            name={clearIconVisible ? 'REMOVE_CIRCLE' : 'IBAN_QR'}
            mode={clearIconVisible ? 'fill' : 'stroke'}
            strokeWidth={clearIconVisible ? 0 : 2}
            variant='grey-200'
            noStroke={clearIconVisible}
            width={InputStyleNormalizer({size}).icon.width}
            height={InputStyleNormalizer({size}).icon.height}
          />
        </Pressable>
      </Item>
    </Item>
  )
}
