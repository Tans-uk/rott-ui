import {type FC} from 'react'

import {StyleSheet, TextInput} from 'react-native'

import {formatMessage, translator} from '../../../libs'
import {AlertDialog} from '../../AlertDialog'
import {Icon} from '../../Icon'
import {Item} from '../../Item'
import {Label} from '../../Label'
import {Pressable} from '../../Pressable'
import type {CVCInputProps} from '../models'
import {CVCInputStyles, InputStyles} from '../styles'
import React from 'react'

export const CVCInput: FC<CVCInputProps> = ({fontSize, onChangeText, theme, size, ...props}) => {
  const handleTextChange = (inputText: string) => {
    let text = inputText.replace(/[^0-9]/g, '')
    text = text.length > 3 ? text.substring(0, 3) : text
    onChangeText!(text)
  }

  return (
    <Item row>
      <TextInput
        editable={!props.disabled}
        placeholder='***'
        style={StyleSheet.flatten([InputStyles({fontSize, theme, size}).defaultTextInputStyle])}
        keyboardType='number-pad'
        maxLength={3}
        onChangeText={handleTextChange}
        {...props}
      />

      {/* TODO: CVC Info butonuna kart arkayüzü eklenmeli */}
      <Pressable
        testID='info-icon-test-id'
        style={CVCInputStyles().infoIcon}
        row
        justifyContentCenter
        alignItemsCenter
        onPress={() => {
          AlertDialog.show({
            title: formatMessage('CVC.INFO.TITLE'),
            text: formatMessage('CVC.INFO.DESCRIPTION'),
            buttons: {
              cancelButton: {
                text: 'COMMON.OK',
                variant: 'primary',
                onPress: () => AlertDialog.hide(),
              },
            },
          })
        }}>
        <Label variant='grey-200' fontSize='xs' fontWeight={700}>
          {translator('CVC.LABEL.DESCRIPTION')}
        </Label>
        <Icon name='CHECK_CIRCLE' height={18} width={18} variant='grey-200' marginLeft={4} />
      </Pressable>
    </Item>
  )
}
