import {isValidElement, useContext, useEffect, useMemo, useRef, type FC} from 'react'

import {InteractionManager, Platform, Modal as RNModal} from 'react-native'

import {Modal, PanResponderAnimation} from '..'
import {RottUiContext} from '../../../contexts'
import {useColorFromVariant, useDisplay, useSafeArea} from '../../../hooks'
import {ThemeConfig} from '../../../models'
import {Content} from '../../Content'
import {Header, type HeaderProps} from '../../Header'
import {Icon} from '../../Icon'
import {Item} from '../../Item'
import {Pressable} from '../../Pressable'
import {ModalProps} from '../models'
import {useModalStyles} from '../style'
import {ModalContentContainer} from './ModalContainer'

import {KeyboardStickyView} from 'react-native-keyboard-controller'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export const ModalComponent: FC<ModalProps<ThemeConfig>> = ({
  id,
  animationType = 'fade',
  fullScreen,
  visible = false,

  header,
  closeButton,
  onClose,
  disableOutsideClick,

  height = fullScreen ? 100 : 0,
  backgroundColor,

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
  const {animatedViewStyles, fadedBackgroundStyles} = useModalStyles()
  const {setHeightDevice, setHeight} = useDisplay()
  const {
    colors,
    deviceInfo: {hasNotch, hasDynamicIsland},
  } = useContext(RottUiContext)
  backgroundColor = fullScreen ? colors['grey-900'] : colors['neutral-alpha-100']

  const colorFromVariant = useColorFromVariant()

  const hasChildModal =
    modals?.length && modals?.length > 1 && id ? modals?.some((modal) => modal.id! > id) : false

  const {outsideTapAreaTestId, headerTestId, slideToCloseTestId} = {
    outsideTapAreaTestId: 'outside-tap-area-test-id',
    headerTestId: 'modal-header-test-id',
    slideToCloseTestId: 'slide-to-close-button-test-id',
  }

  const interactionRef = useRef<number>(undefined)

  const {bottom} = useSafeArea()

  const maxHeight = setHeightDevice(100)

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
          setHeight(height > 100 || height < 0 ? 100 : height) +
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
          style={fadedBackgroundStyles}
        />
      )}
      <KeyboardStickyView enabled={canStickToKeyboard && sticksToKeyboard}>
        <Content noPadding backgroundColor={colors['neutral-alpha-700']} row>
          <Animated.View style={[animatedViewStyles, animatedStyles]}>
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
                        ? colors['grey-800']
                        : colors['grey-900']
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
                      title={(header as HeaderProps<ThemeConfig>)?.title}
                      subTitle={(header as HeaderProps<ThemeConfig>)?.subTitle}
                      logo={(header as HeaderProps<ThemeConfig>)?.logo}
                      paddingHorizontal={
                        (header as HeaderProps<ThemeConfig>)
                          ? (header as HeaderProps<ThemeConfig>).paddingHorizontal
                          : 0
                      }
                      rightIcon={
                        closeButton
                          ? {name: 'REMOVE_BIG', onPress: () => closeModalAnimation!()}
                          : (header as HeaderProps<ThemeConfig>)?.rightIcon
                            ? (header as HeaderProps<ThemeConfig>)?.rightIcon
                            : undefined
                      }
                      leftIcon={(header as HeaderProps<ThemeConfig>)?.leftIcon}
                      {...(header as HeaderProps<ThemeConfig>)}
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
