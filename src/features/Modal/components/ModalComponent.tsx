import {isValidElement, useEffect, useMemo, useRef, type FC} from 'react'

import {InteractionManager, Platform, Modal as RNModal} from 'react-native'

import {Content} from '@features/Content'
import {Header, type HeaderProps} from '@features/Header'
import {Icon} from '@features/Icon'
import {Item} from '@features/Item'
import {
  Modal,
  ModalContentContainer,
  ModalStyles,
  PanResponderAnimation,
  type ModalProps,
} from '@features/Modal'
import {Pressable} from '@features/Pressable'
import {getHasDynamicIslandState, getHasNotchState, useSafeArea} from '@hooks'
import {addMatcherWait} from '@libs'
import {themeConfig} from '@providers'
import {colorFromVariant, display} from '@utils'

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
   * Custom Header element verildiği zaman tasarımda renk bozulması yaşamamak için bu değerin tanımlanması gerekir.
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

  const hasNotch = useAppSelector(getHasNotchState)
  const hasDynamicIsland = useAppSelector(getHasDynamicIslandState)
  const interactionRef = useRef<number>(undefined)

  const {bottom} = useSafeArea()

  const maxHeight = display.setHeightDevice(100)

  /** Height 100 verildiyse veya fullScreen ise kullanılan cihazı baz alır.
   * Eğer 0 ile 100 arası bir height verildiyse bu değer referans cihaza göre hesaplanır.
   * Örn, height: 50 -> referans cihaz yüksekliği 844 olduğundan 422 olarak hesaplanır.
   * Hesaplanan değer kullanılan cihazın yüksekliğinden fazla çıkarsa maksimum değer (%100) alınır.
   * Android'e özel olarak bottom inset eklenir.
   */
  const modalHeightByPercentage =
    fullScreen || height === 100
      ? maxHeight
      : Math.min(
          maxHeight,
          display.setHeight(height > 100 || height < 0 ? 100 : height) +
            (Platform.OS === 'android' ? bottom : 0) // ios'te sistem navigasyonu şeffaf ve boşluklu olduğu için bu düzeltmeye ihtiyaç duyulmaz
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
      addMatcherWait(
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
      statusBarTranslucent // önemli (eski tip android cihazlarda edge-to-edge açık olsa dahi RNModal'a özel belirtmek gerekiyor)
      navigationBarTranslucent // önemli (eski tip android cihazlarda edge-to-edge açık olsa dahi RNModal'a özel belirtmek gerekiyor)
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
                        name='LINE'
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
                          ? {name: 'REMOVE_BIG', onPress: () => closeModalAnimation!()}
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
