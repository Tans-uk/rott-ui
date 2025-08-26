import {type FC} from 'react'

import {StyleSheet, View} from 'react-native'

import {themeConfig} from '../../../providers'
import {type ContentProps} from '../models'
import {ContentStyles} from '../styles'

import {KeyboardAwareScrollView} from 'react-native-keyboard-controller'
import {useSafeArea} from 'react-native-safe-area-context'
import React from 'react'

export const Content: FC<ContentProps> = ({
  row,
  size,
  noPadding,
  alignItemsCenter,
  justifyContentCenter,
  justifyContentSpaceAround,
  justifyContentSpaceBetween,
  paddingHorizontal = noPadding ? 0 : 24,
  children,
  defaultBackgroundColor,
  backgroundColor,
  style,
  keyboardAvoidingView = false,
  keyboardVerticalOffset = 0,
  keyboardAvoidingViewContainerPaddingBottom = 0,
  scrollEnabled = false,
  hasBottomMenu,
  useBottomInset,
  refreshControl,
  contentContainerStyle,
  boxShadow,
  ...props
}) => {
  const {bottom} = useSafeArea()

  let unusablePaddingBottom = 0
  // Custom Bottom Menu Absolute Kullanildigi Durumlar
  if (hasBottomMenu) unusablePaddingBottom += 88

  // Navigation Bar Kullanan Cihazlar ile Cakisan Contentler Icin
  if (useBottomInset) unusablePaddingBottom += bottom

  // Scrollable ekranlarda bottom inset uygulandi ise scroll alanina ekleme yapilir (Orn: Profil > Erisim Bilgileri UserAccessInfoScreen)
  if (useBottomInset && !hasBottomMenu && scrollEnabled)
    keyboardAvoidingViewContainerPaddingBottom += 24

  const contentStyles = ContentStyles({
    size,
    row,
    justifyContentCenter,
    justifyContentSpaceAround,
    justifyContentSpaceBetween,
    alignItemsCenter,
    includeAlignItems: true,
    includeJustifyContent: true,
    paddingHorizontal,
    backgroundColor: defaultBackgroundColor ? themeConfig.colors['grey-900'] : backgroundColor,
    includeBorderRadius: true,
    paddingBottom: unusablePaddingBottom,
    keyboardAvoidingViewContainerPaddingBottom,
    boxShadow,
    ...props,
  })

  return (
    <View style={StyleSheet.flatten([contentStyles.defaultContentStyle, style])} {...props}>
      {scrollEnabled || keyboardAvoidingView ? (
        <KeyboardAwareScrollView
          testID={`${keyboardAvoidingView ? 'keyboard-avoiding-view' : 'scroll-view'}-test-id`}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={StyleSheet.flatten([
            contentStyles.scrollViewStyle,
            contentContainerStyle,
          ])}
          contentInsetAdjustmentBehavior='always' // ios only
          enabled={keyboardAvoidingView}
          refreshControl={refreshControl}
          overScrollMode={scrollEnabled ? 'always' : 'never'} // android only
          bounces={scrollEnabled} // ios only
          extraKeyboardSpace={keyboardVerticalOffset}>
          {children}
        </KeyboardAwareScrollView>
      ) : (
        children
      )}
    </View>
  )
}
