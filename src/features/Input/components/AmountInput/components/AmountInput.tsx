import {useCallback, useContext, useEffect, useRef, useState, type FC} from 'react'

import {StyleSheet, TextInput} from 'react-native'

import {RottUiContext} from '../../../../../contexts'
import {ThemeConfig} from '../../../../../models'
import {Icon} from '../../../../Icon'
import {Item} from '../../../../Item'
import {Label} from '../../../../Label'
import {useInputStyles} from '../../../styles'
import {useInputStyleNormalizer} from '../../../utils'
import type {AmountInputProps} from '../models'
import {AmountInputStyles} from '../styles'

export const AmountInput: FC<AmountInputProps<ThemeConfig>> = ({
  fontSize,
  onChangeText,
  value,
  theme,
  disabled,
  size,
  currencyType = 'TL',
  ...props
}) => {
  const {defaultTextInputStyle} = useInputStyles({fontSize, theme, size})
  const {colors} = useContext(RottUiContext)
  const amountRef = useRef<TextInput>(null)
  const currencyRef = useRef<TextInput>(null)
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('')

  const resetInternalStates = useCallback(() => {
    setAmount('')
    setCurrency('')
    onChangeText!('0.00')
  }, [])

  const replaceTextWithNumberOrEmpty = (text: string) => {
    const numericOnly = text.replace(/[^0-9]/g, '')

    if (numericOnly === '0') return numericOnly

    return numericOnly.replace(/^0+/, '')
  }

  const amountNormalizer = (text: string) => {
    if (!text) return resetInternalStates()

    const replacedAmount = replaceTextWithNumberOrEmpty(text)
    const reversedText = replacedAmount.split('').reverse().join('') ?? ''
    const dottedText = reversedText?.match(/.{1,3}/g)?.join('.')
    const normalizedText = dottedText?.split('').reverse().join('')

    setAmount(normalizedText ?? '')
  }

  const formatCurrency = (text: string) => {
    return text.replace(/[^0-9]/g, '')
  }

  const handleTextChange = (inputTextAmount: string, inputTextCurrency: string) => {
    if (!inputTextAmount && !inputTextCurrency) return

    let amountFormat = replaceTextWithNumberOrEmpty(inputTextAmount)
    let currencyFormat = formatCurrency(inputTextCurrency)

    amountFormat = amountFormat.length === 0 ? '0' : amountFormat

    currencyFormat = currencyFormat.length === 0 ? '00' : currencyFormat
    currencyFormat = currencyFormat.length === 1 ? `${currencyFormat}0` : currencyFormat

    if (currencyFormat.length > 2) currencyFormat = currencyFormat.substring(0, 2)

    onChangeText!(`${amountFormat}.${currencyFormat}`)
  }

  const placeholderColorNormalizer =
    theme === 'dark'
      ? colors.white
      : (!amount && !currency) ||
          ((amount === '0' || amount === '') && (!currency || currency === '' || currency === '00'))
        ? colors['grey-200']
        : colors['grey-900']

  useEffect(() => {
    const initialAmount = value?.split(',')[0]
    const initialCurrency = value?.split(',')[1]

    setAmount(initialAmount ?? '')
    setCurrency(initialCurrency ?? '')
  }, [])

  useEffect(() => {
    if (value === '' || !value || value === '0.00' || value === '0') resetInternalStates()
  }, [value])

  useEffect(() => {
    handleTextChange(amount, currency)
  }, [amount, currency])

  return (
    <Item relative onTouchStart={() => amountRef.current?.focus()}>
      <Item row {...props}>
        <TextInput
          ref={amountRef}
          nativeID='amount-native-id'
          testID='amount-test-id'
          editable={!disabled}
          placeholder='0'
          maxLength={11}
          value={amount}
          keyboardType='number-pad'
          onChangeText={(text) => amountNormalizer(text)}
          style={StyleSheet.flatten([defaultTextInputStyle, AmountInputStyles().amountInputStyle])}
          placeholderTextColor={placeholderColorNormalizer}
        />

        <Item
          justifyContentFlexEnd
          paddingBottom={useInputStyleNormalizer({size}).bottomElementPadding}>
          <Label
            fontSize={fontSize ?? useInputStyleNormalizer({size}).placeholderSize.toString()}
            fontWeight='bold'
            color={placeholderColorNormalizer as string}>
            ,
          </Label>
        </Item>

        <TextInput
          ref={currencyRef}
          testID='currency-test-id'
          maxLength={2}
          placeholder='00'
          value={currency}
          keyboardType='number-pad'
          onChangeText={(text) => {
            if (text.isEmpty()) amountRef.current?.focus()
            setCurrency(formatCurrency(text).substring(0, 2))
          }}
          onKeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace' && currency.isEmpty()) amountRef.current?.focus()
          }}
          onFocus={() => (currency === '00' ? setCurrency('') : undefined)}
          onBlur={() => (currency.isEmpty() || currency === '0' ? setCurrency('00') : undefined)}
          style={StyleSheet.flatten([defaultTextInputStyle, AmountInputStyles().amountInputStyle])}
          placeholderTextColor={placeholderColorNormalizer}
        />
      </Item>

      <Item absolute right={0} bottom={useInputStyleNormalizer({size}).icon.paddingBottom}>
        <Icon
          testID='currency-icon-test-id'
          name={currencyType ?? ''}
          width={useInputStyleNormalizer({size}).icon.width}
          height={useInputStyleNormalizer({size}).icon.height}
          color={colors['grey-200']}
        />
      </Item>
    </Item>
  )
}
