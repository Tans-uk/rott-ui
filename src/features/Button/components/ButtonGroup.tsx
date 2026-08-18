import React, {type FC} from 'react'

import {Platform} from 'react-native'

import {useSafeArea} from '../../../hooks'
import {themeConfig} from '../../../providers'
import {Content, type ContentProps} from '../../Content'
import {Image, type ImageProps} from '../../Image'
import {Item} from '../../Item'
import type {ButtonProps} from '../models'
import {Button} from './Button'

interface ButtonGroupProps extends ContentProps {
  buttons: ButtonProps | Nullable<ButtonProps>[]
  hideButtons?: boolean
  sticky?: boolean
  image?: ImageProps
  children?: any
  isFastTransfer?: boolean
}

/**
 *
 * @param hideButtons - Hides the buttons. TODO: look for a better approach.
 * @returns
 */
export const ButtonGroup: FC<ButtonGroupProps> = ({
  buttons,
  hideButtons,
  sticky,
  image,
  row,
  gap = 16,
  isFastTransfer,
  ...props
}) => {
  /**
   * Adds 24 units of padding to Content that would collide with the NavBar at the bottom
   * of the screen, ButtonGroup for instance. Not added on iOS when a NavBar is present,
   * since a transparent navbar there already reads as space.
   *
   * Etkilenen Ekranlar: LoginScreen, TransferToMobileScreen
   */
  const {bottom} = useSafeArea()
  let paddingBottom = bottom

  if (Platform.OS === 'android' || bottom === 0) paddingBottom += 24

  const hasMoreThanOneButton = Array.isArray(buttons)
  const stickyBottomProps = {
    shadowColor: themeConfig.colors['neutral-shadow-300'],
    shadowOffset: {width: 0, height: -8},
    shadowOpacity: 1,
    shadowRadius: 35,
    borderTopWidth: 1,
    borderTopColor: themeConfig.colors['neutral-grey-alpha-200'],
  }

  return (
    <Content
      flexShrink={1}
      paddingTop={24}
      paddingBottom={paddingBottom}
      useBottomInset
      {...props}
      {...(sticky ? stickyBottomProps : {})}>
      {!hideButtons && (
        <Item row={row} gap={gap}>
          {hasMoreThanOneButton &&
            buttons
              .filter((button) => button)
              .map((button, index) => (
                <Button key={button?.testID ?? `${button?.text}_${index}`} {...button} />
              ))}
          {!hasMoreThanOneButton && <Button {...buttons} />}
        </Item>
      )}

      {(!!image || isFastTransfer) && (
        <Item justifyContentCenter alignItemsCenter marginTop={16}>
          <Image
            testID='image-test-id'
            {...image}
            width={isFastTransfer ? 45 : image?.width}
            height={isFastTransfer ? 30 : image?.height}
            name={isFastTransfer ? 'fast-tcmb' : image?.name}
          />
        </Item>
      )}
    </Content>
  )
}
