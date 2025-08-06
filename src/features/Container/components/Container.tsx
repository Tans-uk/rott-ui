import {useContext, type FC, type PropsWithChildren} from 'react'

import {ScrollView, StyleSheet, View, type ViewProps} from 'react-native'

import {RottUiContext} from '../../../contexts'
import {useSafeArea} from '../../../hooks'
import {ThemeConfig, type CommonUiProps} from '../../../models'
import {Pressable} from '../../Pressable'
import {useContainerStyle} from '../styles'

import {SystemBars} from 'react-native-edge-to-edge'

interface ContainerProps extends ViewProps, CommonUiProps<ThemeConfig>, PropsWithChildren {
  center?: boolean
  noPadding?: boolean
  showStatusBar?: boolean
  closeOnClick?: boolean
  disableSafeAreaView?: boolean
  isModalScreen?: boolean
  fullScreen?: boolean
}

/**
 * Container Component
 * @param {boolean} disableSafeAreaView - SafeAreaView is disabled by default
 * @param {boolean} center - Center alignment is disabled by default
 * @param {boolean} noPadding - Padding is enabled by default
 */
export const Container: FC<ContainerProps> = ({
  disableSafeAreaView,
  center,
  noPadding,
  showStatusBar,
  closeOnClick,
  isModalScreen,
  fullScreen,
  height,
  children,
  style,
  ...props
}) => {
  const {colors, goBack} = useContext(RottUiContext)
  const {top} = useSafeArea()

  return (
    <ScrollView
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      contentContainerStyle={StyleSheet.flatten([
        useContainerStyle({
          center,
          noPadding,
          disableSafeAreaView,
          isModalScreen,
          height: fullScreen ? '100%' : height,
          includeAlignItems: true,
          includeJustifyContent: true,
          includeBorderRadius: true,
          ...props,
        }).defaultContainerStyle,
        style,
      ])}
      {...props}>
      <SystemBars style='dark' hidden={{statusBar: !showStatusBar}} />
      {!disableSafeAreaView && <View style={{height: top}} />}

      {closeOnClick && (
        <Pressable
          backgroundColor={colors['neutral-alpha-900']}
          style={[StyleSheet.absoluteFill]}
          onPress={goBack}
        />
      )}

      {children}
    </ScrollView>
  )
}
