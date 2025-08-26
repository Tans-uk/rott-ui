import {type FC, type JSX} from 'react'

import {themeConfig} from '../../../providers'
import {Item} from '../../Item'
import {Label} from '../../Label'
import {Pressable} from '../../Pressable'
import React from 'react'

interface NotificationMessageProps {
  title?: string
  description?: string | JSX.Element
  iconElement: React.ReactElement<any> | React.ReactNode
  onPress?: (() => void) | null | undefined
  onClose?: (() => void) | null | undefined
  variantColor: string
}

export const NotificationComponent: FC<NotificationMessageProps> = ({
  title,
  description,
  iconElement,
  variantColor,
  onPress,
  onClose,
}) => (
  <Pressable
    testID='notification-pressable-test-id'
    onPress={() => {
      !!onPress && onPress()
      !!onClose && onClose()
    }}
    marginBottom={24}
    relative>
    <Item
      absolute
      top={0}
      left={0}
      zIndex={99}
      width={4}
      height='100%'
      justifyContentCenter
      borderTopStartRadius={4}
      borderBottomStartRadius={4}
      backgroundColor={variantColor}
    />
    <Item
      row
      width={342}
      borderRadius={4}
      backgroundColor={themeConfig.colors['grey-900']}
      paddingVertical={16}
      paddingHorizontal={16}>
      <Item marginRight={8} marginTop={4}>
        {iconElement}
      </Item>

      <Item flex={1}>
        {title && (
          <Label
            fontSize='md'
            fontWeight={500}
            testID='notification-title-test-id'
            variant='white'
            lineBreakMode='tail'>
            {title}
          </Label>
        )}

        {description && (
          <Label
            fontSize='sm'
            fontWeight={500}
            testID='notification-desc-test-id'
            variant='white'
            marginTop={4}>
            {description}
          </Label>
        )}
      </Item>
    </Item>
  </Pressable>
)
