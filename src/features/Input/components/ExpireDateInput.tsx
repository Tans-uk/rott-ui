import {type FC} from 'react'

import {StyleSheet} from 'react-native'

import type {ExpireDateInputProps} from '../models'
import {InputStyles} from '../styles'

import {formatMessage} from '@libs'

import MaskInput from 'react-native-mask-input'

export const ExpireDateInput: FC<ExpireDateInputProps> = ({
  fontSize,
  onChangeText,
  theme,
  disabled,
  size,
  ...props
}) => {
  const MASK = [/\d/, /\d/, '/', /\d/, /\d/]

  //TODO: formatMMYY refactor edilebilir mi?
  const formatMMYY = (inputText: string) => {
    //Numerik karakter filtresi
    inputText = inputText.replace(/[^0-9]/g, '')

    const regexPattern = /^(\d{2})(\d{2})$/
    const matchFormatValidation = inputText.match(regexPattern)

    if (!matchFormatValidation) {
      if (inputText.length === 2) return parseInt(inputText, 10) > 12 ? '12' : inputText

      return inputText
    }

    const month = matchFormatValidation[1]
    const year = matchFormatValidation[2]
    if (!month || !year) return ''

    const currentYear = new Date().getFullYear() % 100
    const formattedMonth = parseInt(month, 10) > 12 ? '12' : month
    const formattedYear = parseInt(year, 10) < currentYear ? currentYear : year

    return `${formattedMonth}${formattedYear}`
  }

  return (
    <MaskInput
      editable={!disabled}
      mask={MASK}
      placeholder={formatMessage('EXPIRE.DATE.PLACEHOLDER')}
      keyboardType='number-pad'
      onChangeText={(_masked, unmasked) => !!onChangeText && onChangeText(formatMMYY(unmasked))}
      style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
      {...props}
    />
  )
}
