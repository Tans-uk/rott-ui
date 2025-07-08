import type {PropsWithChildren} from 'react'

import type {StyleProp, ViewProps, ViewStyle} from 'react-native'

import {type CommonUiProps} from '@models'

export interface ContentProps extends PropsWithChildren, CommonUiProps, ViewProps {
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
