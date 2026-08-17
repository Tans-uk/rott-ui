/* eslint-disable react-native/no-inline-styles */

import React, {type FC} from 'react'

import {type CommonUiProps, type Variant} from '../../../../../models'
import {colorFromVariant} from '../../../../../utils'
import {Icon} from '../../../../Icon'
import {Item} from '../../../../Item'
import {Label} from '../../../../Label'

export interface InputValidationProps extends CommonUiProps {
  name: string
  variant?: Variant
  message: string
}

export const InputValidation: FC<InputValidationProps> = ({
  name,
  variant = 'danger',
  message,
  ...props
}) => {
  return (
    <Item
      row
      backgroundColor={colorFromVariant(variant)}
      paddingVertical={8}
      paddingHorizontal={16}
      alignItemsCenter
      {...props}>
      <Icon name='warning-error' width={24} height={24} variant='white' marginRight={8} />

      <Label
        testID={`${name}-error-label-test-id`}
        fontSize='md'
        fontFamily='Markpro-Medium'
        variant='white'
        paddingRight={8}
        flex={1}
        style={{flexWrap: 'wrap'}}>
        {message}
      </Label>
    </Item>
  )
}
