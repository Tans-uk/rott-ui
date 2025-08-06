/* eslint-disable react-native/no-inline-styles */

import {type FC} from 'react'

import {useColorFromVariant} from '../../../../../hooks'
import {type CommonUiProps, type ThemeConfig} from '../../../../../models'
import {Icon} from '../../../../Icon'
import {Item} from '../../../../Item'
import {Label} from '../../../../Label'

export interface InputValidationProps<TTheme extends ThemeConfig> extends CommonUiProps<TTheme> {
  name: string
  variant?: string
  message: string
}

export const InputValidation: FC<InputValidationProps<ThemeConfig>> = ({
  name,
  variant = 'danger',
  message,
  ...props
}) => {
  const colorFromVariant = useColorFromVariant()

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
