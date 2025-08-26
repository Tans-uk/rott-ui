import React, {useEffect, type FC} from 'react'

import {ActivityIndicator} from 'react-native'

import {AlertDialog} from '..'
import {formatMessage} from '../../../libs'
import {themeConfig} from '../../../providers'
import {display} from '../../../utils'
import {Button} from '../../Button'
import {EmptyState} from '../../EmptyState'
import {Icon} from '../../Icon'
import {Item} from '../../Item'
import {Label} from '../../Label'
import {Separator} from '../../Separator'
import {type AlertDialogModel} from '../models'

export const AlertDialogComponent: FC<AlertDialogModel> = ({
  id,
  title,
  text,
  emptyState,
  icon,
  buttons = {
    cancelButton: {
      text: 'COMMON.CANCEL',
      variant: 'danger',
      onPress: undefined,
    },
    confirmButton: undefined,
  },
  showActivityIndicator,
  autoClose,
}) => {
  const hasMoreThanTwoButtons = Array.isArray(buttons)

  let autoCloseTimer: ReturnType<typeof setTimeout> | null = null
  useEffect(() => {
    if (autoClose) {
      autoCloseTimer = setTimeout(() => {
        AlertDialog.hide(id)
      }, autoClose)
    }

    return () => {
      if (autoCloseTimer) clearTimeout(autoCloseTimer)
    }
  }, [autoClose])

  return (
    <Item
      testID='alert-dialog-test-id'
      alignItemsCenter
      justifyContentCenter
      width={display.setWidth(80)}
      borderRadius={16}
      backgroundColor={themeConfig.colors['grey-100']}>
      {showActivityIndicator && (
        <Item marginTop={24}>
          <ActivityIndicator size='large' color={themeConfig.colors.primary} />
        </Item>
      )}

      {title && (
        <>
          <Item justifyContentCenter alignItemsCenter height={55}>
            <Label
              variant='grey-900'
              fontFamily='Markpro-Bold'
              textCenter
              fontSize='xl'
              fontWeight={700}>
              {title}
            </Label>
          </Item>

          <Separator orientation='horizontal' variant='neutral-alpha-200' size='full' />
        </>
      )}

      <Item
        size='full'
        paddingHorizontal={16}
        paddingTop={emptyState ? 0 : icon ? 24 : 16}
        paddingBottom={emptyState || icon ? 24 : 16}
        justifyContentCenter
        alignItemsCenter>
        {emptyState && (
          <EmptyState
            name={emptyState?.name ?? 'EMPTY_GENERAL_WARNING'}
            width={emptyState?.width ?? 152}
            height={emptyState?.width ?? 152}
          />
        )}

        {icon && (
          <Icon
            name={icon?.name ?? 'WARNING'}
            width={icon?.width ?? 64}
            height={icon?.height ?? 64}
            variant={icon.variant}
          />
        )}

        <Item
          size='full'
          justifyContentCenter
          alignItemsCenter
          marginTop={icon ? 8 : 0}
          marginHorizontal={16}>
          <Label variant='grey-900' fontFamily='Markpro' textCenter fontSize='lg' fontWeight={500}>
            {text}
          </Label>
        </Item>
      </Item>

      <Separator orientation='horizontal' variant='neutral-alpha-200' size='full' />

      {buttons && (
        <Item row={!hasMoreThanTwoButtons} size='full' justifyContentCenter alignItemsCenter>
          {!hasMoreThanTwoButtons && buttons?.cancelButton && (
            <Button
              testID={buttons?.cancelButton?.testID || 'alert-dialog-cancel-button-test-id'}
              variant='transparent'
              color={buttons?.cancelButton?.variant || 'danger'}
              fontSize='lg'
              fontWeight={500}
              onPress={() => {
                !!buttons?.cancelButton?.onPress && buttons.cancelButton.onPress()

                AlertDialog.hide(id)
              }}>
              {formatMessage(buttons.cancelButton.text)}
            </Button>
          )}

          {!hasMoreThanTwoButtons && buttons?.confirmButton && (
            <Separator width={1} orientation='vertical' height={55} variant='neutral-alpha-200' />
          )}

          {!hasMoreThanTwoButtons && buttons?.confirmButton && (
            <Button
              testID={buttons?.confirmButton?.testID || 'alert-dialog-confirm-button-test-id'}
              variant='transparent'
              color={buttons?.confirmButton?.variant || 'danger'}
              fontSize='lg'
              fontWeight={500}
              onPress={() => {
                !!buttons?.confirmButton?.onPress && buttons.confirmButton.onPress()
              }}>
              {formatMessage(buttons.confirmButton.text)}
            </Button>
          )}

          {hasMoreThanTwoButtons &&
            buttons &&
            buttons
              .filter((button) => !!button)
              .map((button, index) => {
                const {text: buttonText, variant: buttonVariant, onPress: buttonOnPress} = button

                return (
                  <Item key={`button-${text?.toSeoFriendly()}-${index}`}>
                    <Item row height={56}>
                      <Button
                        variant='transparent'
                        color={buttonVariant}
                        fontSize='lg'
                        fontWeight={500}
                        onPress={() => {
                          !!buttonOnPress && buttonOnPress()

                          AlertDialog.hide(id)
                        }}>
                        {formatMessage(buttonText)}
                      </Button>
                    </Item>

                    {buttons.length - 1 !== index && (
                      <Separator orientation='horizontal' size='full' variant='neutral-alpha-200' />
                    )}
                  </Item>
                )
              })}
        </Item>
      )}
    </Item>
  )
}
