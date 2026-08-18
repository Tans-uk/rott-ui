import React, {isValidElement, useEffect, useMemo, useRef, type FC} from 'react'

import {InteractionManager, Platform, Modal as RNModal} from 'react-native'

import {Modal, PanResponderAnimation} from '..'
import {useRottContext, useSafeArea} from '../../../hooks'
import {themeConfig} from '../../../providers'
import {colorFromVariant, display} from '../../../utils'
import {Content} from '../../Content'
import {Header, type HeaderProps} from '../../Header'
import {Icon} from '../../Icon'
import {Item} from '../../Item'
import {Pressable} from '../../Pressable'
import {ModalProps} from '../models'
import {ModalStyles} from '../style'
import {ModalContentContainer} from './ModalContainer'

import {KeyboardStickyView} from 'react-native-keyboard-controller'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export const ModalComponent: FC<ModalProps> = ({
  id,
  animationType = 'fade',
  fullScreen,
  visible = false,

  header,
  closeButton,
  onClose,
  disableOutsideClick,

  height = fullScreen ? 100 : 0,
  backgroundColor = fullScreen
    ? themeConfig.colors['grey-900']
    : themeConfig.colors['neutral-alpha-100'],
  panResponderBackgroundColor = 'grey-800',
  /**
   * Set this when passing a custom Header element, so the design keeps its colours.
   *
   */
  headerBackgroundColor = 'grey-800',
  slideToClose,

  alignItemsCenter = undefined,
  justifyContentCenter = undefined,
  transparent,

  children,
  modals,
  modalContainerMarginBottom,
  sticksToKeyboard = false,
  ...props
}) => {
  const hasChildModal =
    modals?.length && modals?.length > 1 && id ? modals?.some((modal) => modal.id! > id) : false

  const {outsideTapAreaTestId, headerTestId, slideToCloseTestId} = {
    outsideTapAreaTestId: 'outside-tap-area-test-id',
    headerTestId: 'modal-header-test-id',
    slideToCloseTestId: 'slide-to-close-button-test-id',
  }

  const {hasNotch, hasDynamicIsland} = useRottContext()
  const interactionRef = useRef<number>(undefined)

  const {bottom} = useSafeArea()

  const maxHeight = display.setHeightDevice(100)

  /** With height 100, or fullScreen, the device's own height is used.
   * A height between 0 and 100 is resolved against the reference device instead:
   * height 50 becomes 422, the reference device being 844 tall.
   * If the result exceeds the actual device height, it is capped at 100%.
   * On Android the bottom inset is added on top.
   */
  const modalHeightByPercentage =
    fullScreen || height === 100
      ? maxHeight
      : Math.min(
          maxHeight,
          display.setHeight(height > 100 || height < 0 ? 100 : height) +
            (Platform.OS === 'android' ? bottom : 0) // iOS system navigation is transparent and already spaced, so no correction is needed
        )

  const canStickToKeyboard = !fullScreen && height < 50

  const translateY = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(
    () => ({
      transform: [{translateY: translateY.value}],
    }),
    []
  )

  const closeAnimationDuration = 250

  const panResponder = useMemo(
    () =>
      PanResponderAnimation(
        modalHeightByPercentage,
        translateY,
        onClose ? () => onClose() : () => Modal.hideModal(id)
      ),
    [translateY, id, modalHeightByPercentage]
  )

  const closeModalAnimation = () => {
    if (!fullScreen && animationType === 'fade') {
      translateY.value = withTiming(modalHeightByPercentage, {duration: 250}, () => {
        !!onClose && runOnJS(onClose)()
        runOnJS(Modal.hideModal)(id)
      })
    } else {
      !!onClose && runOnJS(onClose)()
      runOnJS(Modal.hideModal)(id)
    }
  }
  useEffect(() => {
    if (visible) translateY.value = 0
    else {
      interactionRef.current = InteractionManager?.createInteractionHandle()
      setTimeout(
        () =>
          interactionRef.current &&
          InteractionManager.clearInteractionHandle(interactionRef.current),
        closeAnimationDuration
      )
    }
  }, [visible])

  useEffect(() => {
    return () => {
      interactionRef.current && InteractionManager.clearInteractionHandle(interactionRef.current)
    }
  }, [])

  return (
    <RNModal
      statusBarTranslucent // Required: on older Android devices RNModal needs this even when edge-to-edge is on
      navigationBarTranslucent // Required: on older Android devices RNModal needs this even when edge-to-edge is on
      transparent={!fullScreen}
      animationType={animationType}
      style={{height: modalHeightByPercentage}}
      visible={visible}
      onRequestClose={() => !disableOutsideClick && closeModalAnimation()}
      {...props}>
      {!fullScreen && (
        <Pressable
          testID={outsideTapAreaTestId}
          onPress={() => {
            if (!fullScreen && !!onClose && !disableOutsideClick) closeModalAnimation()
          }}
          style={ModalStyles().fadedBackgroundStyles}
        />
      )}
      <KeyboardStickyView enabled={canStickToKeyboard && sticksToKeyboard}>
        <Content noPadding backgroundColor={themeConfig.colors['neutral-alpha-700']} row>
          <Animated.View style={[ModalStyles().animatedViewStyles, animatedStyles]}>
            <ModalContentContainer
              height={modalHeightByPercentage}
              backgroundColor={transparent ? 'transparent' : backgroundColor}
              justifyContentCenter={justifyContentCenter}
              alignItemsCenter={alignItemsCenter}
              modalContainerMarginBottom={modalContainerMarginBottom}>
              {header && (
                <Item
                  size='full'
                  paddingTop={hasNotch || hasDynamicIsland ? (fullScreen ? 54 : 0) : 8}
                  backgroundColor={
                    headerBackgroundColor
                      ? colorFromVariant(headerBackgroundColor)
                      : fullScreen
                        ? themeConfig.colors['grey-800']
                        : themeConfig.colors['grey-900']
                  }
                  borderTopStartRadius={fullScreen ? 0 : 24}
                  borderTopEndRadius={fullScreen ? 0 : 24}
                  justifyContentCenter={!isValidElement(header)}
                  alignItemsCenter={!isValidElement(header)}

                  // TODO: FullScreen Modalda SideToClose Ozelligi var ise Header onPress methodlarini ezdigi icin bu ozellik kullanilmamaktadir. FullScreen Modal da sideToClose ozelligi isteniyorsa bu ozellik iyilestirilmeli ve daha sonra aktif edilmelidir.
                  // {...(fullScreen && slideToClose ? {...panResponder().panHandlers} : undefined)}
                >
                  {!fullScreen && slideToClose && (
                    <Item
                      size='full'
                      alignItemsCenter
                      justifyContentCenter
                      backgroundColor={
                        panResponderBackgroundColor
                          ? colorFromVariant(panResponderBackgroundColor)
                          : undefined
                      }
                      borderTopStartRadius={fullScreen ? 0 : 24}
                      borderTopEndRadius={fullScreen ? 0 : 24}
                      {...panResponder.panHandlers}>
                      <Icon
                        testID={slideToCloseTestId}
                        variant='neutral-grey-alpha-200'
                        width={40}
                        height={40}
                        name='line'
                      />
                    </Item>
                  )}

                  {isValidElement(header) && header}
                  {!isValidElement(header) && (
                    <Header
                      testID={headerTestId}
                      title={(header as HeaderProps)?.title}
                      subTitle={(header as HeaderProps)?.subTitle}
                      logo={(header as HeaderProps)?.logo}
                      paddingHorizontal={
                        (header as HeaderProps) ? (header as HeaderProps).paddingHorizontal : 0
                      }
                      rightIcon={
                        closeButton
                          ? {name: 'remove-big', onPress: () => closeModalAnimation!()}
                          : (header as HeaderProps)?.rightIcon
                            ? (header as HeaderProps)?.rightIcon
                            : undefined
                      }
                      leftIcon={(header as HeaderProps)?.leftIcon}
                      {...(header as HeaderProps)}
                    />
                  )}
                </Item>
              )}

              {children}

              {hasChildModal && (
                <ModalComponent
                  {...modals?.filter((modal) => modal.id !== id)[0]}
                  modals={modals?.filter((modal) => modal.id !== id)}
                />
              )}
            </ModalContentContainer>
          </Animated.View>
        </Content>
      </KeyboardStickyView>
    </RNModal>
  )
}
