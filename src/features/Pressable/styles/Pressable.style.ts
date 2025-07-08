import {StyleSheet} from 'react-native'

import {commonUiStyleProperties} from '@utils'

export const PressableStyles = (props: any) =>
  StyleSheet.create({
    defaultPressableStyle: {
      ...commonUiStyleProperties(props),

      flexDirection: props?.row ? 'row' : 'column',

      flex: props?.flex === 0 ? 0 : 1,
    } as any,
  })
