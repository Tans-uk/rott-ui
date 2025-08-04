import {useCallback, type FC} from 'react'

import {StyleSheet, TextInput} from 'react-native'

import {Icon} from '../../Icon'
import {Item} from '../../Item'
import type {DefaultInputProps} from '../models'
import {InputStyles} from '../styles'

export const DefaultInput: FC<DefaultInputProps> = ({
  label,
  placeholder,
  fontSize,
  theme,
  disabled,
  size,
  icon,
  keyboard = 'default',
  onChangeText,
  ...props
}) => {
  const handleChangeText = useCallback(
    (value: string) => {
      if (keyboard === 'default') {
        // Defaut Input Max Karakter Verilmemis ise
        if (!props?.maxLength) {
          onChangeText?.(value)

          return
        }

        // Defaut Input Max Karakter Verilmis Ise
        onChangeText?.(value.length > props?.maxLength ? value.slice(0, props?.maxLength) : value)

        return
      } else if (keyboard === 'alphanumeric') {
        const formattedValue = value.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ0-9 .]/g, '')
        // Alphanumeric Input Max Karakter Verilmemis ise
        if (!props?.maxLength) {
          onChangeText?.(formattedValue)

          return
        }

        // Alphanumeric Input Max Karakter Verilmis Ise
        onChangeText?.(
          formattedValue.length > props?.maxLength
            ? formattedValue.slice(0, props?.maxLength)
            : formattedValue
        )
      }
    },
    [props?.maxLength, onChangeText]
  )

  return icon ? (
    <Item row alignItemsCenter {...props} testID='default-input-container-test-id'>
      <Icon
        width={icon.width ?? 24}
        height={icon.height ?? 24}
        name={icon.name}
        mode={icon.mode}
        noStroke={icon.noStroke}
        strokeWidth={icon.strokeWidth}
      />
      <TextInput
        editable={!disabled}
        keyboardType='default'
        autoCapitalize='none'
        placeholder={placeholder ?? (typeof label === 'string' ? label : undefined)}
        onChangeText={(text) => onChangeText!(text)}
        style={StyleSheet.flatten([
          InputStyles({
            fontSize,
            theme,
            size,
            includeBorderRadius: true,
            ...props,
          }).defaultTextInputStyle,
        ])}
        {...props}
      />
    </Item>
  ) : (
    <TextInput
      editable={!disabled}
      keyboardType='default'
      autoCapitalize='none'
      placeholder={placeholder ?? (typeof label === 'string' ? label : undefined)}
      style={StyleSheet.flatten([
        InputStyles({fontSize, theme, size, includeBorderRadius: true, ...props})
          .defaultTextInputStyle,
      ])}
      onChangeText={handleChangeText}
      {...props}
    />
  )
}
