import type {PropsWithChildren} from 'react'

import type {StyleProp, ViewProps, ViewStyle} from 'react-native'

import {ThemeConfig, type CommonUiProps} from '../../../models'

export interface ContentProps<TTheme extends ThemeConfig>
  extends PropsWithChildren,
    CommonUiProps<TTheme>,
    ViewProps {
  row?: boolean
  noPadding?: boolean
  defaultBackgroundColor?: boolean
  keyboardAvoidingView?: boolean
  keyboardVerticalOffset?: number
  keyboardAvoidingViewContainerPaddingBottom?: number
  scrollEnabled?: boolean
  refreshControl?: any
  contentContainerStyle?: StyleProp<ViewStyle>
  hasBottomMenu?: boolean
  useBottomInset?: boolean
}
