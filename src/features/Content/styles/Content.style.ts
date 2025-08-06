import {StyleSheet} from 'react-native'

import {useCommonUiStyleProperties, useDisplay} from '../../../hooks'

export const useContentStyle = (props?: any) => {
  const commonUiStyleProperties = useCommonUiStyleProperties(props)
  const {px} = useDisplay()

  return StyleSheet.create({
    defaultContentStyle: {
      ...commonUiStyleProperties,

      flexDirection: props?.row ? 'row' : 'column',

      flex: props?.flex,
    } as any,
    scrollViewStyle: {
      paddingBottom: props?.keyboardAvoidingViewContainerPaddingBottom
        ? px(props.keyboardAvoidingViewContainerPaddingBottom)
        : 0,
      flexGrow: 1,
    },
  })
}
