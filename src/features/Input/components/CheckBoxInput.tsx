/* eslint-disable react-native/no-inline-styles */
import {type FC} from 'react'

import {StyleSheet} from 'react-native'

import {themeConfig} from '../../../providers'
import {Item} from '../../Item'
import {Label} from '../../Label'
import {Pressable} from '../../Pressable'
import {type CheckBoxInputProps} from '../models'
import {InputStyles} from '../styles'
import {InputStyleNormalizer} from '../utils'
import React from 'react'

export const CheckBoxInput: FC<CheckBoxInputProps> = ({
  description,
  checked,
  fontSize,
  theme,
  size,
  disabled,
  variant,
  fontWeight,
  onCheckChange,
  testID,
  ...props
}) => {
  return (
    <Pressable
      flex={0}
      testID={testID ?? 'checkbox-input-test-id'}
      onPress={() => !disabled && onCheckChange && onCheckChange(!checked)}
      {...props}>
      <Item
        row
        alignItemsCenter
        style={[
          StyleSheet.flatten([InputStyles({theme, size}).defaultTextInputStyle, {height: 'auto'}]),
        ]}
        testID='checkbox-container-test-id'>
        <Item
          borderRadius={8}
          borderColor={checked ? themeConfig.colors.primary : themeConfig.colors['grey-200']}
          borderWidth={2}
          width={24}
          height={24}
          alignItemsCenter
          justifyContentCenter>
          {(checked || disabled) && (
            <Item
              testID='checkbox-checked-test-id'
              borderWidth={2}
              borderColor={
                checked ? themeConfig.colors['neutral-blue-soft'] : themeConfig.colors['grey-200']
              }
              borderRadius={4}
              backgroundColor={
                checked ? themeConfig.colors.primary : themeConfig.colors['grey-200']
              }
              width={checked ? 15 : 22}
              height={checked ? 15 : 22}
            />
          )}
        </Item>

        {description && typeof description === 'string' && (
          <Item flex={1} style={{flexDirection: 'row'}}>
            <Label
              testID='checkbox-default-label-test-id'
              fontSize={fontSize ?? InputStyleNormalizer({size}).placeholderSize}
              fontWeight={fontWeight ?? 'normal'}
              marginLeft={12}
              variant={variant ?? (theme === 'dark' ? 'white' : 'grey-900')}
              style={{flexWrap: 'wrap'}}>
              {description}
            </Label>
          </Item>
        )}

        {description && typeof description !== 'string' && <>{description}</>}
      </Item>
    </Pressable>
  )
}
