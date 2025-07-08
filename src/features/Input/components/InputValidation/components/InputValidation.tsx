/* eslint-disable react-native/no-inline-styles */

import {type FC} from 'react'

import {Icon} from '@features/Icon'
import {Item} from '@features/Item'
import {Label} from '@features/Label'
import {type CommonUiProps, type Variant} from '@models'
import {colorFromVariant} from '@utils'

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
      <Icon name='WARNING_ERROR' width={24} height={24} variant='white' marginRight={8} />

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
