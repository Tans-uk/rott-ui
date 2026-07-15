import {isValidElement, type FC} from 'react'

import type {ToggleInputProps} from '../models'
import { Item } from '../../Item'
import { Separator } from '../../Separator'
import { Toggle } from '../../Toggle'
import { Label } from '../../Label'
import { Input } from './Input'
import { IconSlot } from './InputField'
import { inputIconGapNormalizer } from '../utils'
import React from 'react'



export const ToggleInput: FC<ToggleInputProps> = ({
  testID,
  checked = false,
  onToggle,
  label,
  name,
  inputLabel,
  fontSize,
  inputType = 'default',
  topSeparator = false,
  middleSeparator = checked || false,
  bottomSeparator = false,
  value,
  onChangeText,
  onBlur,
  touched,
  disabledInput = true,
  disabled,
  leftIcon,
  rightIcon,
  size,
  ...props
}) => {
  const isString = typeof label === 'string'
  const gap = inputIconGapNormalizer(size)

  return (
    <Item size='full' testID={testID} width={342} justifyContentCenter {...props}>
      {topSeparator && (
        <Separator
          testID={`${name}-top-separator-test-id`}
          size='full'
          orientation='horizontal'
          variant='neutral-alpha-200'
          marginBottom='2%'
        />
      )}
      <Item
        row
        alignItemsCenter
        justifyContentSpaceBetween
        paddingHorizontal={16}
        paddingVertical={16}>
        {/* TODO: Toggle animasyonu label'a tıklandığında çalışmıyor, bir çözüm üretilmeli. */}
        <Item row alignItemsCenter flex={1}>
          {leftIcon && (
            <IconSlot
              testID='input-field-left-icon'
              icon={leftIcon}
              side='left'
              gap={gap}
              size={size}
              stopPropagation
            />
          )}
          {!!label && isString && (
            <Label
              maxWidth={236}
              fontSize={fontSize || 'xl'}
              onPress={() => !disabled && !!onToggle && onToggle!(!checked)}
              variant='grey-900'>
              {label}
            </Label>
          )}
          {!!label && !isString && isValidElement(label) && <>{label}</>}
        </Item>

        <Item row alignItemsCenter>
          {rightIcon && (
            <IconSlot
              testID='input-field-right-icon'
              icon={rightIcon}
              side='left'
              gap={gap}
              size={size}
              stopPropagation
            />
          )}
          <Toggle
            testID={`${name}-toggle-test-id`}
            isOn={checked}
            disabled={disabled}
            onToggleChange={(isChecked) => !!onToggle && onToggle!(isChecked)}
          />
        </Item>
      </Item>

      {middleSeparator && disabledInput && (
        <Separator
          testID={`${name}-middle-separator-test-id`}
          size='full'
          orientation='horizontal'
          variant='neutral-alpha-200'
          marginBottom='2%'
        />
      )}

      {checked && disabledInput && (
        <Input
          testID={`toggle-${name}-input-test-id`}
          label={inputLabel}
          type={inputType}
          name={name}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          touched={touched}
          renderSeparator={false}
          maxLength={props.maxLength}
        />
      )}

      {bottomSeparator && disabledInput && (
        <Separator
          testID={`${name}-bottom-separator-test-id`}
          size='full'
          orientation='horizontal'
          variant='neutral-alpha-200'
          marginBottom='2%'
        />
      )}
    </Item>
  )
}
