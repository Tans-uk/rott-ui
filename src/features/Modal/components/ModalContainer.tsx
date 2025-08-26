/* eslint-disable react-native/no-inline-styles */
import {type FC} from 'react'

import {ScrollView, type GestureResponderEvent} from 'react-native'

import {useSafeArea} from '../../../hooks'
import {Content} from '../../Content'
import {Pressable} from '../../Pressable'
import {type ModalProps} from '../models'
import React from 'react'

interface ModalContainerProps extends ModalProps {
  onPress?: (event: GestureResponderEvent) => void
}

export const ModalContentContainer: FC<ModalContainerProps> = ({
  transparent,
  height,
  backgroundColor,
  fullScreen,
  justifyContentCenter,
  alignItemsCenter,
  modalContainerMarginBottom,
  onPress,
  children,
}) => {
  const {bottom} = useSafeArea()

  if (transparent) {
    return (
      <Content
        height={height}
        noPadding
        flex={1}
        backgroundColor={backgroundColor}
        borderTopStartRadius={fullScreen ? 0 : 24}
        borderTopEndRadius={fullScreen ? 0 : 24}
        justifyContentCenter={justifyContentCenter}
        alignItemsCenter={alignItemsCenter}
        marginBottom={modalContainerMarginBottom}>
        <ScrollView
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={{
            flex: fullScreen ? 0 : 1,
            paddingBottom: bottom,
            justifyContent: justifyContentCenter ? 'center' : undefined,
            alignItems: alignItemsCenter ? 'center' : undefined,
          }}>
          {children}
        </ScrollView>
      </Content>
    )
  } else {
    return (
      <Pressable
        onPress={onPress}
        height={height}
        backgroundColor={backgroundColor}
        borderTopStartRadius={fullScreen ? 0 : 24}
        borderTopEndRadius={fullScreen ? 0 : 24}
        justifyContentCenter={justifyContentCenter}
        alignItemsCenter={alignItemsCenter}
        marginBottom={modalContainerMarginBottom}>
        <ScrollView
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={{
            flex: fullScreen ? 0 : 1,
            paddingBottom: bottom,
            justifyContent: justifyContentCenter ? 'center' : undefined,
            alignItems: alignItemsCenter ? 'center' : undefined,
          }}>
          {children}
        </ScrollView>
      </Pressable>
    )
  }
}
