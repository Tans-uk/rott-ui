import {type FC} from 'react'

import {useColorFromVariant} from '../../../hooks'
import {ThemeConfig, type CommonUiProps} from '../../../models'
import {Icon} from '../../Icon'
import {Item} from '../../Item'
import {Label} from '../../Label'
import type {AlertModel} from '../models'

interface AlertProps
  extends AlertModel<ThemeConfig>,
    Omit<CommonUiProps<ThemeConfig>, 'size' | 'variant'> {
  testID?: string
}

export const Alert: FC<AlertProps> = ({
  text,
  size,
  variant,
  leftIcon,
  rightIcon,
  testID,
  borderRadius = 0,
}) => {
  const colorFromVariant = useColorFromVariant()
  return (
    <Item
      row
      size={size}
      testID={testID || 'alert-test-id'}
      backgroundColor={colorFromVariant(variant)}
      paddingHorizontal={16}
      paddingVertical={8}
      justifyContentCenter
      alignItemsCenter
      borderRadius={borderRadius}>
      {leftIcon && (
        <Icon
          testID='alert-left-icon'
          width={24}
          height={24}
          variant='white'
          marginRight={8}
          {...leftIcon}
        />
      )}
      <Label variant='white' flexShrink={1} {...(typeof text === 'object' ? {...text} : null)}>
        {typeof text === 'string' ? text : text.text}
      </Label>

      {rightIcon && (
        <Icon
          testID='alert-right-icon'
          width={24}
          height={24}
          variant='white'
          marginLeft={8}
          {...rightIcon}
        />
      )}
    </Item>
  )
}
