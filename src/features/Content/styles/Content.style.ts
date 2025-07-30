import {StyleSheet} from 'react-native'

import {commonUiStyleProperties, display} from '../../../utils'

export const ContentStyles = (props?: any) =>
  StyleSheet.create({
    defaultContentStyle: {
      ...commonUiStyleProperties(props),

      flexDirection: props?.row ? 'row' : 'column',

      flex: props?.flex,
    } as any,
    scrollViewStyle: {
      paddingBottom: props?.keyboardAvoidingViewContainerPaddingBottom
        ? display.px(props.keyboardAvoidingViewContainerPaddingBottom)
        : 0,
      flexGrow: 1,
    },
  })
